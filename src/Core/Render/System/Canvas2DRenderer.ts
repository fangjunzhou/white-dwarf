import { Attributes, System, SystemQueries } from "ecsy/System";
import { TransformData2D } from "../../Locomotion/DataComponent/TransformData2D";
import { CameraData2D } from "../DataComponent/CameraData2D";
import { MainCameraTag } from "../TagComponent/MainCameraTag";

/**
 * Base class for canvas renderers.
 */
export class Canvas2DRenderer extends System {
  static queries: SystemQueries = {
    mainCamera: {
      components: [MainCameraTag, CameraData2D, TransformData2D],
    },
  };

  mainCanvas!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
  }

  execute(delta: number, time: number): void {
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }
  }
}
