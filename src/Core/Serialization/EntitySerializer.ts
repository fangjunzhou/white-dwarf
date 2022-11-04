import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Types } from "ecsy/Types";
import { World } from "ecsy/World";
import { EditorSelectedTag } from "../../Editor/TagComponent/EditorSelectedTag";
import { IComponent } from "../ComponentRegistry";

export interface IEntityObject {
  name: string;
  id: number;
  components: { [key: string]: any };
}

export interface IComponentObject {
  type: string;
  data: any;
}

/**
 * This is a helper class for serializing and deserializing entities.
 */
export class EntitySerializer {
  // The current deserialized entity data.
  public entityData: IEntityObject | null = null;

  /**
   * Serialize an entity to a JSON object.
   *
   * @param component The component to serialize.
   * @returns json object representation of the component.
   */
  public static serializeComponent(
    component: Component<any>
  ): IComponentObject {
    const componentObject: IComponentObject = {
      type: component.constructor.name,
      data: {},
    };

    const componentSchema = Object.getPrototypeOf(component).constructor
      .schema as ComponentSchema;

    const componentDataContent: { [key: string]: any } = {};
    Object.keys(component).forEach((key) => {
      if (
        Object.keys(componentSchema).includes(key) &&
        componentSchema[key].type !== Types.Ref
      ) {
        componentDataContent[key] = component[key as keyof typeof component];
      }
    });

    componentObject.data = componentDataContent;

    return componentObject;
  }

  /**
   * Serialize an entity to a JSON object.
   *
   * @param entity The entity to serialize.
   * @returns json object representation of the entity.
   */
  public static serializeEntity(entity: Entity): IEntityObject {
    const entityObject: IEntityObject = {
      name: entity.name,
      id: entity.id,
      components: {},
    };

    // Get all components of entity.
    const components = entity.getComponents();
    const componentIndices = Object.keys(components);

    // Add components data.
    for (let j = 0; j < componentIndices.length; j++) {
      const componentIndex = componentIndices[j];
      const component = components[componentIndex];

      // Skip EditorSelectedTag.
      if (component.constructor.name === EditorSelectedTag.name) {
        continue;
      }

      const componentObject = EntitySerializer.serializeComponent(component);

      entityObject.components[componentObject.type] = componentObject.data;
    }

    return entityObject;
  }
  /**
   * Add new entity to world from entity data.
   *
   * @param entityData The entity data to add.
   * @param reserveId Whether to reserve the id of the entity, defaults to false.
   */
  public static deserializeEntity(
    world: World,
    entityData: IEntityObject,
    reserveId: boolean = false
  ): Entity | null {
    // Check if entity already exists.
    const entity = world.getEntityById(entityData.id);
    if (reserveId && entity && entity.alive) {
      console.warn(
        `Entity with id ${entityData.id} already exists. Skipping deserialization.`
      );
      return null;
    }

    // Create new entity.
    let newEntity;
    if (reserveId) {
      newEntity = world.createEntity(entityData.name, entityData.id);
    } else {
      newEntity = world.createEntity(entityData.name);
    }

    // Add components.
    for (const componentName in entityData.components) {
      const componentData = entityData.components[componentName];
      // Add component.
      const componentList = IComponent.getImplementations();
      // Get the component with the name.
      let component = componentList.find(
        (component) => component.name === componentName
      );
      if (component) {
        // Add component to entity.
        newEntity.addComponent(component, componentData);
      } else {
        console.error("Component not found.");
      }
    }

    return entity;
  }
}
