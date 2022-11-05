import { Entity } from "ecsy/Entity";
import { Attributes, System, SystemQueries } from "ecsy/System";
import { World } from "ecsy/World";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { EntitySerializer } from "../../Serialization/EntitySerializer";
import { SyncTransform3DData } from "../DataComponents/SyncTransform3DData";

export class MainWorldTransformSyncSystem extends System {
  static queries: SystemQueries = {
    syncEntities: {
      components: [TransformData3D],
      listen: {
        added: true,
        removed: true,
      },
    },
  };

  physicsWorld!: World;
  physicsEntityTable: Map<Entity, Entity | null> = new Map<
    Entity,
    Entity | null
  >();

  init(attributes?: Attributes | undefined): void {
    // Get the physics world.
    this.physicsWorld = attributes?.physicsWorld as World;
  }

  execute(delta: number, time: number): void {
    // Sync all entities to physics world with TransformData3D.
    this.queries.syncEntities.added?.forEach((entity) => {
      // Get original entity mutable transform.
      const originalTransform = entity.getMutableComponent(
        TransformData3D
      ) as TransformData3D;

      // Get entity data.
      const entityData = EntitySerializer.serializeEntity(entity);
      // Deserialize the entity into physics world.
      const physicsEntity = EntitySerializer.deserializeEntity(
        this.physicsWorld,
        entityData
      );

      // Add the entity to the table.
      this.physicsEntityTable.set(entity, physicsEntity);

      physicsEntity?.addComponent(SyncTransform3DData, {
        mainWorldTransform: originalTransform,
      });
    });

    this.queries.syncEntities.removed?.forEach((entity) => {
      // Get the physics entity.
      const physicsEntity = this.physicsEntityTable.get(entity);
      // Remove physics entity.
      physicsEntity?.remove();
      // Update table.
      this.physicsEntityTable.delete(entity);
    });
  }
}
