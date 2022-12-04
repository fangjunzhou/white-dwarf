import { Entity, Attributes } from "ecsy-wd";
import { vec2 } from "gl-matrix";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { CanvasWebGLRenderer } from "../../Core/Render/System/CanvasWebGLRenderer";

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
