import { Attributes, Entity } from "ecsy-wd";
import { TransformData3D } from "../../../Core/Locomotion/DataComponent/TransformData3D";
import { EditorViewPortWebGLSystem } from "./EditorViewPortWebGLSystem";
import { mat3, mat4, quat, vec2, vec3 } from "gl-matrix";
import { EditorControl, editorControlContext } from "../../EditorContext";

const moveControlThreshold = 10;

export class EditorViewPortWebGLTransformSystem extends EditorViewPortWebGLSystem {
  public init(attributes?: Attributes | undefined): void {
    super.init(attributes);
  }

  public drawInspectEntity(
    entity: Entity,
    transform: TransformData3D,
    tView: mat4,
    tProjection: mat4
  ): void {
    // Check if currently in move mode.
    if (editorControlContext.controlMode !== EditorControl.Move) {
      return;
    }

    // Model matrix.
    const tModel = this.getModelMatrix(transform, true);
    // MV matrix.
    const tMV = mat4.create();
    mat4.multiply(tMV, tView, tModel);
    // MVn matrix.
    const tMVn = mat3.create();
    mat3.normalFromMat4(tMVn, tMV);
    // MVP matrix.
    const tMVP = mat4.create();
    mat4.multiply(tMVP, tProjection, tMV);

    // Draw the transform point gizmo.
    this.drawPoint(tMV, tProjection, tMVn, tMVP);
    // Draw the transform axis gizmo.
    this.drawAxis(tMV, tProjection, tMVn, tMVP);

    // Get the NDC to viewport matrix.
    const tNDCtoViewport = this.getNDCToViewportMatrix();

    // Generate the transformation matrix from model space to Viewport space.
    const tModelToViewport = mat4.create();
    mat4.multiply(tModelToViewport, tNDCtoViewport, tMVP);

    // Get the position of the entity in viewport space.
    const startPoint = vec3.transformMat4(
      vec3.create(),
      [0, 0, 0],
      tModelToViewport
    );
    // Get the end points for the axis gizmo.
    const endPointX = vec3.transformMat4(
      vec3.create(),
      [1, 0, 0],
      tModelToViewport
    );
    const endPointY = vec3.transformMat4(
      vec3.create(),
      [0, 1, 0],
      tModelToViewport
    );
    const endPointZ = vec3.transformMat4(
      vec3.create(),
      [0, 0, 1],
      tModelToViewport
    );

    // If the mouse is in the canvas, get the closest axis.
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

      let axisTipSizes: Float32Array = new Float32Array([10, 10, 10]);
      if (minDistance < moveControlThreshold) {
        if (minDistance == xDistance) {
          // Highlight the axis.
          axisTipSizes = new Float32Array([20, 10, 10]);

          this.highlightAxis = "x";
        } else if (minDistance == yDistance) {
          // Highlight the axis.
          axisTipSizes = new Float32Array([10, 20, 10]);

          this.highlightAxis = "y";
        } else if (minDistance == zDistance) {
          // Highlight the axis.
          axisTipSizes = new Float32Array([10, 10, 20]);

          this.highlightAxis = "z";
        }
      } else {
        // Reset the axis size.
        this.highlightAxis = null;
      }

      // Move the object.
      if (this.movingAxis) {
        switch (this.movingAxis) {
          case "x":
            this.moveAxis(endPointX, startPoint, 0, transform.rotation.value);
            break;

          case "y":
            this.moveAxis(endPointY, startPoint, 1, transform.rotation.value);
            break;

          case "z":
            this.moveAxis(endPointZ, startPoint, 2, transform.rotation.value);
            break;

          default:
            break;
        }
      }

      this.glContext.bindBuffer(
        this.glContext.ARRAY_BUFFER,
        this.axisTipVertexSizeBuffer
      );
      this.glContext.bufferData(
        this.glContext.ARRAY_BUFFER,
        axisTipSizes,
        this.glContext.STATIC_DRAW
      );
    }
  }

  /**
   * Move the object along the axis.
   * @param axisEndPoint the end point of the axis.
   * @param startPoint the start point of the axis.
   */
  private moveAxis(
    axisEndPoint: vec3,
    startPoint: vec3,
    axisIndex: number,
    rotation: quat
  ) {
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
    if (EditorViewPortWebGLSystem.inspectTransform) {
      // Rotate the axis move.
      const axisMoveVec = vec3.fromValues(0, 0, 0);
      axisMoveVec[axisIndex] = axisMove;
      vec3.transformQuat(axisMoveVec, axisMoveVec, rotation);

      vec3.add(
        EditorViewPortWebGLSystem.inspectTransform.position.value,
        EditorViewPortWebGLSystem.inspectTransform.position.value,
        axisMoveVec
      );

      // Update the transform.
      EditorViewPortWebGLSystem.inspectEntity?.getMutableComponent(
        TransformData3D
      );
    }
  }
}
