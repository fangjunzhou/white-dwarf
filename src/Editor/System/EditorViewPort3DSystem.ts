import { Entity } from "ecsy/Entity";
import { Attributes, System } from "ecsy/System";
import { mat4, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { Canvas3DRenderer } from "../../Core/Render/System/Canvas3DRenderer";
import { EditorControl, editorControlContext } from "../EditorContext";
import { EditorSceneCamTag } from "../TagComponent/EditorSceneCamTag";

const moveControlThreshold = 30;

export class EditorViewPort3DSystem extends Canvas3DRenderer {
  static inspectEntity: Entity | null = null;
  static inspectTransform: TransformData3D | null = null;

  mousePosition: vec2 = vec2.create();
  mouseDelta: vec2 = vec2.create();
  mouseInCanvas: boolean = true;

  highlightAxis: string | null = null;
  movingAxis: string | null = null;

  init(attributes?: Attributes | undefined): void {
    super.init(attributes);

    // Update mouse position.
    this.mainCanvas.addEventListener("mousemove", (event) => {
      this.mousePosition = this.getMousePos(event);
      vec2.add(
        this.mouseDelta,
        this.mouseDelta,
        vec2.fromValues(event.movementX, event.movementY)
      );
    });

    // Update mouse in canvas.
    this.mainCanvas.addEventListener("mouseenter", () => {
      this.mouseInCanvas = true;
    });
    this.mainCanvas.addEventListener("mouseleave", () => {
      this.mouseInCanvas = false;
    });

    // Update mouse left click.
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        if (this.highlightAxis) {
          this.movingAxis = this.highlightAxis;
        }
      }
    });
    this.mainCanvas.addEventListener("mouseup", (event) => {
      if (event.button == 0) {
        this.movingAxis = null;
      }
    });
  }

  execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Generate world to camera matrix.
    this.generateWorldToCameraMatrix();
    // Generate camera to screen matrix.
    this.generateCameraToScreenMatrix();

    // Draw selected entity.
    if (
      editorControlContext.controlMode == EditorControl.Move &&
      EditorViewPort3DSystem.inspectTransform &&
      !EditorViewPort3DSystem.inspectEntity?.hasComponent(EditorSceneCamTag)
    ) {
      // Generate object to world matrix.
      const objectToWorld = this.objectToWorld(
        EditorViewPort3DSystem.inspectTransform,
        true
      );

      // Generate object to screen matrix.
      const objectToScreen = mat4.create();
      mat4.multiply(objectToScreen, this.worldToCamera, objectToWorld);
      mat4.multiply(objectToScreen, this.cameraToScreen, objectToScreen);

      // Draw the axis.
      this.drawAxis(objectToScreen);

      // Move the object.
      const startPoint = vec3.create();
      vec3.transformMat4(startPoint, [0, 0, 0], objectToScreen);
      // Get the end points of the axis.
      const endPointX = vec3.create();
      vec3.transformMat4(endPointX, [1, 0, 0], objectToScreen);
      const endPointY = vec3.create();
      vec3.transformMat4(endPointY, [0, 1, 0], objectToScreen);
      const endPointZ = vec3.create();
      vec3.transformMat4(endPointZ, [0, 0, 1], objectToScreen);
      // If the mouse is in the canvas.
      if (this.mouseInCanvas) {
        // Get the closest axis.
        const xDistance = vec2.distance(
          this.mousePosition,
          vec2.fromValues(endPointX[0], endPointX[1])
        );
        const yDistance = vec2.distance(
          this.mousePosition,
          vec2.fromValues(endPointY[0], endPointY[1])
        );
        const zDistance = vec2.distance(
          this.mousePosition,
          vec2.fromValues(endPointZ[0], endPointZ[1])
        );

        const minDistance = Math.min(xDistance, yDistance, zDistance);

        // If the mouse is close enough to the axis.
        if (minDistance < moveControlThreshold) {
          // Move the object.
          if (minDistance == xDistance) {
            // Highlight the axis.
            this.canvasContext.strokeStyle = "red";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointX[0],
              endPointX[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();

            this.highlightAxis = "x";
          } else if (minDistance == yDistance) {
            // Highlight the axis.
            this.canvasContext.strokeStyle = "green";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointY[0],
              endPointY[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();

            this.highlightAxis = "y";
          } else if (minDistance == zDistance) {
            // Highlight the axis.
            this.canvasContext.strokeStyle = "blue";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointZ[0],
              endPointZ[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();

            this.highlightAxis = "z";
          }
        } else {
          this.highlightAxis = null;
        }

        // Move the object.
        if (this.movingAxis) {
          switch (this.movingAxis) {
            case "x":
              this.moveAxis(endPointX, startPoint, 0);
              break;

            case "y":
              this.moveAxis(endPointY, startPoint, 1);
              break;

            case "z":
              this.moveAxis(endPointZ, startPoint, 2);
              break;

            default:
              break;
          }
        }
      }
    }

    // Reset mouse delta.
    vec2.set(this.mouseDelta, 0, 0);
  }

  /**
   * Move the object along the axis.
   * @param axisEndPoint the end point of the axis.
   * @param startPoint the start point of the axis.
   */
  private moveAxis(axisEndPoint: vec3, startPoint: vec3, axisIndex: number) {
    const axisDir = vec2.create();
    vec2.sub(
      axisDir,
      vec2.fromValues(axisEndPoint[0], axisEndPoint[1]),
      vec2.fromValues(startPoint[0], startPoint[1])
    );
    // Get the mouse move magnitude on the axis.
    let axisMove = vec2.dot(
      axisDir,
      vec2.fromValues(this.mouseDelta[0], this.mouseDelta[1])
    );
    axisMove = axisMove / Math.pow(vec2.length(axisDir), 2);

    // Move the object.
    if (EditorViewPort3DSystem.inspectTransform) {
      EditorViewPort3DSystem.inspectTransform.position.value[axisIndex] +=
        axisMove;

      // Update the transform.
      EditorViewPort3DSystem.inspectEntity?.getMutableComponent(
        TransformData3D
      );
    }
  }

  drawAxis(objectToScreen: mat4): void {
    // Generate screen space start point.
    const startPoint = vec3.create();
    vec3.transformMat4(startPoint, [0, 0, 0], objectToScreen);

    // Generate screen space end point.
    const endPointX = vec3.create();
    vec3.transformMat4(endPointX, [1, 0, 0], objectToScreen);
    const endPointY = vec3.create();
    vec3.transformMat4(endPointY, [0, 1, 0], objectToScreen);
    const endPointZ = vec3.create();
    vec3.transformMat4(endPointZ, [0, 0, 1], objectToScreen);

    // Draw the line.
    this.drawLine(startPoint, endPointX, "red", 1);
    this.drawLine(startPoint, endPointY, "green", 1);
    this.drawLine(startPoint, endPointZ, "blue", 1);
  }

  /**
   * Get the mouse position in screen space.
   *
   * @param event canvas mouse event.
   * @returns mouse position in screen space.
   */
  getMousePos(event: MouseEvent): vec2 {
    const rect = this.mainCanvas.getBoundingClientRect();
    return vec2.fromValues(event.clientX - rect.left, event.clientY - rect.top);
  }
}
