import { World } from "ecsy/World";
import { EditorSceneCamTag } from "../../Editor/TagComponent/EditorSceneCamTag";
import { EntitySerializer, IEntityObject } from "./EntitySerializer";

// TODO: Add system serialization here.
export interface IWorldObject {
  entities: IEntityObject[];
}

/**
 * This is a helper class for serializing and deserializing worlds.
 */
export class WorldSerializer {
  /**
   * Serialize a world to a JSON object.
   *
   * @param world The world to serialize.
   * @returns IWorldObject containing all the serialized entities.
   */
  public static serializeWorld(world: World): IWorldObject {
    const worldObject: IWorldObject = {
      entities: [],
    };

    world.getAllEntities().forEach((entity) => {
      // Filter out editor camera.
      if (entity.hasComponent(EditorSceneCamTag)) {
        return;
      }

      worldObject.entities.push(EntitySerializer.serializeEntity(entity));
    });

    return worldObject;
  }

  public static deserializeWorld(world: World, worldObject: IWorldObject) {
    worldObject.entities.forEach((entityObject) => {
      EntitySerializer.deserializeEntity(world, entityObject);
    });
  }
}
