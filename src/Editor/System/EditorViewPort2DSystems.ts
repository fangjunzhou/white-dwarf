import { Entity } from "ecsy-wd";
import { Attributes, System, SystemQueries } from "ecsy-wd";
import { mat3, vec2 } from "gl-matrix";
import fileDownload from "js-file-download";
import { IComponent } from "../../Core/ComponentRegistry";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { Canvas2DRenderer } from "../../Core/Render/System/Canvas2DRenderer";
import { EntitySerializer } from "../../Core/Serialization/EntitySerializer";
import { Vector2 } from "../../Mathematics/Vector2";
import { editorUIContext } from "../EditorContext";
import { EditorSceneCamTag } from "../TagComponent/EditorSceneCamTag";
import { EditorSelectedTag } from "../TagComponent/EditorSelectedTag";
import { updateEntityInspector } from "./EditorInspectorSystem";

const highlightThreshold = 25;
const axisLength = 50;

// TODO: Split all inspector operations into ECS based systems.
export class EditorViewPort2DSystem extends Canvas2DRenderer {
  static inspectEntity: Entity | null = null;
  static inspectTransform: Readonly<TransformData2D> | null = null;

  static queries: SystemQueries = {
    ...this.queries,
    highlightEntity: {
      components: [TransformData2D],
    },
  };

  highlightEntity: Entity | null = null;

  init(attributes?: Attributes | undefined): void {
    super.init(attributes);

    // Register mouse move event for main canvas.
    this.mainCanvas.addEventListener("mousemove", (event) => {
      const mousePos = this.getMousePos(event);

      // If left mouse button is pressed, move the entity.
      if (event.buttons === 1) {
        const mouseWorldPos = this.screenToWorld(mousePos);

        if (EditorViewPort2DSystem.inspectEntity) {
          const transform =
            EditorViewPort2DSystem.inspectEntity.getMutableComponent(
              TransformData2D
            ) as TransformData2D;

          transform.position = new Vector2(mouseWorldPos[0], mouseWorldPos[1]);

          // Update the transform component.
          EditorViewPort2DSystem.inspectEntity.getMutableComponent(
            TransformData2D
          );
        }
      } else {
        // Pick the closest entity and highlight it.
        let closestEntity: Entity | null = null;
        let closestDistance = Number.MAX_VALUE;

        // Find the closest entity.
        this.queries.highlightEntity.results.forEach((entity) => {
          const transform = entity.getComponent(
            TransformData2D
          ) as TransformData2D;
          const distance = vec2.distance(
            mousePos,
            this.worldToScreen(transform.position.value)
          );

          if (
            distance < highlightThreshold &&
            distance < closestDistance &&
            !entity.hasComponent(EditorSceneCamTag)
          ) {
            closestEntity = entity;
            closestDistance = distance;
          }
        });

        // Set the highlight entity.
        this.highlightEntity = closestEntity;
      }
    });

    // Register left mouse down.
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        if (this.highlightEntity) {
          // Select the entity.
          updateEntityInspector(this.highlightEntity);
        } else {
          // Clear the entity inspector.
          updateEntityInspector(null);
        }
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

    // Draw transform and enable selection here.

    // Get the camera transform.
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    // Construct world to camera matrix.
    const worldToCamera = mat3.create();
    mat3.multiply(
      worldToCamera,
      worldToCamera,
      this.worldToCamera(cameraTransform, canvasSize)
    );

    // Draw selected entity.
    if (EditorViewPort2DSystem.inspectTransform) {
      // Construct object to camera matrix.
      const inspectObjToCamera = mat3.create();
      mat3.multiply(
        inspectObjToCamera,
        worldToCamera,
        this.objectToWorld(EditorViewPort2DSystem.inspectTransform)
      );

      this.drawAxis(inspectObjToCamera);
    }

    // Draw highlight.
    if (this.highlightEntity) {
      const transform = this.highlightEntity.getComponent(
        TransformData2D
      ) as TransformData2D;

      const highlightObjToCamera = mat3.create();
      mat3.multiply(
        highlightObjToCamera,
        worldToCamera,
        this.objectToWorld(transform)
      );

      this.drawHighlight(highlightObjToCamera);
    }
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

  /**
   * Convert screen space to world space.
   *
   * @param screenPos screen position.
   * @returns world position.
   */
  screenToWorld(screenPos: vec2): vec2 {
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }

    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    const worldPos = vec2.create();
    vec2.transformMat3(
      worldPos,
      screenPos,
      mat3.invert(
        mat3.create(),
        this.worldToCamera(cameraTransform, canvasSize)
      )
    );

    return worldPos;
  }

  /**
   * Convert world space to screen space.
   *
   * @param worldPos world position.
   * @returns screen position.
   */
  worldToScreen(worldPos: vec2): vec2 {
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }

    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    const screenPos = vec2.create();
    vec2.transformMat3(
      screenPos,
      worldPos,
      this.worldToCamera(cameraTransform, canvasSize)
    );

    return screenPos;
  }

  drawAxis(inspectObjToCamera: mat3): void {
    // Get the starting position.
    const startPos = vec2.fromValues(0, 0);
    vec2.transformMat3(startPos, startPos, inspectObjToCamera);
    // Get the x axis position.
    const xAxisPos = vec2.fromValues(1, 0);
    vec2.transformMat3(xAxisPos, xAxisPos, inspectObjToCamera);
    // Get the y axis position.
    const yAxisPos = vec2.fromValues(0, 1);
    vec2.transformMat3(yAxisPos, yAxisPos, inspectObjToCamera);

    // Normalize the axis: xEnd = xStart + normalize(xAxis - xStart)
    vec2.add(
      xAxisPos,
      startPos,
      vec2.scale(
        vec2.create(),
        vec2.normalize(
          vec2.create(),
          vec2.sub(vec2.create(), xAxisPos, startPos)
        ),
        axisLength
      )
    );

    // Normalize the axis: yEnd = yStart + normalize(yAxis - yStart)
    vec2.add(
      yAxisPos,
      startPos,
      vec2.scale(
        vec2.create(),
        vec2.normalize(
          vec2.create(),
          vec2.sub(vec2.create(), yAxisPos, startPos)
        ),
        axisLength
      )
    );

    // Draw the x axis.
    this.canvasContext.strokeStyle = "red";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(xAxisPos[0], xAxisPos[1]);
    this.canvasContext.stroke();

    // Draw the y axis.
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(yAxisPos[0], yAxisPos[1]);
    this.canvasContext.stroke();
  }

  drawHighlight(highlightObjToCamera: mat3): void {
    // Get the highlight position.
    const startPos = vec2.fromValues(0, 0);
    vec2.transformMat3(startPos, startPos, highlightObjToCamera);

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.lineWidth = 2;
    this.canvasContext.arc(
      startPos[0],
      startPos[1],
      highlightThreshold,
      0,
      2 * Math.PI
    );
    this.canvasContext.stroke();
  }
}
