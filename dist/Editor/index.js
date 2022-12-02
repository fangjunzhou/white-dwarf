"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/Editor/index.ts
var Editor_exports = {};
__export(Editor_exports, {
  editorInit: () => editorInit
});
module.exports = __toCommonJS(Editor_exports);
var import_js_file_download2 = __toESM(require("js-file-download"));

// src/Core/index.ts
var import_ecsy_wd = require("ecsy-wd");

// src/Core/ComponentRegistry.ts
var IComponent;
((IComponent2) => {
  const implementations = [];
  function getImplementations() {
    return implementations;
  }
  IComponent2.getImplementations = getImplementations;
  function register(ctor) {
    implementations.push(ctor);
    return ctor;
  }
  IComponent2.register = register;
})(IComponent || (IComponent = {}));

// src/Core/Context/RenderContext.ts
var coreRenderContext = {
  mainCanvas: null,
  mainCamera: null
};

// src/Core/CoreSetup.ts
var coreSetup = () => {
  if (!coreRenderContext.mainCanvas) {
    throw new Error("Main canvas is not ready.");
  }
  let componentConstructors = IComponent.getImplementations();
  for (let i = 0; i < componentConstructors.length; i++) {
    mainWorld.registerComponent(componentConstructors[i]);
  }
  systemContext.coreSetup();
};
var systemContext = {
  coreSetup: () => {
  },
  coreStart: () => __async(void 0, null, function* () {
  }),
  editorStart: () => {
  }
};

// src/Core/index.ts
var mainWorld = new import_ecsy_wd.World();
var physicsWorld = new import_ecsy_wd.World();
var timeContext = {
  startTime: 0,
  currentTime: 0,
  deltaTime: 0,
  timeScale: 1,
  fixedTimeStep: 1 / 120
};
var mainUpdate = () => {
  let currentTime = Date.now() / 1e3;
  timeContext.deltaTime = (currentTime - timeContext.currentTime) * timeContext.timeScale;
  timeContext.currentTime = currentTime;
  mainWorld.execute(timeContext.deltaTime);
  requestAnimationFrame(mainUpdate);
};
var physicsUpdate = () => __async(void 0, null, function* () {
  while (true) {
    physicsWorld.execute(timeContext.fixedTimeStep);
    yield new Promise(
      (resolve) => setTimeout(resolve, timeContext.fixedTimeStep * 1e3)
    );
  }
});
var mainInit = () => {
  timeContext.startTime = Date.now() / 1e3;
  timeContext.currentTime = timeContext.startTime;
  timeContext.deltaTime = 0;
  requestAnimationFrame(mainUpdate);
  physicsUpdate();
};
var resetWorld = () => {
  mainWorld = new import_ecsy_wd.World();
  physicsWorld = new import_ecsy_wd.World();
};

// src/Core/Serialization/EntitySerializer.ts
var import_ecsy_wd3 = require("ecsy-wd");

// src/Editor/TagComponent/EditorSelectedTag.ts
var import_ecsy_wd2 = require("ecsy-wd");
var EditorSelectedTag = class extends import_ecsy_wd2.TagComponent {
};
EditorSelectedTag = __decorateClass([
  IComponent.register
], EditorSelectedTag);

// src/Core/Serialization/EntitySerializer.ts
var EntitySerializer = class {
  constructor() {
    this.entityData = null;
  }
  static serializeComponent(component) {
    const componentObject = {
      type: component.constructor.name,
      data: {}
    };
    const componentSchema = Object.getPrototypeOf(component).constructor.schema;
    const componentDataContent = {};
    Object.keys(component).forEach((key) => {
      if (Object.keys(componentSchema).includes(key) && componentSchema[key].type !== import_ecsy_wd3.Types.Ref) {
        componentDataContent[key] = component[key];
      }
    });
    componentObject.data = componentDataContent;
    return componentObject;
  }
  static serializeEntity(entity) {
    const entityObject = {
      name: entity.name,
      id: entity.id,
      components: {}
    };
    const components = entity.getComponents();
    const componentIndices = Object.keys(components);
    for (let j = 0; j < componentIndices.length; j++) {
      const componentIndex = componentIndices[j];
      const component = components[componentIndex];
      if (component.constructor.name === EditorSelectedTag.name) {
        continue;
      }
      const componentObject = EntitySerializer.serializeComponent(component);
      entityObject.components[componentObject.type] = componentObject.data;
    }
    return entityObject;
  }
  static deserializeEntity(world, entityData, reserveId = false) {
    const entity = world.getEntityById(entityData.id);
    if (reserveId && entity && entity.alive) {
      console.warn(
        `Entity with id ${entityData.id} already exists. Skipping deserialization.`
      );
      return null;
    }
    let newEntity;
    if (reserveId) {
      newEntity = world.createEntity(entityData.name, entityData.id);
    } else {
      newEntity = world.createEntity(entityData.name);
    }
    for (const componentName in entityData.components) {
      const componentData = entityData.components[componentName];
      const componentList = IComponent.getImplementations();
      let component = componentList.find(
        (component2) => component2.name === componentName
      );
      if (component) {
        newEntity.addComponent(component, componentData);
      } else {
        console.error("Component not found.");
      }
    }
    return entity;
  }
};

// src/Editor/TagComponent/EditorSceneCamTag.ts
var import_ecsy_wd4 = require("ecsy-wd");
var EditorSceneCamTag = class extends import_ecsy_wd4.TagComponent {
};
EditorSceneCamTag = __decorateClass([
  IComponent.register
], EditorSceneCamTag);

// src/Core/Serialization/WorldSerializer.ts
var WorldSerializer = class {
  static serializeWorld(world) {
    const worldObject = {
      entities: []
    };
    world.getAllEntities().forEach((entity) => {
      if (entity.hasComponent(EditorSceneCamTag)) {
        return;
      }
      worldObject.entities.push(EntitySerializer.serializeEntity(entity));
    });
    return worldObject;
  }
  static deserializeWorld(world, worldObject) {
    worldObject.entities.forEach((entityObject) => {
      EntitySerializer.deserializeEntity(world, entityObject);
    });
  }
};

// src/Editor/EditorContext.ts
var editorUIContext = {
  entityLists: null,
  entityInspector: null,
  playButton: null,
  entityNameInput: null,
  createEntityButton: null,
  deserializeEntityButton: null,
  saveWorldButton: null,
  loadWorldButton: null,
  editorModeDropdown: null
};
var editorEventContext = {
  onEntitySelected: []
};
var editorControlContext = {
  controlMode: 1 /* Move */
};

