import { Entity } from "ecsy/Entity";
import { Attributes, SystemQueries } from "ecsy/System";
import { mat4, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { Canvas3DRenderer } from "../../Core/Render/System/Canvas3DRenderer";
import { SelectableObject } from "../TagComponents/SelectableObject";
import { updateEntityInspector } from "../../Editor/System/EditorInspectorSystem";

const highlightThreshold = 30;

export class Object3DSelectSystem extends Canvas3DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    selectableEntities: {
      components: [TransformData3D, SelectableObject],
    },
  };

  mousePosition: vec2 = vec2.create();
  highlightEntity: Entity | null = null;

  init(attributes?: Attributes | undefined): void {
    super.init(attributes);

    // Update mouse position.
    this.mainCanvas.addEventListener("mousemove", (event) => {
      this.mousePosition = this.getMousePos(event);
    });

    // Update mouse left click.
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        if (this.highlightEntity) {
          updateEntityInspector(this.highlightEntity);
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

    // Generate world to camera matrix.
    this.generateWorldToCameraMatrix();
    // Generate camera to screen matrix.
    this.generateCameraToScreenMatrix();

    // Generate world to screen matrix.
    const worldToScreenMatrix = mat4.create();
    mat4.multiply(worldToScreenMatrix, this.cameraToScreen, this.worldToCamera);

    // Reset highlight entity.
    this.highlightEntity = null;
    let minDistance = highlightThreshold;

    this.queries.selectableEntities.results.forEach((entity) => {
      const transform = entity.getComponent(TransformData3D) as TransformData3D;
      const selectable = entity.getComponent(
        SelectableObject
      ) as SelectableObject;

      // Transform the object position to screen space.
      const screenPos = vec3.create();
      vec3.transformMat4(
        screenPos,
        transform.position.value,
        worldToScreenMatrix
      );

      // Drop the z value.
      if (screenPos[2] < 1) {
        return;
      }

      // Find the closest entity to the mouse.
      const distance = vec2.distance(
        this.mousePosition,
        vec2.fromValues(screenPos[0], screenPos[1])
      );
      if (distance < minDistance) {
        this.highlightEntity = entity;
        minDistance = distance;
      }
    });

    // Draw the highlight entity.
    if (this.highlightEntity) {
      const transform = (this.highlightEntity as Entity).getComponent(
        TransformData3D
      ) as TransformData3D;

      // Transform the object position to screen space.
      const screenPos = vec3.create();
      vec3.transformMat4(
        screenPos,
        transform.position.value,
        worldToScreenMatrix
      );

      // Draw the highlight.
      this.canvasContext.strokeStyle = "black";
      this.canvasContext.beginPath();
      this.canvasContext.arc(
        screenPos[0],
        screenPos[1],
        highlightThreshold,
        0,
        2 * Math.PI
      );
      this.canvasContext.stroke();
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
}
