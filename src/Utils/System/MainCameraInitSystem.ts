import { Attributes, System, SystemQueries } from "ecsy/System";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { CameraData2D } from "../../Core/Render/DataComponent/CameraData2D";
import { MainCameraTag } from "../../Core/Render/TagComponent/MainCameraTag";
/**
 * Initialize main camera.
 */
export class MainCamInitSystem extends System {
  static queries: SystemQueries = {
    mainCamera: {
      components: [MainCameraTag, CameraData2D, TransformData2D],
    },
  };

  init(attributes?: Attributes | undefined): void {
    // Get main camera query result.
    const mainCamera = this.queries.mainCamera.results;
    // If main camera is not exist, create it.
    if (mainCamera.length === 0) {
      this.world
        .createEntity("Main Camera")
        .addComponent(MainCameraTag)
        .addComponent(CameraData2D)
        .addComponent(TransformData2D);
    }
  }

  execute(delta: number, time: number): void {
    // Do nothing.
  }
}
