import { Attributes, System, SystemQueries } from "ecsy-wd";
import { mat3, vec2 } from "gl-matrix";
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

  /**
   * Construct a transform matrix from world position to camera space.
   *
   * @param camTransform The transform of the camera.
   * @param canvasSize the size of the canvas in vector2.
   */
  worldToCamera(camTransform: TransformData2D, canvasSize: vec2): mat3 {
    // Construct world to camera matrix.
    const worldToCamera = mat3.create();
    // Center the camera.
    mat3.fromTranslation(
      worldToCamera,
      vec2.fromValues(canvasSize[0] / 2, canvasSize[1] / 2)
    );
    mat3.scale(worldToCamera, worldToCamera, camTransform.scale.value);
    mat3.translate(
      worldToCamera,
      worldToCamera,
      vec2.negate(vec2.create(), camTransform.position.value)
    );
    mat3.rotate(worldToCamera, worldToCamera, camTransform.rotation);

    return worldToCamera;
  }

  /**
   * Construct a transform matrix from object space to world space.
   *
   * @param objTransform
   */
  objectToWorld(objTransform: TransformData2D): mat3 {
    // TODO: Convert local transform to world transform.
    // Construct entity to world matrix.
    const objectToWorld = mat3.create();
    mat3.fromTranslation(objectToWorld, objTransform.position.value);
    mat3.rotate(objectToWorld, objectToWorld, objTransform.rotation);
    mat3.scale(objectToWorld, objectToWorld, objTransform.scale.value);

    return objectToWorld;
  }
}