// src/Editor/EditorEntityListManager.ts
var updateEntityList = (entities) => {
  if (!editorUIContext.entityLists) {
    return;
  }
  for (let i = 0; i < editorUIContext.entityLists.length; i++) {
    const entityList = editorUIContext.entityLists[i];
    while (entityList.firstChild) {
      entityList.removeChild(entityList.firstChild);
    }
    for (let j = 0; j < entities.length; j++) {
      const entity = entities[j];
      const entityDiv = document.createElement("div");
      const entityName = document.createElement("span");
      entityName.innerText = entity.name === "" ? "Entity" : entity.name;
      entityDiv.appendChild(entityName);
      const entityId = document.createElement("span");
      entityId.innerText = entity.id.toString();
      entityDiv.appendChild(entityId);
      entityDiv.style.cursor = "pointer";
      entityDiv.className = "entityListItem";
      entityList.appendChild(entityDiv);
      entityDiv.onclick = () => {
        editorEventContext.onEntitySelected.forEach((callback) => {
          callback(entity);
        });
      };
    }
  }
};
var addNewEntity = (entityName) => {
  mainWorld.createEntity(entityName);
};

// src/Editor/System/EditorInspectorSystem.ts
var import_ecsy_wd20 = require("ecsy-wd");
var import_js_file_download = __toESM(require("js-file-download"));

// src/Core/Locomotion/DataComponent/TransformData2D.ts
var import_ecsy_wd6 = require("ecsy-wd");
var import_ecsy_wd7 = require("ecsy-wd");

// src/Mathematics/Vector2.ts
var import_ecsy_wd5 = require("ecsy-wd");
var import_gl_matrix = require("gl-matrix");
var Vector2 = class {
  constructor(x, y) {
    this.value = import_gl_matrix.vec2.fromValues(x, y);
  }
  set(x, y) {
    import_gl_matrix.vec2.set(this.value, x, y);
  }
  copy(v) {
    this.value = import_gl_matrix.vec2.copy(this.value, v.value);
    return this;
  }
  clone() {
    return new Vector2(this.value[0], this.value[1]);
  }
};
var Vector2Type = (0, import_ecsy_wd5.createType)({
  name: "Vector2",
  default: new Vector2(0, 0),
  copy: import_ecsy_wd5.copyCopyable,
  clone: import_ecsy_wd5.cloneClonable
});
var Vector2CustomEditor = (value, onChange) => {
  const vector2Div = document.createElement("div");
  vector2Div.style.display = "flex";
  vector2Div.style.flexDirection = "row";
  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  vector2Div.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  vector2Div.appendChild(xInput);
  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  vector2Div.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  vector2Div.appendChild(yInput);
  const update = () => {
    onChange(new Vector2(parseFloat(xInput.value), parseFloat(yInput.value)));
  };
  const setVector2 = (v) => {
    if (document.activeElement === xInput || document.activeElement === yInput) {
      return;
    }
    xInput.value = v.value[0].toString();
    yInput.value = v.value[1].toString();
  };
  xInput.onchange = update;
  yInput.onchange = update;
  return [vector2Div, setVector2];
};

// src/Core/Locomotion/DataComponent/TransformData2D.ts
var TransformData2D = class extends import_ecsy_wd6.Component {
  constructor() {
    super(...arguments);
    this.useDefaultInspector = false;
    this.onInspector = (componentDiv) => {
      const transformDiv = document.createElement("div");
      const positionDiv = document.createElement("div");
      positionDiv.appendChild(document.createTextNode("Position"));
      const [positionVector2Div, setPosition] = Vector2CustomEditor(
        this.position,
        (newValue) => {
          this.position = newValue;
          this.eventEmitter.emit(import_ecsy_wd6.COMPONENT_CHANGE_EVENT, this);
        }
      );
      positionDiv.appendChild(positionVector2Div);
      const rotationDiv = document.createElement("div");
      rotationDiv.appendChild(document.createTextNode("Rotation"));
      const rotationInput = document.createElement("input");
      rotationInput.type = "number";
      rotationInput.style.minWidth = "0px";
      rotationInput.style.width = "100%";
      rotationInput.value = this.rotation.toString();
      rotationInput.onchange = (event) => {
        this.rotation = parseFloat(event.target.value);
        this.eventEmitter.emit(import_ecsy_wd6.COMPONENT_CHANGE_EVENT, this);
      };
      rotationDiv.appendChild(rotationInput);
      const scaleDiv = document.createElement("div");
      scaleDiv.appendChild(document.createTextNode("Scale"));
      const [scaleVector2Div, setScale] = Vector2CustomEditor(
        this.scale,
        (newValue) => {
          this.scale = newValue;
          this.eventEmitter.emit(import_ecsy_wd6.COMPONENT_CHANGE_EVENT, this);
        }
      );
      scaleDiv.appendChild(scaleVector2Div);
      componentDiv.appendChild(positionDiv);
      componentDiv.appendChild(rotationDiv);
      componentDiv.appendChild(scaleDiv);
      this.eventEmitter.on(import_ecsy_wd6.COMPONENT_CHANGE_EVENT, (component) => {
        setPosition(component.position);
        if (document.activeElement !== rotationInput) {
          rotationInput.value = component.rotation.toString();
        }
        setScale(component.scale);
      });
      componentDiv.appendChild(transformDiv);
    };
  }
};
TransformData2D.schema = {
  position: {
    type: Vector2Type,
    default: new Vector2(0, 0)
  },
  rotation: {
    type: import_ecsy_wd7.Types.Number,
    default: 0
  },
  scale: {
    type: Vector2Type,
    default: new Vector2(1, 1)
  }
};
TransformData2D = __decorateClass([
  IComponent.register
], TransformData2D);

// src/Core/Locomotion/DataComponent/TransformData3D.ts
var import_ecsy_wd10 = require("ecsy-wd");

// src/Mathematics/Quaternion.ts
var import_ecsy_wd8 = require("ecsy-wd");
var import_gl_matrix2 = require("gl-matrix");
var Quaternion = class {
  constructor(x, y, z, w) {
    this.value = import_gl_matrix2.quat.fromValues(x, y, z, w);
  }
  set(x, y, z, w) {
    import_gl_matrix2.quat.set(this.value, x, y, z, w);
  }
  copy(q) {
    this.value = import_gl_matrix2.quat.copy(this.value, q.value);
    return this;
  }
  clone() {
    return new Quaternion(
      this.value[0],
      this.value[1],
      this.value[2],
      this.value[3]
    );
  }
};
var QuaternionType = (0, import_ecsy_wd8.createType)({
  name: "Quaternion",
  default: new Quaternion(0, 0, 0, 1),
  copy: import_ecsy_wd8.copyCopyable,
  clone: import_ecsy_wd8.cloneClonable
});
var QuaternionCustomEditor = (value, onChange) => {
  const quaternionDiv = document.createElement("div");
  quaternionDiv.style.display = "flex";
  quaternionDiv.style.flexDirection = "row";
  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  quaternionDiv.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  quaternionDiv.appendChild(xInput);
  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  quaternionDiv.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  quaternionDiv.appendChild(yInput);
  const zLabel = document.createElement("label");
  zLabel.innerText = "Z";
  quaternionDiv.appendChild(zLabel);
  const zInput = document.createElement("input");
  zInput.type = "number";
  zInput.style.minWidth = "0px";
  zInput.style.flexGrow = "1";
  zInput.value = value.value[2].toString();
  quaternionDiv.appendChild(zInput);
  const wLabel = document.createElement("label");
  wLabel.innerText = "W";
  quaternionDiv.appendChild(wLabel);
  const wInput = document.createElement("input");
  wInput.type = "number";
  wInput.style.minWidth = "0px";
  wInput.style.flexGrow = "1";
  wInput.value = value.value[3].toString();
  quaternionDiv.appendChild(wInput);
  const update = () => {
    onChange(
      new Quaternion(
        parseFloat(xInput.value),
        parseFloat(yInput.value),
        parseFloat(zInput.value),
        parseFloat(wInput.value)
      )
    );
  };
  const setQuaternion = (q) => {
    if (document.activeElement === xInput || document.activeElement === yInput || document.activeElement === zInput || document.activeElement === wInput) {
      return;
    }
    xInput.value = q.value[0].toString();
    yInput.value = q.value[1].toString();
    zInput.value = q.value[2].toString();
    wInput.value = q.value[3].toString();
  };
  xInput.addEventListener("change", update);
  yInput.addEventListener("change", update);
  zInput.addEventListener("change", update);
  wInput.addEventListener("change", update);
  return [quaternionDiv, setQuaternion];
};

