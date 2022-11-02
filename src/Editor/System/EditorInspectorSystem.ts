import { COMPONENT_CHANGE_EVENT } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import fileDownload from "js-file-download";
import { IComponent } from "../../Core/ComponentRegistry";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { EntitySerializer } from "../../Core/Serialization/EntitySerializer";
import { editorUIContext } from "../EditorContext";
import { EditorSelectedTag } from "../TagComponent/EditorSelectedTag";
import { EditorViewPort2DSystem } from "./EditorViewPort2DSystems";
import { EditorViewPort3DSystem } from "./EditorViewPort3DSystem";

export const updateEntityInspector = (entity: Entity | null) => {
  // Check if the inspectEntity has Transform component.
  if (entity?.hasComponent(TransformData2D)) {
    // Removed the EditorSelectedTag from the previous entity.
    if (EditorViewPort2DSystem.inspectEntity) {
      EditorViewPort2DSystem.inspectEntity.removeComponent(EditorSelectedTag);
    }

    EditorViewPort2DSystem.inspectEntity = entity;

    // Add the EditorSelectedTag to the new entity.
    if (EditorViewPort2DSystem.inspectEntity) {
      EditorViewPort2DSystem.inspectEntity.addComponent(EditorSelectedTag);
    }

    EditorViewPort2DSystem.inspectTransform = entity.getComponent(
      TransformData2D
    ) as Readonly<TransformData2D>;
  } else if (entity?.hasComponent(TransformData3D)) {
    // Removed the EditorSelectedTag from the previous entity.
    if (EditorViewPort3DSystem.inspectEntity) {
      EditorViewPort3DSystem.inspectEntity.removeComponent(EditorSelectedTag);
    }

    EditorViewPort3DSystem.inspectEntity = entity;

    // Add the EditorSelectedTag to the new entity.
    if (EditorViewPort3DSystem.inspectEntity) {
      EditorViewPort3DSystem.inspectEntity.addComponent(EditorSelectedTag);
    }

    EditorViewPort3DSystem.inspectTransform = entity.getMutableComponent(
      TransformData3D
    ) as TransformData3D;
  } else {
    EditorViewPort2DSystem.inspectTransform = null;
    EditorViewPort3DSystem.inspectTransform = null;
  }

  displayEntityInspector(entity);
};

export const displayEntityInspector = (entity: Entity | null) => {
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

    // Entity operations
    const entityOperationDiv = document.createElement("div");
    entityOperationDiv.className = "componentListItem";

    // Add remove entity button.
    addRemoveEntityButton(entity, entityOperationDiv);
    // Add serialize entity button.
    addSerializeEntityButton(entity, entityOperationDiv);

    entityInspector.appendChild(entityOperationDiv);

    // Add components data.
    for (let j = 0; j < componentIndices.length; j++) {
      const componentIndex = componentIndices[j];
      const component = components[componentIndex];

      const componentObject = EntitySerializer.serializeComponent(component);

      // Add component name.
      const componentDiv = document.createElement("div");
      // Set css class.
      componentDiv.className = "componentListItem";

      const componentTitle = document.createElement("h3");
      componentTitle.innerText = componentObject.type;
      componentDiv.appendChild(componentTitle);

      // Custom inspector here.
      if (component.onInspector) {
        component.onInspector(componentDiv);
      }

      // Add a spacer.
      const spacer = document.createElement("div");
      spacer.style.height = "10px";
      componentDiv.appendChild(spacer);

      // Default inspector here.
      if (!component.onInspector || component.useDefaultInspector) {
        const componentData = document.createElement("span");
        componentData.className = "textarea";
        componentData.contentEditable = "true";
        componentData.textContent = JSON.stringify(
          componentObject.data,
          null,
          2
        );
        componentData.style.whiteSpace = "pre-wrap";
        componentData.style.resize = "none";
        componentDiv.appendChild(componentData);

        // When component data is changed.
        componentData.addEventListener("input", (event) => {
          const target = event.target as HTMLTextAreaElement;
          try {
            const newComponentData = JSON.parse(target.textContent || "{}");
            component.copy(newComponentData);
            // Call change event.
            entity.getMutableComponent(
              Object.getPrototypeOf(component).constructor
            );
          } catch (error) {
            console.error(error);
            return;
          }
        });

        // When component data is changed.
        component.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
          const componentObject =
            EntitySerializer.serializeComponent(component);
          // Check if the componentData box is focused.
          if (document.activeElement !== componentData) {
            componentData.textContent = JSON.stringify(
              componentObject.data,
              null,
              2
            );
          }
        });
      }

      // Add a remove button.
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.onclick = () => {
        // Remove component.
        entity.removeComponent(Object.getPrototypeOf(component).constructor);
        // Update entity inspector.
        updateEntityInspector(entity);
      };
      componentDiv.appendChild(removeButton);

      // Add component to entityInspector.
      entityInspector.appendChild(componentDiv);
    }

    // Add component feature.
    addComponentButton(entity, entityInspector);
  }
};

function addSerializeEntityButton(
  entity: Entity,
  entityOperationDiv: HTMLDivElement
) {
  const serializeEntityButton = document.createElement("button");
  serializeEntityButton.innerText = "Serialize Entity";
  serializeEntityButton.style.width = "100%";
  serializeEntityButton.onclick = () => {
    const serializedEntity = EntitySerializer.serializeEntity(entity);
    fileDownload(JSON.stringify(serializedEntity, null, 2), "entity.json");
  };
  entityOperationDiv.appendChild(serializeEntityButton);
}

/**
 * Add a new component to entity.
 *
 * @param entity the entity to add component to.
 * @param entityInspector the entity inspector to add component button to.
 */
function addComponentButton(entity: Entity, entityInspector: HTMLDivElement) {
  const componentAddDiv = document.createElement("div");
  componentAddDiv.className = "componentListItem";

  const componentNameInput = document.createElement("select");
  const componentList = IComponent.getImplementations();
  const componentNames = componentList.map((component) => component.name);
  for (let j = 0; j < componentNames.length; j++) {
    const componentName = componentNames[j];
    const option = document.createElement("option");
    option.value = componentName;
    option.innerText = componentName;
    componentNameInput.appendChild(option);
  }
  componentAddDiv.appendChild(componentNameInput);

  // Add "Add Component" button.
  const addComponentButton = document.createElement("button");
  addComponentButton.style.width = "100%";
  addComponentButton.innerText = "Add Component";
  addComponentButton.onclick = () => {
    // Add component.
    const componentList = IComponent.getImplementations();
    // Get the component with the name.
    let component = componentList.find(
      (component) => component.name === componentNameInput.value
    );
    if (component) {
      // Add component to entity.
      entity.addComponent(component);
      updateEntityInspector(entity);
    } else {
      console.error("Component not found.");
    }
  };
  componentAddDiv.appendChild(addComponentButton);

  entityInspector.appendChild(componentAddDiv);
}

/**
 * Remove the entity.
 *
 * @param entity the entity to remove.
 * @param entityOperationDiv the entity operation div to add remove button to.
 */
function addRemoveEntityButton(
  entity: Entity,
  entityOperationDiv: HTMLDivElement
) {
  const removeEntityButton = document.createElement("button");
  removeEntityButton.innerText = "Remove Entity";
  removeEntityButton.style.width = "100%";
  removeEntityButton.onclick = () => {
    // Remove entity.
    entity.remove();
    // Update entity inspector.
    updateEntityInspector(null);
  };

  entityOperationDiv.appendChild(removeEntityButton);
}
