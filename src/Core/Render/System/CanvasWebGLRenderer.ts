import { Attributes, System, SystemQueries } from "ecsy-wd";
import { mat4, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { OrthographicCameraData3D } from "../DataComponent/OrthographicCameraData3D";
import { PerspectiveCameraData3D } from "../DataComponent/PerspectiveCameraData3D";
import { MainCameraTag } from "../TagComponent/MainCameraTag";

export class CanvasWebGLRenderer extends System {
  static queries: SystemQueries = {
    perspectiveMainCamera: {
      components: [MainCameraTag, PerspectiveCameraData3D, TransformData3D],
    },
    orthographicMainCamera: {
      components: [MainCameraTag, OrthographicCameraData3D, TransformData3D],
    },
  };

  mainCanvas!: HTMLCanvasElement;
  canvasContext!: WebGLRenderingContext;

  cameraTransform!: TransformData3D;
  cameraPerspective: PerspectiveCameraData3D | null = null;
  cameraOrthographic: OrthographicCameraData3D | null = null;

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "webgl"
    ) as WebGLRenderingContext;
  }

  execute(delta: number, time: number): void {
    // Check if main camera exists.
    if (
      this.queries.perspectiveMainCamera.results.length +
        this.queries.orthographicMainCamera.results.length ===
      0
    ) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (
      this.queries.perspectiveMainCamera.results.length +
        this.queries.orthographicMainCamera.results.length >
      1
    ) {
      throw new Error("More than one main camera found.");
    }

    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    // Set webgl render buffer size.
    this.canvasContext.viewport(0, 0, canvasSize[0], canvasSize[1]);

    if (this.queries.perspectiveMainCamera.results.length > 0) {
      // Perspective camera.
      const camera = this.queries.perspectiveMainCamera.results[0];
      this.cameraTransform = camera.getComponent(
        TransformData3D
      ) as TransformData3D;
      this.cameraPerspective = camera.getMutableComponent(
        PerspectiveCameraData3D
      ) as PerspectiveCameraData3D;

      // Change the aspect ratio.
      this.cameraPerspective.aspect = canvasSize[0] / canvasSize[1];
    } else {
      // Orthographic camera.
      const camera = this.queries.orthographicMainCamera.results[0];
      this.cameraTransform = camera.getComponent(
        TransformData3D
      ) as TransformData3D;
      this.cameraOrthographic = camera.getMutableComponent(
        OrthographicCameraData3D
      ) as OrthographicCameraData3D;

      // Change the view port size.
      // TODO: Change the zoom factor using scroll wheel.
      this.cameraOrthographic.left =
        (-canvasSize[0] * 10) / (2 * canvasSize[1]);
      this.cameraOrthographic.right =
        (canvasSize[0] * 10) / (2 * canvasSize[1]);
      this.cameraOrthographic.bottom = -10 / 2;
      this.cameraOrthographic.top = 10 / 2;
    }
  }

  /**
   * Construct a transform matrix from model space to world space.
   * @param transform the transform of the model.
   * @returns the model matrix.
   */
  getModelMatrix(transform: TransformData3D, dropScale: boolean = false): mat4 {
    const objectToWorld = mat4.create();
    if (dropScale) {
      mat4.fromRotationTranslation(
        objectToWorld,
        transform.rotation.value,
        transform.position.value
      );
    } else {
      mat4.fromRotationTranslationScale(
        objectToWorld,
        transform.rotation.value,
        transform.position.value,
        transform.scale.value
      );
    }
    return objectToWorld;
  }

  /**
   * Construct a transform matrix from world space to camera space.
   * @param camTransform the transform of the camera.
   * @returns the view matrix.
   */
  getViewMatrix(camTransform: TransformData3D): mat4 {
    // Construct world to camera matrix.
    const worldToCamera = mat4.create();
    const cameraToWorld = mat4.create();
    mat4.fromRotationTranslationScale(
      cameraToWorld,
      camTransform.rotation.value,
      camTransform.position.value,
      vec3.fromValues(-1, 1, -1)
    );
    mat4.invert(worldToCamera, cameraToWorld);
    return worldToCamera;
  }

  /**
   * Construct a transform matrix from world space to model space.
   * @param camData the camera data.
   * @returns the world to model matrix.
   */
  getOrthographicProjectionMatrix(camData: OrthographicCameraData3D): mat4 {
    const orthographic = mat4.create();
    mat4.ortho(
      orthographic,
      camData.left,
      camData.right,
      camData.bottom,
      camData.top,
      camData.near,
      camData.far
    );
    return orthographic;
  }

  /**
   * Construct a transform matrix from world space to camera space.
   * @param camData the camera data.
   * @returns the world to camera matrix.
   */
  getPerspectiveProjectionMatrix(camData: PerspectiveCameraData3D): mat4 {
    const perspective = mat4.create();
    mat4.perspective(
      perspective,
      camData.fov,
      camData.aspect,
      camData.near,
      camData.far
    );
    return perspective;
  }

  getNDCToViewportMatrix(): mat4 {
    const ndcToViewport = mat4.create();
    mat4.fromTranslation(ndcToViewport, [
      this.mainCanvas.width / 2,
      this.mainCanvas.height / 2,
      0,
    ]);

    mat4.scale(ndcToViewport, ndcToViewport, [
      this.mainCanvas.width,
      this.mainCanvas.height,
      1,
    ]);

    return ndcToViewport;
  }
}