// src/Mathematics/Vector3.ts
var import_ecsy_wd9 = require("ecsy-wd");
var import_gl_matrix3 = require("gl-matrix");
var Vector3 = class {
  constructor(x, y, z) {
    this.value = import_gl_matrix3.vec3.fromValues(x, y, z);
  }
  set(x, y, z) {
    import_gl_matrix3.vec3.set(this.value, x, y, z);
  }
  copy(v) {
    this.value = import_gl_matrix3.vec3.copy(this.value, v.value);
    return this;
  }
  clone() {
    return new Vector3(this.value[0], this.value[1], this.value[2]);
  }
};
var Vector3Type = (0, import_ecsy_wd9.createType)({
  name: "Vector3",
  default: new Vector3(0, 0, 0),
  copy: import_ecsy_wd9.copyCopyable,
  clone: import_ecsy_wd9.cloneClonable
});
var Vector3CustomEditor = (value, onChange) => {
  const vector3Div = document.createElement("div");
  vector3Div.style.display = "flex";
  vector3Div.style.flexDirection = "row";
  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  vector3Div.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  vector3Div.appendChild(xInput);
  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  vector3Div.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  vector3Div.appendChild(yInput);
  const zLabel = document.createElement("label");
  zLabel.innerText = "Z";
  vector3Div.appendChild(zLabel);
  const zInput = document.createElement("input");
  zInput.type = "number";
  zInput.style.minWidth = "0px";
  zInput.style.flexGrow = "1";
  zInput.value = value.value[2].toString();
  vector3Div.appendChild(zInput);
  const update = () => {
    onChange(
      new Vector3(
        parseFloat(xInput.value),
        parseFloat(yInput.value),
        parseFloat(zInput.value)
      )
    );
  };
  const setVector3 = (v) => {
    if (document.activeElement === xInput || document.activeElement === yInput || document.activeElement === zInput) {
      return;
    }
    xInput.value = v.value[0].toString();
    yInput.value = v.value[1].toString();
    zInput.value = v.value[2].toString();
  };
  xInput.addEventListener("change", update);
  yInput.addEventListener("change", update);
  zInput.addEventListener("change", update);
  return [vector3Div, setVector3];
};

// src/Core/Locomotion/DataComponent/TransformData3D.ts
var TransformData3D = class extends import_ecsy_wd10.Component {
  constructor() {
    super(...arguments);
    this.useDefaultInspector = false;
    this.onInspector = (componentDiv) => {
      const transformDiv = document.createElement("div");
      const positionDiv = document.createElement("div");
      positionDiv.appendChild(document.createTextNode("Position"));
      const [positionVector3Div, setPosition] = Vector3CustomEditor(
        this.position,
        (newValue) => {
          this.position = newValue;
          this.eventEmitter.emit(import_ecsy_wd10.COMPONENT_CHANGE_EVENT, this);
        }
      );
      positionDiv.appendChild(positionVector3Div);
      const rotationDiv = document.createElement("div");
      rotationDiv.appendChild(document.createTextNode("Rotation"));
      const [rotationQuaternionDiv, setRotation] = QuaternionCustomEditor(
        this.rotation,
        (newValue) => {
          this.rotation = newValue;
          this.eventEmitter.emit(import_ecsy_wd10.COMPONENT_CHANGE_EVENT, this);
        }
      );
      rotationDiv.appendChild(rotationQuaternionDiv);
      const scaleDiv = document.createElement("div");
      scaleDiv.appendChild(document.createTextNode("Scale"));
      const [scaleVector3Div, setScale] = Vector3CustomEditor(
        this.scale,
        (newValue) => {
          this.scale = newValue;
          this.eventEmitter.emit(import_ecsy_wd10.COMPONENT_CHANGE_EVENT, this);
        }
      );
      scaleDiv.appendChild(scaleVector3Div);
      transformDiv.appendChild(positionDiv);
      transformDiv.appendChild(rotationDiv);
      transformDiv.appendChild(scaleDiv);
      this.eventEmitter.on(import_ecsy_wd10.COMPONENT_CHANGE_EVENT, () => {
        setPosition(this.position);
        setRotation(this.rotation);
        setScale(this.scale);
      });
      componentDiv.appendChild(transformDiv);
    };
  }
};
TransformData3D.schema = {
  position: {
    type: Vector3Type,
    default: new Vector3(0, 0, 0)
  },
  rotation: {
    type: QuaternionType,
    default: new Quaternion(0, 0, 0, 1)
  },
  scale: {
    type: Vector3Type,
    default: new Vector3(1, 1, 1)
  }
};
TransformData3D = __decorateClass([
  IComponent.register
], TransformData3D);

// src/Editor/System/EditorViewPort2DSystems.ts
var import_gl_matrix5 = require("gl-matrix");

// src/Core/Render/System/Canvas2DRenderer.ts
var import_ecsy_wd14 = require("ecsy-wd");
var import_gl_matrix4 = require("gl-matrix");

// src/Core/Render/DataComponent/CameraData2D.ts
var import_ecsy_wd11 = require("ecsy-wd");
var import_ecsy_wd12 = require("ecsy-wd");
var CameraData2D = class extends import_ecsy_wd11.Component {
};
CameraData2D.schema = {
  backgroundType: {
    type: import_ecsy_wd12.Types.Number,
    default: 0 /* Color */
  },
  backgroundColor: {
    type: import_ecsy_wd12.Types.String,
    default: "#000000"
  },
  backgroundTexture: {
    type: import_ecsy_wd12.Types.String,
    default: ""
  }
};
CameraData2D = __decorateClass([
  IComponent.register
], CameraData2D);

// src/Core/Render/TagComponent/MainCameraTag.ts
var import_ecsy_wd13 = require("ecsy-wd");
var MainCameraTag = class extends import_ecsy_wd13.TagComponent {
};
MainCameraTag = __decorateClass([
  IComponent.register
], MainCameraTag);

