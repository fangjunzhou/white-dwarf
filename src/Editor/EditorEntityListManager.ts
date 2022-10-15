import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { mainWorld } from "../Core";
import { IComponent } from "../Core/ComponentRegistry";
import { IEntityObject } from "../Core/Serialization/EntitySerializer";
import { editorEventContext, editorUIContext } from "./EditorContext";
import { EditorInspectorSystem } from "./System/EditorInspectorSystem";

export const updateEntityList = (entities: Array<Entity>) => {
  if (!editorUIContext.entityLists) {
    return;
  }

  // Traverse all entityLists.
  for (let i = 0; i < editorUIContext.entityLists.length; i++) {
    const entityList = editorUIContext.entityLists[i];
    // Remove all children.
    while (entityList.firstChild) {
      entityList.removeChild(entityList.firstChild);
    }
    // Add new children.
    for (let j = 0; j < entities.length; j++) {
      const entity = entities[j];
      const entityDiv = document.createElement("div");

      // Add entity name.
      const entityName = document.createElement("span");
      entityName.innerText = entity.name === "" ? "Entity" : entity.name;
      entityDiv.appendChild(entityName);

      // Add entity id.
      const entityId = document.createElement("span");
      entityId.innerText = entity.id.toString();
      entityDiv.appendChild(entityId);

      // Set hover style.
      entityDiv.style.cursor = "pointer";

      // Add entity select button.
      entityDiv.className = "entityListItem";
      entityList.appendChild(entityDiv);

      // Add select behavior.
      entityDiv.onclick = () => {
        // Invoke all onEntitySelected callbacks.
        editorEventContext.onEntitySelected.forEach((callback) => {
          callback(entity);
        });
      };
    }
  }
};

export const addNewEntity = (entityName?: string) => {
  // Add new entity to entity list.
  mainWorld.createEntity(entityName);
};

/**
 * Add new entity to world from entity data.
 *
 * @param entityData The entity data to add.
 * @param reserveId Whether to reserve the id of the entity, defaults to false.
 */
export const deserializeEntity = (
  entityData: IEntityObject,
  reserveId: boolean = false
) => {
  // Check if entity already exists.
  const entity = mainWorld.getEntityById(entityData.id);
  if (reserveId && entity && entity.alive) {
    console.warn(
      `Entity with id ${entityData.id} already exists. Skipping deserialization.`
    );
    return;
  }

  // Create new entity.
  let newEntity;
  if (reserveId) {
    newEntity = mainWorld.createEntity(entityData.name, entityData.id);
  } else {
    newEntity = mainWorld.createEntity(entityData.name);
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
};
