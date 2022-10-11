import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Attributes, System } from "ecsy/System";
import { IComponent } from "../../Core/ComponentRegistry";
import { editorUIContext } from "../EditorContext";

export class EditorInspectorSystem extends System {
  static inspectEntity: Entity | null = null;

  init(attributes?: Attributes | undefined): void {}

  execute(delta: number, time: number): void {}

  static updateEntityInspector = (entity: Entity | null) => {
    EditorInspectorSystem.inspectEntity = entity;

    EditorInspectorSystem.displayEntityInspector(entity);
  };

  static displayEntityInspector = (entity: Entity | null) => {
    if (!editorUIContext.entityInspector) {
      return;
    }

    if (entity === null) {
      // Traverse all entityInspectors.
      for (let i = 0; i < editorUIContext.entityInspector.length; i++) {
        const entityInspector = editorUIContext.entityInspector[i];
        // Remove all children.
        while (entityInspector.firstChild) {
          entityInspector.removeChild(entityInspector.firstChild);
        }
      }

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

        // Add component name.
        const componentDiv = document.createElement("div");
        const componentTitle = document.createElement("span");
        componentTitle.innerText = component.constructor.name;
        componentDiv.appendChild(componentTitle);

        // Add component data.
        const componentData = document.createElement("span");
        componentData.className = "textarea";
        componentData.contentEditable = "true";
        componentData.textContent =
          EditorInspectorSystem.getComponentString(component);
        componentData.style.whiteSpace = "pre-wrap";
        componentData.style.resize = "none";
        componentDiv.appendChild(componentData);

        // Add a remove button.
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.onclick = () => {
          // Remove component.
          entity.removeComponent(Object.getPrototypeOf(component).constructor);
          // Update entity inspector.
          EditorInspectorSystem.updateEntityInspector(entity);
        };
        componentDiv.appendChild(removeButton);

        // When component data is changed.
        componentData.addEventListener("input", (event) => {
          const target = event.target as HTMLTextAreaElement;
          try {
            const newComponentData = JSON.parse(target.textContent || "{}");
            Object.keys(newComponentData).forEach((key) => {
              component[key as keyof typeof component] = newComponentData[key];
            });
          } catch (error) {
            console.error(error);
            return;
          }
        });

        // When component data is changed.
        component.onComponentChanged = (component) => {
          // Check if the componentData box is focused.
          if (document.activeElement !== componentData) {
            componentData.textContent =
              EditorInspectorSystem.getComponentString(component);
          }
        };

        // Set css class.
        componentDiv.className = "componentListItem";

        // Add component to entityInspector.
        entityInspector.appendChild(componentDiv);
      }

      const componentAddDiv = document.createElement("div");
      componentAddDiv.className = "componentListItem";

      const componentNameInput = document.createElement("input");
      componentNameInput.type = "text";
      componentNameInput.placeholder = "Component Name";
      componentAddDiv.appendChild(componentNameInput);

      // Add "Add Component" button.
      const addComponentButton = document.createElement("button");
      addComponentButton.style.width = "100%";
      addComponentButton.innerText = "Add Component";
      addComponentButton.onclick = () => {
        // TODO: Add component.
        let componentList = IComponent.getImplementations();
        console.log(componentNameInput.value);
        // Get the component with the name.
        let component = componentList.find(
          (component) => component.name === componentNameInput.value
        );
        if (component) {
          // Add component to entity.
          entity.addComponent(component);
          EditorInspectorSystem.updateEntityInspector(entity);
        } else {
          console.error("Component not found.");
        }
      };
      componentAddDiv.appendChild(addComponentButton);

      entityInspector.appendChild(componentAddDiv);
    }
  };

  private static getComponentString = (component: Component<any>) => {
    const componentSchema = Object.getPrototypeOf(component).constructor
      .schema as ComponentSchema;

    const componentDataContent: { [key: string]: any } = {};
    Object.keys(component).forEach((key) => {
      if (Object.keys(componentSchema).includes(key)) {
        componentDataContent[key] = component[key as keyof typeof component];
      }
    });

    return JSON.stringify(componentDataContent, null, " ");
  };
}