// src/Core/Render/System/Canvas2DRenderer.ts
var Canvas2DRenderer = class extends import_ecsy_wd14.System {
  init(attributes) {
    this.mainCanvas = attributes == null ? void 0 : attributes.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    );
  }
  execute(delta, time) {
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    } else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }
  }
  worldToCamera(camTransform, canvasSize) {
    const worldToCamera = import_gl_matrix4.mat3.create();
    import_gl_matrix4.mat3.fromTranslation(
      worldToCamera,
      import_gl_matrix4.vec2.fromValues(canvasSize[0] / 2, canvasSize[1] / 2)
    );
    import_gl_matrix4.mat3.scale(worldToCamera, worldToCamera, camTransform.scale.value);
    import_gl_matrix4.mat3.translate(
      worldToCamera,
      worldToCamera,
      import_gl_matrix4.vec2.negate(import_gl_matrix4.vec2.create(), camTransform.position.value)
    );
    import_gl_matrix4.mat3.rotate(worldToCamera, worldToCamera, camTransform.rotation);
    return worldToCamera;
  }
  objectToWorld(objTransform) {
    const objectToWorld = import_gl_matrix4.mat3.create();
    import_gl_matrix4.mat3.fromTranslation(objectToWorld, objTransform.position.value);
    import_gl_matrix4.mat3.rotate(objectToWorld, objectToWorld, objTransform.rotation);
    import_gl_matrix4.mat3.scale(objectToWorld, objectToWorld, objTransform.scale.value);
    return objectToWorld;
  }
};
Canvas2DRenderer.queries = {
  mainCamera: {
    components: [MainCameraTag, CameraData2D, TransformData2D]
  }
};

// src/Editor/System/EditorViewPort2DSystems.ts
var highlightThreshold = 25;
var axisLength = 50;
var _EditorViewPort2DSystem = class extends Canvas2DRenderer {
  constructor() {
    super(...arguments);
    this.highlightEntity = null;
  }
  init(attributes) {
    super.init(attributes);
    this.mainCanvas.addEventListener("mousemove", (event) => {
      const mousePos = this.getMousePos(event);
      if (event.buttons === 1) {
        const mouseWorldPos = this.screenToWorld(mousePos);
        if (_EditorViewPort2DSystem.inspectEntity) {
          const transform = _EditorViewPort2DSystem.inspectEntity.getMutableComponent(
            TransformData2D
          );
          transform.position = new Vector2(mouseWorldPos[0], mouseWorldPos[1]);
          _EditorViewPort2DSystem.inspectEntity.getMutableComponent(
            TransformData2D
          );
        }
      } else {
        let closestEntity = null;
        let closestDistance = Number.MAX_VALUE;
        this.queries.highlightEntity.results.forEach((entity) => {
          const transform = entity.getComponent(
            TransformData2D
          );
          const distance = import_gl_matrix5.vec2.distance(
            mousePos,
            this.worldToScreen(transform.position.value)
          );
          if (distance < highlightThreshold && distance < closestDistance && !entity.hasComponent(EditorSceneCamTag)) {
            closestEntity = entity;
            closestDistance = distance;
          }
        });
        this.highlightEntity = closestEntity;
      }
    });
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        if (this.highlightEntity) {
          updateEntityInspector(this.highlightEntity);
        } else {
          updateEntityInspector(null);
        }
      }
    });
  }
  execute(delta, time) {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    );
    const canvasSize = import_gl_matrix5.vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    const worldToCamera = import_gl_matrix5.mat3.create();
    import_gl_matrix5.mat3.multiply(
      worldToCamera,
      worldToCamera,
      this.worldToCamera(cameraTransform, canvasSize)
    );
    if (_EditorViewPort2DSystem.inspectTransform) {
      const inspectObjToCamera = import_gl_matrix5.mat3.create();
      import_gl_matrix5.mat3.multiply(
        inspectObjToCamera,
        worldToCamera,
        this.objectToWorld(_EditorViewPort2DSystem.inspectTransform)
      );
      this.drawAxis(inspectObjToCamera);
    }
    if (this.highlightEntity) {
      const transform = this.highlightEntity.getComponent(
        TransformData2D
      );
      const highlightObjToCamera = import_gl_matrix5.mat3.create();
      import_gl_matrix5.mat3.multiply(
        highlightObjToCamera,
        worldToCamera,
        this.objectToWorld(transform)
      );
      this.drawHighlight(highlightObjToCamera);
    }
  }
  getMousePos(event) {
    const rect = this.mainCanvas.getBoundingClientRect();
    return import_gl_matrix5.vec2.fromValues(event.clientX - rect.left, event.clientY - rect.top);
  }
  screenToWorld(screenPos) {
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    } else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    );
    const canvasSize = import_gl_matrix5.vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    const worldPos = import_gl_matrix5.vec2.create();
    import_gl_matrix5.vec2.transformMat3(
      worldPos,
      screenPos,
      import_gl_matrix5.mat3.invert(
        import_gl_matrix5.mat3.create(),
        this.worldToCamera(cameraTransform, canvasSize)
      )
    );
    return worldPos;
  }
  worldToScreen(worldPos) {
    if (this.queries.mainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    } else if (this.queries.mainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    );
    const canvasSize = import_gl_matrix5.vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    const screenPos = import_gl_matrix5.vec2.create();
    import_gl_matrix5.vec2.transformMat3(
      screenPos,
      worldPos,
      this.worldToCamera(cameraTransform, canvasSize)
    );
    return screenPos;
  }
  drawAxis(inspectObjToCamera) {
    const startPos = import_gl_matrix5.vec2.fromValues(0, 0);
    import_gl_matrix5.vec2.transformMat3(startPos, startPos, inspectObjToCamera);
    const xAxisPos = import_gl_matrix5.vec2.fromValues(1, 0);
    import_gl_matrix5.vec2.transformMat3(xAxisPos, xAxisPos, inspectObjToCamera);
    const yAxisPos = import_gl_matrix5.vec2.fromValues(0, 1);
    import_gl_matrix5.vec2.transformMat3(yAxisPos, yAxisPos, inspectObjToCamera);
    import_gl_matrix5.vec2.add(
      xAxisPos,
      startPos,
      import_gl_matrix5.vec2.scale(
        import_gl_matrix5.vec2.create(),
        import_gl_matrix5.vec2.normalize(
          import_gl_matrix5.vec2.create(),
          import_gl_matrix5.vec2.sub(import_gl_matrix5.vec2.create(), xAxisPos, startPos)
        ),
        axisLength
      )
    );
    import_gl_matrix5.vec2.add(
      yAxisPos,
      startPos,
      import_gl_matrix5.vec2.scale(
        import_gl_matrix5.vec2.create(),
        import_gl_matrix5.vec2.normalize(
          import_gl_matrix5.vec2.create(),
          import_gl_matrix5.vec2.sub(import_gl_matrix5.vec2.create(), yAxisPos, startPos)
        ),
        axisLength
      )
    );
    this.canvasContext.strokeStyle = "red";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(xAxisPos[0], xAxisPos[1]);
    this.canvasContext.stroke();
    this.canvasContext.strokeStyle = "blue";
    this.canvasContext.beginPath();
    this.canvasContext.lineWidth = 2;
    this.canvasContext.moveTo(startPos[0], startPos[1]);
    this.canvasContext.lineTo(yAxisPos[0], yAxisPos[1]);
    this.canvasContext.stroke();
  }
  drawHighlight(highlightObjToCamera) {
    const startPos = import_gl_matrix5.vec2.fromValues(0, 0);
    import_gl_matrix5.vec2.transformMat3(startPos, startPos, highlightObjToCamera);
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
};
var EditorViewPort2DSystem = _EditorViewPort2DSystem;
EditorViewPort2DSystem.inspectEntity = null;
EditorViewPort2DSystem.inspectTransform = null;
EditorViewPort2DSystem.queries = __spreadProps(__spreadValues({}, _EditorViewPort2DSystem.queries), {
  highlightEntity: {
    components: [TransformData2D]
  }
});

