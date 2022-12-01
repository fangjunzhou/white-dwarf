import { Attributes, System, SystemQueries } from "ecsy-wd";
import { mat4, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { OrthographicCameraData3D } from "../DataComponent/OrthographicCameraData3D";
import { PerspectiveCameraData3D } from "../DataComponent/PerspectiveCameraData3D";
import { MainCameraTag } from "../TagComponent/MainCameraTag";

export class Canvas3DRenderer extends System {
  static queries: SystemQueries = {
    perspectiveMainCamera: {
      components: [MainCameraTag, PerspectiveCameraData3D, TransformData3D],
    },
    orthographicMainCamera: {
      components: [MainCameraTag, OrthographicCameraData3D, TransformData3D],
    },
  };

  mainCanvas!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D;

  worldToCamera: mat4 = mat4.create();
  cameraToScreen: mat4 = mat4.create();

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
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
  }

  /**
   * Construct a transform matrix from world space to model space.
   * @param camTransform the transform of the camera.
   * @param camData the camera data.
   * @returns the world to model matrix.
   */
  orthographicWorldToCamera(
    camTransform: TransformData3D,
    camData: OrthographicCameraData3D
  ): mat4 {
    // Construct world to camera matrix.
    const worldToCamera = mat4.create();
    mat4.invert(worldToCamera, this.objectToWorld(camTransform));
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
    mat4.multiply(worldToCamera, orthographic, worldToCamera);
    return worldToCamera;
  }

  /**
   * Construct a transform matrix from world space to camera space.
   *
   * @param camTransform the transform of the camera.
   * @param camData the camera data.
   * @returns the world to camera matrix.
   */
  perspectiveWorldToCamera(
    camTransform: TransformData3D,
    camData: PerspectiveCameraData3D
  ): mat4 {
    // Construct world to camera matrix.
    const worldToCamera = mat4.create();
    mat4.invert(worldToCamera, this.objectToWorld(camTransform));
    const perspective = mat4.create();
    mat4.perspective(
      perspective,
      camData.fov,
      camData.aspect,
      camData.near,
      camData.far
    );
    mat4.multiply(worldToCamera, perspective, worldToCamera);
    return worldToCamera;
  }

  /**
   * Construct a transform matrix from model space to world space.
   *
   * @param transform the transform of the model.
   * @returns the model to world matrix.
   */
  objectToWorld(transform: TransformData3D, dropScale: boolean = false): mat4 {
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

  generateCameraToScreenMatrix() {
    this.cameraToScreen = mat4.create();

    mat4.fromTranslation(this.cameraToScreen, [
      this.mainCanvas.width / 2,
      this.mainCanvas.height / 2,
      0,
    ]);

    mat4.scale(this.cameraToScreen, this.cameraToScreen, [
      this.mainCanvas.width,
      this.mainCanvas.height,
      1,
    ]);
  }

  generateWorldToCameraMatrix() {
    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    // Get world to screen space matrix.
    if (this.queries.perspectiveMainCamera.results.length > 0) {
      // Perspective camera.
      const camera = this.queries.perspectiveMainCamera.results[0];
      const cameraTransform = camera.getComponent(
        TransformData3D
      ) as TransformData3D;
      const cameraPerspective = camera.getMutableComponent(
        PerspectiveCameraData3D
      ) as PerspectiveCameraData3D;

      // Change the aspect ratio.
      cameraPerspective.aspect = canvasSize[0] / canvasSize[1];

      this.worldToCamera = this.perspectiveWorldToCamera(
        cameraTransform,
        cameraPerspective
      );
    } else {
      // TODO: Orthographic camera.
    }
  }

  drawLine(
    startPoint: vec3,
    endPoint: vec3,
    color: string,
    lineWidth: number
  ): void {
    if (startPoint[2] > 1 && endPoint[2] > 1) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = lineWidth;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(startPoint[0], startPoint[1]);
      this.canvasContext.lineTo(endPoint[0], endPoint[1]);
      this.canvasContext.stroke();
    }
  }
}
