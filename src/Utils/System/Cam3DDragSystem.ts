import { Attributes, System, SystemQueries } from "ecsy/System";
import { quat, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { OrthographicCameraData3D } from "../../Core/Render/DataComponent/OrthographicCameraData3D";
import { PerspectiveCameraData3D } from "../../Core/Render/DataComponent/PerspectiveCameraData3D";
import { MainCameraTag } from "../../Core/Render/TagComponent/MainCameraTag";
import { Vector2 } from "../../Mathematics/Vector2";
import { Vector3 } from "../../Mathematics/Vector3";

const rotateSensitive = 0.1;

export class Cam3DDragSystem extends System {
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

  deltaRot: Vector2 = new Vector2(0, 0);
  deltaPos: Vector3 = new Vector3(0, 0, 0);

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    // Listen to mouse rotate event.
    this.mainCanvas.addEventListener("mousemove", (event) => {
      // Check if the right mouse button is pressed.
      if (event.buttons === 2) {
        // Calculate the delta position.
        vec2.add(
          this.deltaRot.value,
          this.deltaRot.value,
          vec2.fromValues(
            -event.movementX * rotateSensitive,
            event.movementY * rotateSensitive
          )
        );
      }
    });
  }

  execute(delta: number, time: number): void {
    // Check if main camera exists.
    if (
      this.queries.perspectiveMainCamera.results.length +
        this.queries.orthographicMainCamera.results.length ===
      0
    ) {
      return;
    }
    // Check if there's more than one main camera.
    else if (
      this.queries.perspectiveMainCamera.results.length +
        this.queries.orthographicMainCamera.results.length >
      1
    ) {
      return;
    }

    // Get the main camera transform.
    const mainCameraTransform =
      this.queries.perspectiveMainCamera.results[0].getMutableComponent(
        TransformData3D
      ) as TransformData3D;

    // Get the camera front vector front its transform rotation.
    const front = vec3.fromValues(0, 0, -1);
    vec3.transformQuat(front, front, mainCameraTransform.rotation.value);
    // Get the camera right vector from its transform rotation.
    const right = vec3.fromValues(1, 0, 0);
    vec3.transformQuat(right, right, mainCameraTransform.rotation.value);

    // Rotate the camera around the y-axis.
    const rotX = quat.create();
    quat.rotateY(rotX, rotX, this.deltaRot.value[0] * delta);
    // Rotate the camera around the camera's right vector.
    const rotY = quat.create();
    quat.setAxisAngle(rotY, right, this.deltaRot.value[1] * delta);
    // Combine the two rotations.
    const rot = quat.create();
    quat.multiply(rot, rotX, rotY);
    // Apply the rotation to the camera's rotation.
    quat.multiply(
      mainCameraTransform.rotation.value,
      rot,
      mainCameraTransform.rotation.value
    );

    // Reset the delta rotation.
    vec2.set(this.deltaRot.value, 0, 0);
  }
}