// src/Editor/System/EditorViewPort3DSystem.ts
var import_gl_matrix7 = require("gl-matrix");

// src/Core/Render/System/Canvas3DRenderer.ts
var import_ecsy_wd19 = require("ecsy-wd");
var import_gl_matrix6 = require("gl-matrix");

// src/Core/Render/DataComponent/OrthographicCameraData3D.ts
var import_ecsy_wd15 = require("ecsy-wd");
var import_ecsy_wd16 = require("ecsy-wd");
var OrthographicCameraData3D = class extends import_ecsy_wd15.Component {
};
OrthographicCameraData3D.schema = {
  left: {
    type: import_ecsy_wd16.Types.Number,
    default: -1
  },
  right: {
    type: import_ecsy_wd16.Types.Number,
    default: 1
  },
  top: {
    type: import_ecsy_wd16.Types.Number,
    default: 1
  },
  bottom: {
    type: import_ecsy_wd16.Types.Number,
    default: -1
  },
  near: {
    type: import_ecsy_wd16.Types.Number,
    default: 0.1
  },
  far: {
    type: import_ecsy_wd16.Types.Number,
    default: 1e3
  }
};
OrthographicCameraData3D = __decorateClass([
  IComponent.register
], OrthographicCameraData3D);

// src/Core/Render/DataComponent/PerspectiveCameraData3D.ts
var import_ecsy_wd17 = require("ecsy-wd");
var import_ecsy_wd18 = require("ecsy-wd");
var PerspectiveCameraData3D = class extends import_ecsy_wd17.Component {
  constructor() {
    super(...arguments);
    this.useDefaultInspector = false;
    this.onInspector = (componentDiv) => {
      const fovDiv = document.createElement("div");
      fovDiv.style.display = "flex";
      fovDiv.style.flexDirection = "row";
      fovDiv.appendChild(document.createTextNode("fov: "));
      const fovSlider = document.createElement("input");
      fovSlider.type = "range";
      fovSlider.min = "0";
      fovSlider.max = "3.14";
      fovSlider.step = "0.01";
      fovSlider.value = this.fov.toString();
      fovSlider.style.flex = "1";
      fovSlider.addEventListener("change", (event) => {
        this.fov = parseFloat(fovSlider.value);
        this.eventEmitter.emit(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, this);
      });
      this.eventEmitter.on(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, () => {
        if (document.activeElement !== fovSlider) {
          fovSlider.value = this.fov.toString();
        }
      });
      fovDiv.appendChild(fovSlider);
      const aspectDiv = document.createElement("div");
      aspectDiv.style.display = "flex";
      aspectDiv.style.flexDirection = "row";
      aspectDiv.appendChild(document.createTextNode("aspect: "));
      const aspectInput = document.createElement("input");
      aspectInput.type = "number";
      aspectInput.value = this.aspect.toString();
      aspectInput.style.minWidth = "0px";
      aspectInput.style.flex = "1";
      aspectInput.addEventListener("change", (event) => {
        this.aspect = parseFloat(aspectInput.value);
        this.eventEmitter.emit(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, this);
      });
      this.eventEmitter.on(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, () => {
        if (document.activeElement !== aspectInput) {
          aspectInput.value = this.aspect.toString();
        }
      });
      aspectDiv.appendChild(aspectInput);
      const nearDiv = document.createElement("div");
      nearDiv.style.display = "flex";
      nearDiv.style.flexDirection = "row";
      nearDiv.appendChild(document.createTextNode("near: "));
      const nearInput = document.createElement("input");
      nearInput.type = "number";
      nearInput.value = this.near.toString();
      nearInput.style.minWidth = "0px";
      nearInput.style.flex = "1";
      nearInput.addEventListener("change", (event) => {
        this.near = parseFloat(nearInput.value);
        this.eventEmitter.emit(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, this);
      });
      this.eventEmitter.on(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, () => {
        if (document.activeElement !== nearInput) {
          nearInput.value = this.near.toString();
        }
      });
      nearDiv.appendChild(nearInput);
      const farDiv = document.createElement("div");
      farDiv.style.display = "flex";
      farDiv.style.flexDirection = "row";
      farDiv.appendChild(document.createTextNode("far: "));
      const farInput = document.createElement("input");
      farInput.type = "number";
      farInput.value = this.far.toString();
      farInput.style.minWidth = "0px";
      farInput.style.flex = "1";
      farInput.addEventListener("change", (event) => {
        this.far = parseFloat(farInput.value);
        this.eventEmitter.emit(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, this);
      });
      this.eventEmitter.on(import_ecsy_wd17.COMPONENT_CHANGE_EVENT, () => {
        if (document.activeElement !== farInput) {
          farInput.value = this.far.toString();
        }
      });
      farDiv.appendChild(farInput);
      componentDiv.appendChild(fovDiv);
      componentDiv.appendChild(aspectDiv);
      componentDiv.appendChild(nearDiv);
      componentDiv.appendChild(farDiv);
    };
  }
};
PerspectiveCameraData3D.schema = {
  fov: {
    type: import_ecsy_wd18.Types.Number,
    default: Math.PI / 4
  },
  aspect: {
    type: import_ecsy_wd18.Types.Number,
    default: 1
  },
  near: {
    type: import_ecsy_wd18.Types.Number,
    default: 0.1
  },
  far: {
    type: import_ecsy_wd18.Types.Number,
    default: 1e3
  }
};
PerspectiveCameraData3D = __decorateClass([
  IComponent.register
], PerspectiveCameraData3D);

