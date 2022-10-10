import { Attributes, System } from "ecsy/System";

export class ClearCanvasSystem extends System {
  mainCanvas!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
  }

  execute(delta: number, time: number): void {
    this.canvasContext.clearRect(
      0,
      0,
      this.mainCanvas.width,
      this.mainCanvas.height
    );
  }
}
