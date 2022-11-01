import { Attributes, System, SystemQueries } from "ecsy/System";
import { MainCameraTag } from "../../Core/Render/TagComponent/MainCameraTag";
import { EditorSceneCamTag } from "../TagComponent/EditorSceneCamTag";

export class EditorCamTagAppendSystem extends System {
  static queries: SystemQueries = {
    mainCamera: {
      components: [MainCameraTag],
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