// src/Core/Render/System/Canvas3DRenderer.ts
var Canvas3DRenderer = class extends import_ecsy_wd19.System {
  constructor() {
    super(...arguments);
    this.worldToCamera = import_gl_matrix6.mat4.create();
    this.cameraToScreen = import_gl_matrix6.mat4.create();
  }
  init(attributes) {
    this.mainCanvas = attributes == null ? void 0 : attributes.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "2d"
    );
  }
  execute(delta, time) {
    if (this.queries.perspectiveMainCamera.results.length + this.queries.orthographicMainCamera.results.length === 0) {
      throw new Error("Main camera not found.");
    } else if (this.queries.perspectiveMainCamera.results.length + this.queries.orthographicMainCamera.results.length > 1) {
      throw new Error("More than one main camera found.");
    }
  }
  orthographicWorldToCamera(camTransform, camData) {
    const worldToCamera = import_gl_matrix6.mat4.create();
    import_gl_matrix6.mat4.invert(worldToCamera, this.objectToWorld(camTransform));
    const orthographic = import_gl_matrix6.mat4.create();
    import_gl_matrix6.mat4.ortho(
      orthographic,
      camData.left,
      camData.right,
      camData.bottom,
      camData.top,
      camData.near,
      camData.far
    );
    import_gl_matrix6.mat4.multiply(worldToCamera, orthographic, worldToCamera);
    return worldToCamera;
  }
  perspectiveWorldToCamera(camTransform, camData) {
    const worldToCamera = import_gl_matrix6.mat4.create();
    import_gl_matrix6.mat4.invert(worldToCamera, this.objectToWorld(camTransform));
    const perspective = import_gl_matrix6.mat4.create();
    import_gl_matrix6.mat4.perspective(
      perspective,
      camData.fov,
      camData.aspect,
      camData.near,
      camData.far
    );
    import_gl_matrix6.mat4.multiply(worldToCamera, perspective, worldToCamera);
    return worldToCamera;
  }
  objectToWorld(transform, dropScale = false) {
    const objectToWorld = import_gl_matrix6.mat4.create();
    if (dropScale) {
      import_gl_matrix6.mat4.fromRotationTranslation(
        objectToWorld,
        transform.rotation.value,
        transform.position.value
      );
    } else {
      import_gl_matrix6.mat4.fromRotationTranslationScale(
        objectToWorld,
        transform.rotation.value,
        transform.position.value,
        transform.scale.value
      );
    }
    return objectToWorld;
  }
  generateCameraToScreenMatrix() {
    this.cameraToScreen = import_gl_matrix6.mat4.create();
    import_gl_matrix6.mat4.fromTranslation(this.cameraToScreen, [
      this.mainCanvas.width / 2,
      this.mainCanvas.height / 2,
      0
    ]);
    import_gl_matrix6.mat4.scale(this.cameraToScreen, this.cameraToScreen, [
      this.mainCanvas.width,
      this.mainCanvas.height,
      1
    ]);
  }
  generateWorldToCameraMatrix() {
    const canvasSize = import_gl_matrix6.vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    if (this.queries.perspectiveMainCamera.results.length > 0) {
      const camera = this.queries.perspectiveMainCamera.results[0];
      const cameraTransform = camera.getComponent(
        TransformData3D
      );
      const cameraPerspective = camera.getMutableComponent(
        PerspectiveCameraData3D
      );
      cameraPerspective.aspect = canvasSize[0] / canvasSize[1];
      this.worldToCamera = this.perspectiveWorldToCamera(
        cameraTransform,
        cameraPerspective
      );
    } else {
    }
  }
  drawLine(startPoint, endPoint, color, lineWidth) {
    if (startPoint[2] > 1 && endPoint[2] > 1) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.lineWidth = lineWidth;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(startPoint[0], startPoint[1]);
      this.canvasContext.lineTo(endPoint[0], endPoint[1]);
      this.canvasContext.stroke();
    }
  }
};
Canvas3DRenderer.queries = {
  perspectiveMainCamera: {
    components: [MainCameraTag, PerspectiveCameraData3D, TransformData3D]
  },
  orthographicMainCamera: {
    components: [MainCameraTag, OrthographicCameraData3D, TransformData3D]
  }
};

