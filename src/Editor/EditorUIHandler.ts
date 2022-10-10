import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { editorEventContext, editorUIContext } from "./EditorContext";

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

export const updateEntityInspector = (entity: Entity) => {
  if (!editorUIContext.entityInspector) {
    return;
  }

  // Get all components of entity.
  const components = entity.getComponents();
  const componentIndices = Object.keys(components);

  // Traverse all entityInspectors.
  for (let i = 0; i < editorUIContext.entityInspector.length; i++) {
    const entityInspector = editorUIContext.entityInspector[i];
    // Remove all children.
    while (entityInspector.firstChild) {
      entityInspector.removeChild(entityInspector.firstChild);
    }

    // Add components data.
    for (let j = 0; j < componentIndices.length; j++) {
      const componentIndex = componentIndices[j];
      const component = components[componentIndex];
      const componentSchema = Object.getPrototypeOf(component).constructor
        .schema as ComponentSchema;
      const componentDataContent: { [key: string]: any } = {};
      Object.keys(component).forEach((key) => {
        if (Object.keys(componentSchema).includes(key)) {
          componentDataContent[key] = component[key as keyof typeof component];
        }
      });

      // Add component name.
      const componentDiv = document.createElement("div");
      const componentTitle = document.createElement("span");
      componentTitle.innerText = component.constructor.name;
      componentDiv.appendChild(componentTitle);

      // Add component data.
      const componentData = document.createElement("pre");
      componentData.innerText = JSON.stringify(componentDataContent, null, " ");
      componentDiv.appendChild(componentData);

      // Set css class.
      componentDiv.className = "componentListItem";

      // Add component to entityInspector.
      entityInspector.appendChild(componentDiv);
    }
  }
};
