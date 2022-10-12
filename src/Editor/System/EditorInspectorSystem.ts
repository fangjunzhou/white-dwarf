import { Component, ComponentSchema } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Attributes, System, SystemQueries } from "ecsy/System";
import { Types } from "ecsy/Types";
import { mat3, vec2 } from "gl-matrix";
import { IComponent } from "../../Core/ComponentRegistry";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { Canvas2DRenderer } from "../../Core/Render/System/Canvas2DRenderer";
import { editorUIContext } from "../EditorContext";

const highlightThreshold = 25;

export class EditorInspectorSystem extends Canvas2DRenderer {
  static inspectEntity: Entity | null = null;
  static inspectTransform: Readonly<TransformData2D> | null = null;

  static queries: SystemQueries = {
    ...this.queries,
    highlightEntity: {
      components: [TransformData2D],
    },
  };

  highlightEntity: Entity | null = null;

  init(attributes?: Attributes | undefined): void {
    super.init(attributes);

    // Register mouse move event for main canvas.
    this.mainCanvas.addEventListener("mousemove", (event) => {
      const mousePos = this.getMousePos(event);
      const mouseWorldPos = this.screenToWorld(mousePos);

      // Pick the closest entity and highlight it.
      let closestEntity: Entity | null = null;
      let closestDistance = Number.MAX_VALUE;

      // Find the closest entity.
      this.queries.highlightEntity.results.forEach((entity) => {
        const transform = entity.getComponent(
          TransformData2D
        ) as TransformData2D;
        const distance = vec2.distance(mouseWorldPos, transform.position.value);

        if (distance < highlightThreshold && distance < closestDistance) {
          closestEntity = entity;
          closestDistance = distance;
        }
      });

      // Set the highlight entity.
      this.highlightEntity = closestEntity;
    });
  }

  execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Draw transform and enable selection here.

    // Get the camera transform.
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    // Construct world to camera matrix.
    const worldToCamera = mat3.create();
    mat3.multiply(
      worldToCamera,
      worldToCamera,
      this.worldToCamera(cameraTransform, canvasSize)
    );

    // Draw selected entity.
    if (EditorInspectorSystem.inspectTransform) {
      // Construct object to camera matrix.
      const inspectObjToCamera = mat3.create();
      mat3.multiply(
        inspectObjToCamera,
        worldToCamera,
        this.objectToWorld(EditorInspectorSystem.inspectTransform)
      );

      // Draw axis.
      this.canvasContext.setTransform(
        inspectObjToCamera[0],
        inspectObjToCamera[1],
        inspectObjToCamera[3],
        inspectObjToCamera[4],
        inspectObjToCamera[6],
        inspectObjToCamera[7]
      );

      this.drawAxis();
    }

    // Draw highlight.
    if (this.highlightEntity) {
      const transform = this.highlightEntity.getComponent(
        TransformData2D
      ) as TransformData2D;

      const highlightObjToCamera = mat3.create();
      mat3.multiply(
        highlightObjToCamera,
        worldToCamera,
        this.objectToWorld(transform)
      );

      this.canvasContext.setTransform(
        highlightObjToCamera[0],
        highlightObjToCamera[1],
        highlightObjToCamera[3],
        highlightObjToCamera[4],
        highlightObjToCamera[6],
        highlightObjToCamera[7]
      );

      this.drawHighlight();
    }

    // Reset the transform.
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  }

  /**
   * Get the mouse position in screen space.
   *
   * @param event canvas mouse event.
   * @returns mouse position in screen space.
   */
  getMousePos(event: MouseEvent): vec2 {
    const rect = this.mainCanvas.getBoundingClientRect();
    return vec2.fromValues(event.clientX - rect.left, event.clientY - rect.top);
  }

  /**
   * Convert screen space to world space.
   *
   * @param screenPos screen position.
   * @returns world position.
   */
  screenToWorld(screenPos: vec2): vec2 {
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    const worldPos = vec2.create();
    vec2.transformMat3(
      worldPos,
      screenPos,
      mat3.invert(
        mat3.create(),
        this.worldToCamera(cameraTransform, canvasSize)
      )
    );

    return worldPos;
  }

  drawAxis(): void {
    // Draw x axis.
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = "red";
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(0, 0);
    this.canvasContext.lineTo(100, 0);
    this.canvasContext.stroke();
    // Draw x arrow tip.
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(100, 0);
    this.canvasContext.lineTo(100, 5);
    this.canvasContext.lineTo(110, 0);
    this.canvasContext.lineTo(100, -5);
    this.canvasContext.lineTo(100, 0);
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fill();

    // Draw y axis.
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(0, 0);
    this.canvasContext.lineTo(0, 100);
    this.canvasContext.stroke();

    // Draw y arrow tip.
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(0, 100);
    this.canvasContext.lineTo(5, 100);
    this.canvasContext.lineTo(0, 110);
    this.canvasContext.lineTo(-5, 100);
    this.canvasContext.lineTo(0, 100);
    this.canvasContext.fillStyle = "blue";
    this.canvasContext.fill();

    // Draw center point.
    this.canvasContext.beginPath();
    this.canvasContext.fillStyle = "green";
    this.canvasContext.arc(0, 0, 5, 0, 2 * Math.PI);
    this.canvasContext.fill();
  }

  drawHighlight(): void {
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = "yellow";
    this.canvasContext.lineWidth = 2;
    this.canvasContext.arc(0, 0, highlightThreshold, 0, 2 * Math.PI);
    this.canvasContext.stroke();
  }

  static updateEntityInspector = (entity: Entity | null) => {
    EditorInspectorSystem.inspectEntity = entity;
    // Check if the inspectEntity has Transform component.
    if (entity?.hasComponent(TransformData2D)) {
      this.inspectTransform = entity.getComponent(
        TransformData2D
      ) as Readonly<TransformData2D>;
    }

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

      // Add remove entity button.
      const entityOperationDiv = document.createElement("div");
      entityOperationDiv.className = "componentListItem";

      const removeEntityButton = document.createElement("button");
      removeEntityButton.innerText = "Remove Entity";
      removeEntityButton.style.width = "100%";
      removeEntityButton.onclick = () => {
        // Remove entity.
        entity.remove();
        // Update entity inspector.
        EditorInspectorSystem.updateEntityInspector(null);
      };

      entityOperationDiv.appendChild(removeEntityButton);
      entityInspector.appendChild(entityOperationDiv);

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
      if (
        Object.keys(componentSchema).includes(key) &&
        componentSchema[key].type !== Types.Ref
      ) {
        componentDataContent[key] = component[key as keyof typeof component];
      }
    });

    return JSON.stringify(componentDataContent, null, " ");
  };
}