// src/Editor/System/EditorViewPort3DSystem.ts
var moveControlThreshold = 30;
var _EditorViewPort3DSystem = class extends Canvas3DRenderer {
  constructor() {
    super(...arguments);
    this.mousePosition = import_gl_matrix7.vec2.create();
    this.mouseDelta = import_gl_matrix7.vec2.create();
    this.mouseInCanvas = true;
    this.highlightAxis = null;
    this.movingAxis = null;
  }
  init(attributes) {
    super.init(attributes);
    this.mainCanvas.addEventListener("mousemove", (event) => {
      this.mousePosition = this.getMousePos(event);
      import_gl_matrix7.vec2.add(
        this.mouseDelta,
        this.mouseDelta,
        import_gl_matrix7.vec2.fromValues(event.movementX, event.movementY)
      );
    });
    this.mainCanvas.addEventListener("mouseenter", () => {
      this.mouseInCanvas = true;
    });
    this.mainCanvas.addEventListener("mouseleave", () => {
      this.mouseInCanvas = false;
    });
    this.mainCanvas.addEventListener("mousedown", (event) => {
      if (event.button == 0) {
        if (this.highlightAxis) {
          this.movingAxis = this.highlightAxis;
        }
      }
    });
    this.mainCanvas.addEventListener("mouseup", (event) => {
      if (event.button == 0) {
        this.movingAxis = null;
      }
    });
  }
  execute(delta, time) {
    var _a;
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }
    this.generateWorldToCameraMatrix();
    this.generateCameraToScreenMatrix();
    if (editorControlContext.controlMode == 1 /* Move */ && _EditorViewPort3DSystem.inspectTransform && !((_a = _EditorViewPort3DSystem.inspectEntity) == null ? void 0 : _a.hasComponent(EditorSceneCamTag))) {
      const objectToWorld = this.objectToWorld(
        _EditorViewPort3DSystem.inspectTransform,
        true
      );
      const objectToScreen = import_gl_matrix7.mat4.create();
      import_gl_matrix7.mat4.multiply(objectToScreen, this.worldToCamera, objectToWorld);
      import_gl_matrix7.mat4.multiply(objectToScreen, this.cameraToScreen, objectToScreen);
      this.drawAxis(objectToScreen);
      const startPoint = import_gl_matrix7.vec3.create();
      import_gl_matrix7.vec3.transformMat4(startPoint, [0, 0, 0], objectToScreen);
      const endPointX = import_gl_matrix7.vec3.create();
      import_gl_matrix7.vec3.transformMat4(endPointX, [1, 0, 0], objectToScreen);
      const endPointY = import_gl_matrix7.vec3.create();
      import_gl_matrix7.vec3.transformMat4(endPointY, [0, 1, 0], objectToScreen);
      const endPointZ = import_gl_matrix7.vec3.create();
      import_gl_matrix7.vec3.transformMat4(endPointZ, [0, 0, 1], objectToScreen);
      if (this.mouseInCanvas) {
        const xDistance = import_gl_matrix7.vec2.distance(
          this.mousePosition,
          import_gl_matrix7.vec2.fromValues(endPointX[0], endPointX[1])
        );
        const yDistance = import_gl_matrix7.vec2.distance(
          this.mousePosition,
          import_gl_matrix7.vec2.fromValues(endPointY[0], endPointY[1])
        );
        const zDistance = import_gl_matrix7.vec2.distance(
          this.mousePosition,
          import_gl_matrix7.vec2.fromValues(endPointZ[0], endPointZ[1])
        );
        const minDistance = Math.min(xDistance, yDistance, zDistance);
        if (minDistance < moveControlThreshold) {
          if (minDistance == xDistance) {
            this.canvasContext.strokeStyle = "red";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointX[0],
              endPointX[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();
            this.highlightAxis = "x";
          } else if (minDistance == yDistance) {
            this.canvasContext.strokeStyle = "green";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointY[0],
              endPointY[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();
            this.highlightAxis = "y";
          } else if (minDistance == zDistance) {
            this.canvasContext.strokeStyle = "blue";
            this.canvasContext.beginPath();
            this.canvasContext.arc(
              endPointZ[0],
              endPointZ[1],
              moveControlThreshold,
              0,
              2 * Math.PI
            );
            this.canvasContext.stroke();
            this.highlightAxis = "z";
          }
        } else {
          this.highlightAxis = null;
        }
        if (this.movingAxis) {
          switch (this.movingAxis) {
            case "x":
              this.moveAxis(endPointX, startPoint, 0);
              break;
            case "y":
              this.moveAxis(endPointY, startPoint, 1);
              break;
            case "z":
              this.moveAxis(endPointZ, startPoint, 2);
              break;
            default:
              break;
          }
        }
      }
    }
    import_gl_matrix7.vec2.set(this.mouseDelta, 0, 0);
  }
  moveAxis(axisEndPoint, startPoint, axisIndex) {
    var _a;
    const axisDir = import_gl_matrix7.vec2.create();
    import_gl_matrix7.vec2.sub(
      axisDir,
      import_gl_matrix7.vec2.fromValues(axisEndPoint[0], axisEndPoint[1]),
      import_gl_matrix7.vec2.fromValues(startPoint[0], startPoint[1])
    );
    let axisMove = import_gl_matrix7.vec2.dot(
      axisDir,
      import_gl_matrix7.vec2.fromValues(this.mouseDelta[0], this.mouseDelta[1])
    );
    axisMove = axisMove / Math.pow(import_gl_matrix7.vec2.length(axisDir), 2);
    if (_EditorViewPort3DSystem.inspectTransform) {
      _EditorViewPort3DSystem.inspectTransform.position.value[axisIndex] += axisMove;
      (_a = _EditorViewPort3DSystem.inspectEntity) == null ? void 0 : _a.getMutableComponent(
        TransformData3D
      );
    }
  }
  drawAxis(objectToScreen) {
    const startPoint = import_gl_matrix7.vec3.create();
    import_gl_matrix7.vec3.transformMat4(startPoint, [0, 0, 0], objectToScreen);
    const endPointX = import_gl_matrix7.vec3.create();
    import_gl_matrix7.vec3.transformMat4(endPointX, [1, 0, 0], objectToScreen);
    const endPointY = import_gl_matrix7.vec3.create();
    import_gl_matrix7.vec3.transformMat4(endPointY, [0, 1, 0], objectToScreen);
    const endPointZ = import_gl_matrix7.vec3.create();
    import_gl_matrix7.vec3.transformMat4(endPointZ, [0, 0, 1], objectToScreen);
    this.drawLine(startPoint, endPointX, "red", 1);
    this.drawLine(startPoint, endPointY, "green", 1);
    this.drawLine(startPoint, endPointZ, "blue", 1);
  }
  getMousePos(event) {
    const rect = this.mainCanvas.getBoundingClientRect();
    return import_gl_matrix7.vec2.fromValues(event.clientX - rect.left, event.clientY - rect.top);
  }
};
var EditorViewPort3DSystem = _EditorViewPort3DSystem;
EditorViewPort3DSystem.inspectEntity = null;
EditorViewPort3DSystem.inspectTransform = null;

// src/Editor/System/EditorInspectorSystem.ts
var updateEntityInspector = (entity) => {
  if (entity == null ? void 0 : entity.hasComponent(TransformData2D)) {
    if (EditorViewPort2DSystem.inspectEntity) {
      EditorViewPort2DSystem.inspectEntity.removeComponent(EditorSelectedTag);
    }
    EditorViewPort2DSystem.inspectEntity = entity;
    if (EditorViewPort2DSystem.inspectEntity) {
      EditorViewPort2DSystem.inspectEntity.addComponent(EditorSelectedTag);
    }
    EditorViewPort2DSystem.inspectTransform = entity.getComponent(
      TransformData2D
    );
  } else if (entity == null ? void 0 : entity.hasComponent(TransformData3D)) {
    if (EditorViewPort3DSystem.inspectEntity) {
      EditorViewPort3DSystem.inspectEntity.removeComponent(EditorSelectedTag);
    }
    EditorViewPort3DSystem.inspectEntity = entity;
    if (EditorViewPort3DSystem.inspectEntity) {
      EditorViewPort3DSystem.inspectEntity.addComponent(EditorSelectedTag);
    }
    EditorViewPort3DSystem.inspectTransform = entity.getMutableComponent(
      TransformData3D
    );
  } else {
    EditorViewPort2DSystem.inspectTransform = null;
    EditorViewPort3DSystem.inspectTransform = null;
  }
  displayEntityInspector(entity);
};
var displayEntityInspector = (entity) => {
  if (!editorUIContext.entityInspector) {
    return;
  }
  if (entity === null) {
    for (let i = 0; i < editorUIContext.entityInspector.length; i++) {
      const entityInspector = editorUIContext.entityInspector[i];
      while (entityInspector.firstChild) {
        entityInspector.removeChild(entityInspector.firstChild);
      }
    }
    return;
  }
  const components = entity.getComponents();
  const componentIndices = Object.keys(components);
  for (let i = 0; i < editorUIContext.entityInspector.length; i++) {
    const entityInspector = editorUIContext.entityInspector[i];
    while (entityInspector.firstChild) {
      entityInspector.removeChild(entityInspector.firstChild);
    }
    const entityOperationDiv = document.createElement("div");
    entityOperationDiv.className = "componentListItem";
    addRemoveEntityButton(entity, entityOperationDiv);
    addSerializeEntityButton(entity, entityOperationDiv);
    entityInspector.appendChild(entityOperationDiv);
    for (let j = 0; j < componentIndices.length; j++) {
      const componentIndex = componentIndices[j];
      const component = components[componentIndex];
      const componentObject = EntitySerializer.serializeComponent(component);
      const componentDiv = document.createElement("div");
      componentDiv.className = "componentListItem";
      const componentTitle = document.createElement("h3");
      componentTitle.innerText = componentObject.type;
      componentDiv.appendChild(componentTitle);
      if (component.onInspector) {
        component.onInspector(componentDiv);
      }
      const spacer = document.createElement("div");
      spacer.style.height = "10px";
      componentDiv.appendChild(spacer);
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
        componentData.addEventListener("input", (event) => {
          const target = event.target;
          try {
            const newComponentData = JSON.parse(target.textContent || "{}");
            component.copy(newComponentData);
            entity.getMutableComponent(
              Object.getPrototypeOf(component).constructor
            );
          } catch (error) {
            console.error(error);
            return;
          }
        });
        component.eventEmitter.on(import_ecsy_wd20.COMPONENT_CHANGE_EVENT, (component2) => {
          const componentObject2 = EntitySerializer.serializeComponent(component2);
          if (document.activeElement !== componentData) {
            componentData.textContent = JSON.stringify(
              componentObject2.data,
              null,
              2
            );
          }
        });
      }
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.onclick = () => {
        entity.removeComponent(Object.getPrototypeOf(component).constructor);
        updateEntityInspector(entity);
      };
      componentDiv.appendChild(removeButton);
      entityInspector.appendChild(componentDiv);
    }
    addComponentButton(entity, entityInspector);
  }
};
function addSerializeEntityButton(entity, entityOperationDiv) {
  const serializeEntityButton = document.createElement("button");
  serializeEntityButton.innerText = "Serialize Entity";
  serializeEntityButton.style.width = "100%";
  serializeEntityButton.onclick = () => {
    const serializedEntity = EntitySerializer.serializeEntity(entity);
    (0, import_js_file_download.default)(JSON.stringify(serializedEntity, null, 2), "entity.json");
  };
  entityOperationDiv.appendChild(serializeEntityButton);
}
function addComponentButton(entity, entityInspector) {
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
  const addComponentButton2 = document.createElement("button");
  addComponentButton2.style.width = "100%";
  addComponentButton2.innerText = "Add Component";
  addComponentButton2.onclick = () => {
    const componentList2 = IComponent.getImplementations();
    let component = componentList2.find(
      (component2) => component2.name === componentNameInput.value
    );
    if (component) {
      entity.addComponent(component);
      updateEntityInspector(entity);
    } else {
      console.error("Component not found.");
    }
  };
  componentAddDiv.appendChild(addComponentButton2);
  entityInspector.appendChild(componentAddDiv);
}
function addRemoveEntityButton(entity, entityOperationDiv) {
  const removeEntityButton = document.createElement("button");
  removeEntityButton.innerText = "Remove Entity";
  removeEntityButton.style.width = "100%";
  removeEntityButton.onclick = () => {
    entity.remove();
    updateEntityInspector(null);
  };
  entityOperationDiv.appendChild(removeEntityButton);
}

