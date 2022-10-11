import { ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Attributes, System } from "ecsy/System";
import { editorUIContext } from "../EditorContext";

export class EditorInspectorSystem extends System {
  static inspectEntity: Entity | null = null;

  init(attributes?: Attributes | undefined): void {}

  execute(delta: number, time: number): void {
    // if (EditorInspectorSystem.inspectEntity) {
    //   EditorInspectorSystem.updateEntityInspector(
    //     EditorInspectorSystem.inspectEntity
    //   );
    // }
  }

  static updateEntityInspector = (entity: Entity) => {
    EditorInspectorSystem.inspectEntity = entity;

    EditorInspectorSystem.displayEntityInspector(entity);
  };

  static displayEntityInspector = (entity: Entity) => {
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
            componentDataContent[key] =
              component[key as keyof typeof component];
          }
        });

        // Add component name.
        const componentDiv = document.createElement("div");
        const componentTitle = document.createElement("span");
        componentTitle.innerText = component.constructor.name;
        componentDiv.appendChild(componentTitle);

        // Add component data.
        const componentData = document.createElement("span");
        componentData.className = "textarea";
        componentData.role = "textbox";
        componentData.contentEditable = "true";
        componentData.textContent = JSON.stringify(
          componentDataContent,
          null,
          " "
        );
        componentData.style.whiteSpace = "pre-wrap";
        componentData.style.resize = "none";
        componentDiv.appendChild(componentData);

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

        // Set css class.
        componentDiv.className = "componentListItem";

        // Add component to entityInspector.
        entityInspector.appendChild(componentDiv);
      }
    }
  };
}
