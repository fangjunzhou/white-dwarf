import { ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { editorUIContext } from "./EditorContext";

let inspectEntity: Entity | null = null;

export const updateEntityInspector = (entity: Entity) => {
  inspectEntity = entity;

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
