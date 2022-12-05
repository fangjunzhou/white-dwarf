import { Entity, Attributes } from "ecsy-wd";
import { mat4, vec2 } from "gl-matrix";
import { TransformData3D } from "../../../Core/Locomotion/DataComponent/TransformData3D";
import { CanvasWebGLRenderer } from "../../../Core/Render/System/CanvasWebGLRenderer";
import { EditorControl, editorControlContext } from "../../EditorContext";
import { EditorSceneCamTag } from "../../TagComponent/EditorSceneCamTag";

export class EditorViewPortWebGLSystem extends CanvasWebGLRenderer {
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

  public execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // View matrix.
    const tView = this.getViewMatrix(this.cameraTransform);
    // Projection matrix.
    let tProjection: mat4;
    if (this.cameraPerspective) {
      tProjection = this.getPerspectiveProjectionMatrix(this.cameraPerspective);
    } else if (this.cameraOrthographic) {
      tProjection = this.getOrthographicProjectionMatrix(
        this.cameraOrthographic
      );
    } else {
      throw new Error("No camera found.");
    }

    // Draw selected entity.
    if (
      editorControlContext.controlMode == EditorControl.Move &&
      EditorViewPortWebGLSystem.inspectTransform &&
      !EditorViewPortWebGLSystem.inspectEntity?.hasComponent(EditorSceneCamTag)
    ) {
      this.drawInspectEntity(
        EditorViewPortWebGLSystem.inspectEntity as Entity,
        EditorViewPortWebGLSystem.inspectTransform as TransformData3D,
        tView,
        tProjection
      );
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
   * Draw the inspect entity.
   */
  drawInspectEntity(
    entity: Entity,
    transform: TransformData3D,
    tView: mat4,
    tProjection: mat4
  ): void {}
}
