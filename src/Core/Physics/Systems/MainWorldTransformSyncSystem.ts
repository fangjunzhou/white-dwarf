import { Attributes, System, SystemQueries } from "ecsy/System";
import { World } from "ecsy/World";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { EntitySerializer } from "../../Serialization/EntitySerializer";
import { SyncTransform3DData } from "../DataComponents/SyncTransform3DData";

export class MainWorldTransformSyncSystem extends System {
  static queries: SystemQueries = {
    syncEntities: {
      components: [TransformData3D],
    },
  };

  init(attributes?: Attributes | undefined): void {
    // Get the physics world.
    const physicsWorld: World = attributes?.physicsWorld as World;

    // Sync all entities to physics world with TransformData3D.
    this.queries.syncEntities.results.forEach((entity) => {
      // Get original entity mutable transform.
      const originalTransform = entity.getMutableComponent(
        TransformData3D
      ) as TransformData3D;

      // Get entity data.
      const entityData = EntitySerializer.serializeEntity(entity);
      // Deserialize the entity into physics world.
      const physicsEntity = EntitySerializer.deserializeEntity(
        physicsWorld,
        entityData
      );

      physicsEntity?.addComponent(SyncTransform3DData, {
        mainWorldTransform: originalTransform,
      });
    });
  }

  execute(delta: number, time: number): void {
    // Do nothing.
  }
}