// src/Editor/index.ts
var platState = false;
var worldData = null;
var editorInit = () => {
  console.log("Editor Started");
  coreRenderContext.mainCanvas = document.getElementById(
    "mainCanvas"
  );
  editorUIContext.entityLists = document.getElementsByClassName(
    "entityList"
  );
  editorUIContext.entityInspector = document.getElementsByClassName(
    "entityInspector"
  );
  editorUIContext.playButton = document.getElementById(
    "playButton"
  );
  editorUIContext.entityNameInput = document.getElementById(
    "entityName"
  );
  editorUIContext.createEntityButton = document.getElementById(
    "createEntityButton"
  );
  editorUIContext.deserializeEntityButton = document.getElementById(
    "fileInput"
  );
  editorUIContext.saveWorldButton = document.getElementById(
    "saveWorldButton"
  );
  editorUIContext.loadWorldButton = document.getElementById(
    "loadWorldButton"
  );
  editorUIContext.editorModeDropdown = document.getElementById(
    "editorMode"
  );
  coreRenderContext.mainCanvas.oncontextmenu = () => false;
  mainWorld.onEntityChanged.push(updateEntityList);
  editorEventContext.onEntitySelected.push(updateEntityInspector);
  coreSetup();
  systemContext.editorStart();
  setupPlayButton();
  setupCreateEntityButton();
  setupDeserializeEntityInput();
  setupSaveLoadWorldButton();
  setupEditorModeDropdown();
  mainInit();
  onResize();
};
var onResize = () => {
  if (coreRenderContext.mainCanvas) {
    coreRenderContext.mainCanvas.width = coreRenderContext.mainCanvas.clientWidth;
    coreRenderContext.mainCanvas.height = coreRenderContext.mainCanvas.clientHeight;
  }
};
var setupPlayButton = () => {
  var _a;
  (_a = editorUIContext.playButton) == null ? void 0 : _a.addEventListener("click", () => __async(void 0, null, function* () {
    if (!platState) {
      if (editorUIContext.playButton) {
        editorUIContext.playButton.innerHTML = "Stop";
      }
      yield editorPlay();
      platState = true;
    } else {
      if (editorUIContext.playButton) {
        editorUIContext.playButton.innerHTML = "Play";
      }
      editorStop();
      platState = false;
    }
  }));
};
var setupCreateEntityButton = () => {
  var _a;
  (_a = editorUIContext.createEntityButton) == null ? void 0 : _a.addEventListener("click", () => {
    if (editorUIContext.entityNameInput) {
      addNewEntity(editorUIContext.entityNameInput.value);
      editorUIContext.entityNameInput.value = "";
    } else {
      addNewEntity();
    }
  });
};
var setupDeserializeEntityInput = () => {
  var _a;
  (_a = editorUIContext.deserializeEntityButton) == null ? void 0 : _a.addEventListener("click", () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          var _a3;
          const data = (_a3 = e2.target) == null ? void 0 : _a3.result;
          if (data) {
            const entityData = JSON.parse(data);
            EntitySerializer.deserializeEntity(mainWorld, entityData);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });
};
var setupSaveLoadWorldButton = () => {
  var _a, _b;
  (_a = editorUIContext.saveWorldButton) == null ? void 0 : _a.addEventListener("click", () => {
    const worldObject = WorldSerializer.serializeWorld(mainWorld);
    (0, import_js_file_download2.default)(JSON.stringify(worldObject, null, 2), "world.json");
  });
  (_b = editorUIContext.loadWorldButton) == null ? void 0 : _b.addEventListener("click", () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e2) => {
          var _a3;
          const data = (_a3 = e2.target) == null ? void 0 : _a3.result;
          if (data) {
            worldData = JSON.parse(data);
            editorStop();
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });
};
function setupEditorModeDropdown() {
  var _a;
  (_a = editorUIContext.editorModeDropdown) == null ? void 0 : _a.addEventListener("change", (e) => {
    const value = e.target.value;
    switch (value) {
      case "view":
        editorControlContext.controlMode = 0 /* View */;
        break;
      case "move":
        editorControlContext.controlMode = 1 /* Move */;
        break;
      default:
        break;
    }
  });
}
var editorPlay = () => __async(void 0, null, function* () {
  worldData = WorldSerializer.serializeWorld(mainWorld);
  resetWorld();
  mainWorld.onEntityChanged.push(updateEntityList);
  coreSetup();
  yield systemContext.coreStart({
    worldObject: worldData
  });
});
var editorStop = () => {
  resetWorld();
  mainWorld.onEntityChanged.push(updateEntityList);
  coreSetup();
  systemContext.editorStart();
  if (worldData) {
    WorldSerializer.deserializeWorld(mainWorld, worldData);
  }
};
window.onload = editorInit;
window.onresize = onResize;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  editorInit
});
//# sourceMappingURL=index.js.map
