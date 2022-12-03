import { Attributes, System } from "ecsy-wd";

export class ClearCanvasWebGLSystem extends System {
  mainCanvas!: HTMLCanvasElement;
  glContext!: WebGLRenderingContext;

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.glContext = this.mainCanvas.getContext(
      "webgl"
    ) as WebGLRenderingContext;
  }

  execute(delta: number, time: number): void {
    this.glContext.clearColor(0.0, 0.0, 0.0, 1.0);
    this.glContext.enable(this.glContext.DEPTH_TEST);
    this.glContext.clear(
      this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT
    );
  }
}
