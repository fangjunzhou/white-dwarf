import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Types } from "ecsy/Types";

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

      const componentObject = EntitySerializer.serializeComponent(component);

      entityObject.components[componentObject.type] = componentObject.data;
    }

    return entityObject;
  }
}
