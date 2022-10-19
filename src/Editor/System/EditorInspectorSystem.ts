import { COMPONENT_CHANGE_EVENT } from "ecsy/Component";
import { Entity } from "ecsy/Entity";
import { Attributes, System, SystemQueries } from "ecsy/System";
import { mat3, vec2 } from "gl-matrix";
import fileDownload from "js-file-download";
import { IComponent } from "../../Core/ComponentRegistry";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { Canvas2DRenderer } from "../../Core/Render/System/Canvas2DRenderer";
import { EntitySerializer } from "../../Core/Serialization/EntitySerializer";
import { Vector2 } from "../../Mathematics/Vector2";
import { editorUIContext } from "../EditorContext";
import { EditorSceneCamTag } from "../TagComponent/EditorSceneCamTag";
import { EditorSelectedTag } from "../TagComponent/EditorSelectedTag";

const highlightThreshold = 25;
const axisLength = 50;

// TODO: Split all inspector operations into ECS based systems.
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

      // If left mouse button is pressed, move the entity.
      if (event.buttons === 1) {
        if (EditorInspectorSystem.inspectEntity) {
          const transform =
            EditorInspectorSystem.inspectEntity.getMutableComponent(
              TransformData2D
            ) as TransformData2D;

          transform.position.copy(
            new Vector2(mouseWorldPos[0], mouseWorldPos[1])
          );
        }
      } else {
        // Pick the closest entity and highlight it.
        let closestEntity: Entity | null = null;
        let closestDistance = Number.MAX_VALUE;

        // Find the closest entity.
        this.queries.highlightEntity.results.forEach((entity) => {
          const transform = entity.getComponent(
            TransformData2D
          ) as TransformData2D;
          const distance = vec2.distance(
            mousePos,
            this.worldToScreen(transform.position.value)
          );

          if (
            distance < highlightThreshold &&
            distance < closestDistance &&
            !entity.hasComponent(EditorSceneCamTag)
          ) {
            closestEntity = entity;
            closestDistance = distance;
          }
        });

        // Set the highlight entity.
        this.highlightEntity = closestEntity;
      }
    });

    // Register left mouse down.
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        if (this.highlightEntity) {
          // Select the entity.
          EditorInspectorSystem.updateEntityInspector(this.highlightEntity);
        } else {
          // Clear the entity inspector.
          EditorInspectorSystem.updateEntityInspector(null);
        }
      }
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

      this.drawAxis(inspectObjToCamera);
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

      this.drawHighlight(highlightObjToCamera);
    }
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
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }

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

  /**
   * Convert world space to screen space.
   *
   * @param worldPos world position.
   * @returns screen position.
   */
  worldToScreen(worldPos: vec2): vec2 {
    // Check if main camera exists.
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    }
    // Check if there's more than one main camera.
    else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }

    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    const screenPos = vec2.create();
    vec2.transformMat3(
      screenPos,
      worldPos,
      this.worldToCamera(cameraTransform, canvasSize)
    );

    return screenPos;
  }

  drawAxis(inspectObjToCamera: mat3): void {
    // Get the starting position.
    const startPos = vec2.fromValues(0, 0);
    vec2.transformMat3(startPos, startPos, inspectObjToCamera);
    // Get the x axis position.
    const xAxisPos = vec2.fromValues(1, 0);
    vec2.transformMat3(xAxisPos, xAxisPos, inspectObjToCamera);
    // Get the y axis position.
    const yAxisPos = vec2.fromValues(0, 1);
    vec2.transformMat3(yAxisPos, yAxisPos, inspectObjToCamera);

    // Normalize the axis: xEnd = xStart + normalize(xAxis - xStart)
    vec2.add(
      xAxisPos,
      startPos,
      vec2.scale(
        vec2.create(),
        vec2.normalize(
          vec2.create(),
          vec2.sub(vec2.create(), xAxisPos, startPos)
        ),
        axisLength
      )
    );

    // Normalize the axis: yEnd = yStart + normalize(yAxis - yStart)
    vec2.add(
      yAxisPos,
      startPos,
      vec2.scale(
        vec2.create(),
        vec2.normalize(
          vec2.create(),
          vec2.sub(vec2.create(), yAxisPos, startPos)
        ),
        axisLength
      )
    );

    // Draw the x axis.
    this.canvasContext.strokeStyle = "red";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(xAxisPos[0], xAxisPos[1]);
    this.canvasContext.stroke();

    // Draw the y axis.
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(yAxisPos[0], yAxisPos[1]);
    this.canvasContext.stroke();
  }

  drawHighlight(highlightObjToCamera: mat3): void {
    // Get the highlight position.
    const startPos = vec2.fromValues(0, 0);
    vec2.transformMat3(startPos, startPos, highlightObjToCamera);

    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.lineWidth = 2;
    this.canvasContext.arc(
      startPos[0],
      startPos[1],
      highlightThreshold,
      0,
      2 * Math.PI
    );
    this.canvasContext.stroke();
  }

  static updateEntityInspector = (entity: Entity | null) => {
    // Removed the EditorSelectedTag from the previous entity.
    if (EditorInspectorSystem.inspectEntity) {
      EditorInspectorSystem.inspectEntity.removeComponent(EditorSelectedTag);
    }

    EditorInspectorSystem.inspectEntity = entity;

    // Add the EditorSelectedTag to the new entity.
    if (EditorInspectorSystem.inspectEntity) {
      EditorInspectorSystem.inspectEntity.addComponent(EditorSelectedTag);
    }

    // Check if the inspectEntity has Transform component.
    if (entity?.hasComponent(TransformData2D)) {
      this.inspectTransform = entity.getComponent(
        TransformData2D
      ) as Readonly<TransformData2D>;
    } else {
      this.inspectTransform = null;
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

      // Entity operations
      const entityOperationDiv = document.createElement("div");
      entityOperationDiv.className = "componentListItem";

      // Add remove entity button.
      EditorInspectorSystem.addRemoveEntityButton(entity, entityOperationDiv);
      // Add serialize entity button.
      EditorInspectorSystem.addSerializeEntityButton(
        entity,
        entityOperationDiv
      );

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
          EditorInspectorSystem.updateEntityInspector(entity);
        };
        componentDiv.appendChild(removeButton);

        // Add component to entityInspector.
        entityInspector.appendChild(componentDiv);
      }

      // Add component feature.
      EditorInspectorSystem.addComponentButton(entity, entityInspector);
    }
  };

  private static addSerializeEntityButton(
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
  private static addComponentButton(
    entity: Entity,
    entityInspector: HTMLDivElement
  ) {
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
        EditorInspectorSystem.updateEntityInspector(entity);
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
  private static addRemoveEntityButton(
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
      EditorInspectorSystem.updateEntityInspector(null);
    };

    entityOperationDiv.appendChild(removeEntityButton);
  }
}
