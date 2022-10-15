import { Attributes, System, SystemQueries } from "ecsy/System";
import { MainCameraInitTag } from "../TagComponent/MainCameraInitTag";
import { MainCameraTag } from "../TagComponent/MainCameraTag";

/**
 * This system replace all MainCameraInitTag to MainCameraTag.
 */
export class MainCameraInitSystem extends System {
  static queries: SystemQueries = {
    mainCameraInitEntities: {
      components: [MainCameraInitTag],
      listen: {
        added: true,
      },
    },
  };

  execute(delta: number, time: number): void {
    this.queries.mainCameraInitEntities.results.forEach((entity) => {
      entity.removeComponent(MainCameraInitTag);
      entity.addComponent(MainCameraTag);
    });
  }
}
