import { Attributes, System, SystemQueries } from "ecsy/System";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { CameraData2D } from "../../Core/Render/DataComponent/CameraData2D";
import { MainCameraTag } from "../../Core/Render/TagComponent/MainCameraTag";
import { EditorSceneCamTag } from "../TagComponent/EditorSceneCamTag";

export class EditorCamTagAppendSystem extends System {
  static queries: SystemQueries = {
    mainCamera: {
      components: [MainCameraTag, CameraData2D, TransformData2D],
    },
  };

  init(attributes?: Attributes | undefined): void {
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }

    // Append editor camera tag.
    this.queries.mainCamera.results[0].addComponent(EditorSceneCamTag);
  }

  execute(delta: number, time: number): void {
    // Do nothing.
  }
}
