import { COMPONENT_CHANGE_EVENT } from "ecsy-wd";
import { System, SystemQueries } from "ecsy-wd";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { SyncTransform3DData } from "../DataComponents/SyncTransform3DData";

export class Transform3DSyncSystem extends System {
  static queries: SystemQueries = {
    syncEntities: {
      components: [TransformData3D, SyncTransform3DData],
      listen: {
        changed: true,
        added: true,
      },
    },
  };

  execute(delta: number, time: number): void {
    this.queries.syncEntities.results.forEach((entity) => {
      // Get sync data.
      const syncData = entity.getComponent(
        SyncTransform3DData
      ) as SyncTransform3DData;
      // Get transform data.
      const transformData = entity.getComponent(
        TransformData3D
      ) as TransformData3D;

      // Sync data.
      syncData.targetTransform.copy(transformData);
      syncData.targetTransform.eventEmitter.emit(
        COMPONENT_CHANGE_EVENT,
        syncData.targetTransform
      );
    });
  }
}
