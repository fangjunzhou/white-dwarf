"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/Core/index.ts
var Core_exports = {};
__export(Core_exports, {
  mainWorld: () => mainWorld,
  physicsWorld: () => physicsWorld,
  timeContext: () => timeContext
});
module.exports = __toCommonJS(Core_exports);

// submodules/ecsy/src/Utils.js
function queryKey(Components) {
  var ids = [];
  for (var n = 0; n < Components.length; n++) {
    var T = Components[n];
    if (!componentRegistered(T)) {
      throw new Error(`Tried to create a query with an unregistered component`);
    }
    if (typeof T === "object") {
      var operator = T.operator === "not" ? "!" : T.operator;
      ids.push(operator + T.Component._typeId);
    } else {
      ids.push(T._typeId);
    }
  }
  return ids.sort().join("-");
}
var hasWindow = typeof window !== "undefined";
var now = hasWindow && typeof window.performance !== "undefined" ? performance.now.bind(performance) : Date.now.bind(Date);
function componentRegistered(T) {
  return typeof T === "object" && T.Component._typeId !== void 0 || T.isComponent && T._typeId !== void 0;
}

// submodules/ecsy/src/SystemManager.js
var SystemManager = class {
  constructor(world) {
    this._systems = [];
    this._executeSystems = [];
    this.world = world;
    this.lastExecutedSystem = null;
  }
  registerSystem(SystemClass, attributes) {
    if (!SystemClass.isSystem) {
      throw new Error(
        `System '${SystemClass.name}' does not extend 'System' class`
      );
    }
    if (this.getSystem(SystemClass) !== void 0) {
      console.warn(`System '${SystemClass.getName()}' already registered.`);
      return this;
    }
    var system = new SystemClass(this.world, attributes);
    if (system.init)
      system.init(attributes);
    system.order = this._systems.length;
    this._systems.push(system);
    if (system.execute) {
      this._executeSystems.push(system);
      this.sortSystems();
    }
    return this;
  }
  unregisterSystem(SystemClass) {
    let system = this.getSystem(SystemClass);
    if (system === void 0) {
      console.warn(
        `Can unregister system '${SystemClass.getName()}'. It doesn't exist.`
      );
      return this;
    }
    this._systems.splice(this._systems.indexOf(system), 1);
    if (system.execute) {
      this._executeSystems.splice(this._executeSystems.indexOf(system), 1);
    }
    return this;
  }
  sortSystems() {
    this._executeSystems.sort((a, b) => {
      return a.priority - b.priority || a.order - b.order;
    });
  }
  getSystem(SystemClass) {
    return this._systems.find((s) => s instanceof SystemClass);
  }
  getSystems() {
    return this._systems;
  }
  removeSystem(SystemClass) {
    var index = this._systems.indexOf(SystemClass);
    if (!~index)
      return;
    this._systems.splice(index, 1);
  }
  executeSystem(system, delta, time) {
    if (system.initialized) {
      if (system.canExecute()) {
        let startTime = now();
        system.execute(delta, time);
        system.executeTime = now() - startTime;
        this.lastExecutedSystem = system;
        system.clearEvents();
      }
    }
  }
  stop() {
    this._executeSystems.forEach((system) => system.stop());
  }
  execute(delta, time, forcePlay) {
    this._executeSystems.forEach(
      (system) => (forcePlay || system.enabled) && this.executeSystem(system, delta, time)
    );
  }
  stats() {
    var stats = {
      numSystems: this._systems.length,
      systems: {}
    };
    for (var i = 0; i < this._systems.length; i++) {
      var system = this._systems[i];
      var systemStats = stats.systems[system.getName()] = {
        queries: {},
        executeTime: system.executeTime
      };
      for (var name in system.ctx) {
        systemStats.queries[name] = system.ctx[name].stats();
      }
    }
    return stats;
  }
};

// submodules/ecsy/src/ObjectPool.js
var ObjectPool = class {
  constructor(T, initialSize) {
    this.freeList = [];
    this.count = 0;
    this.T = T;
    this.isObjectPool = true;
    if (typeof initialSize !== "undefined") {
      this.expand(initialSize);
    }
  }
  acquire() {
    if (this.freeList.length <= 0) {
      this.expand(Math.round(this.count * 0.2) + 1);
    }
    var item = this.freeList.pop();
    return item;
  }
  release(item) {
    item.reset();
    this.freeList.push(item);
  }
  expand(count) {
    for (var n = 0; n < count; n++) {
      var clone = new this.T();
      clone._pool = this;
      this.freeList.push(clone);
    }
    this.count += count;
  }
  totalSize() {
    return this.count;
  }
  totalFree() {
    return this.freeList.length;
  }
  totalUsed() {
    return this.count - this.freeList.length;
  }
};

// submodules/ecsy/src/EventDispatcher.js
var EventDispatcher = class {
  constructor() {
    this._listeners = {};
    this.stats = {
      fired: 0,
      handled: 0
    };
  }
  addEventListener(eventName, listener) {
    let listeners = this._listeners;
    if (listeners[eventName] === void 0) {
      listeners[eventName] = [];
    }
    if (listeners[eventName].indexOf(listener) === -1) {
      listeners[eventName].push(listener);
    }
  }
  hasEventListener(eventName, listener) {
    return this._listeners[eventName] !== void 0 && this._listeners[eventName].indexOf(listener) !== -1;
  }
  removeEventListener(eventName, listener) {
    var listenerArray = this._listeners[eventName];
    if (listenerArray !== void 0) {
      var index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  dispatchEvent(eventName, entity, component) {
    this.stats.fired++;
    var listenerArray = this._listeners[eventName];
    if (listenerArray !== void 0) {
      var array = listenerArray.slice(0);
      for (var i = 0; i < array.length; i++) {
        array[i].call(this, entity, component);
      }
    }
  }
  resetCounters() {
    this.stats.fired = this.stats.handled = 0;
  }
};

// submodules/ecsy/src/Query.js
var Query = class {
  constructor(Components, manager) {
    this.Components = [];
    this.NotComponents = [];
    Components.forEach((component) => {
      if (typeof component === "object") {
        this.NotComponents.push(component.Component);
      } else {
        this.Components.push(component);
      }
    });
    if (this.Components.length === 0) {
      throw new Error("Can't create a query without components");
    }
    this.entities = [];
    this.eventDispatcher = new EventDispatcher();
    this.reactive = false;
    this.key = queryKey(Components);
    for (var i = 0; i < manager._entities.length; i++) {
      var entity = manager._entities[i];
      if (this.match(entity)) {
        entity.queries.push(this);
        this.entities.push(entity);
      }
    }
  }
  addEntity(entity) {
    entity.queries.push(this);
    this.entities.push(entity);
    this.eventDispatcher.dispatchEvent(Query.prototype.ENTITY_ADDED, entity);
  }
  removeEntity(entity) {
    let index = this.entities.indexOf(entity);
    if (~index) {
      this.entities.splice(index, 1);
      index = entity.queries.indexOf(this);
      entity.queries.splice(index, 1);
      this.eventDispatcher.dispatchEvent(
        Query.prototype.ENTITY_REMOVED,
        entity
      );
    }
  }
  match(entity) {
    return entity.hasAllComponents(this.Components) && !entity.hasAnyComponents(this.NotComponents);
  }
  toJSON() {
    return {
      key: this.key,
      reactive: this.reactive,
      components: {
        included: this.Components.map((C) => C.name),
        not: this.NotComponents.map((C) => C.name)
      },
      numEntities: this.entities.length
    };
  }
  stats() {
    return {
      numComponents: this.Components.length,
      numEntities: this.entities.length
    };
  }
};
Query.prototype.ENTITY_ADDED = "Query#ENTITY_ADDED";
Query.prototype.ENTITY_REMOVED = "Query#ENTITY_REMOVED";
Query.prototype.COMPONENT_CHANGED = "Query#COMPONENT_CHANGED";

// submodules/ecsy/src/QueryManager.js
var QueryManager = class {
  constructor(world) {
    this._world = world;
    this._queries = {};
  }
  onEntityRemoved(entity) {
    for (var queryName in this._queries) {
      var query = this._queries[queryName];
      if (entity.queries.indexOf(query) !== -1) {
        query.removeEntity(entity);
      }
    }
  }
  onEntityComponentAdded(entity, Component2) {
    for (var queryName in this._queries) {
      var query = this._queries[queryName];
      if (!!~query.NotComponents.indexOf(Component2) && ~query.entities.indexOf(entity)) {
        query.removeEntity(entity);
        continue;
      }
      if (!~query.Components.indexOf(Component2) || !query.match(entity) || ~query.entities.indexOf(entity))
        continue;
      query.addEntity(entity);
    }
  }
  onEntityComponentRemoved(entity, Component2) {
    for (var queryName in this._queries) {
      var query = this._queries[queryName];
      if (!!~query.NotComponents.indexOf(Component2) && !~query.entities.indexOf(entity) && query.match(entity)) {
        query.addEntity(entity);
        continue;
      }
      if (!!~query.Components.indexOf(Component2) && !!~query.entities.indexOf(entity) && !query.match(entity)) {
        query.removeEntity(entity);
        continue;
      }
    }
  }
  getQuery(Components) {
    var key = queryKey(Components);
    var query = this._queries[key];
    if (!query) {
      this._queries[key] = query = new Query(Components, this._world);
    }
    return query;
  }
  stats() {
    var stats = {};
    for (var queryName in this._queries) {
      stats[queryName] = this._queries[queryName].stats();
    }
    return stats;
  }
};

// submodules/ecsy/src/Component.js
var Component = class {
  constructor(props) {
    if (props !== false) {
      const schema = this.constructor.schema;
      for (const key in schema) {
        if (props && props.hasOwnProperty(key)) {
          this[key] = props[key];
        } else {
          const schemaProp = schema[key];
          if (schemaProp.hasOwnProperty("default")) {
            this[key] = schemaProp.type.clone(schemaProp.default);
          } else {
            const type = schemaProp.type;
            this[key] = type.clone(type.default);
          }
        }
      }
      if (process.env.NODE_ENV !== "production" && props !== void 0) {
        this.checkUndefinedAttributes(props);
      }
    }
    this._pool = null;
  }
  copy(source) {
    const schema = this.constructor.schema;
    for (const key in schema) {
      const prop = schema[key];
      if (source.hasOwnProperty(key)) {
        this[key] = prop.type.copy(source[key], this[key]);
      }
    }
    if (process.env.NODE_ENV !== "production") {
      this.checkUndefinedAttributes(source);
    }
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  reset() {
    const schema = this.constructor.schema;
    for (const key in schema) {
      const schemaProp = schema[key];
      if (schemaProp.hasOwnProperty("default")) {
        this[key] = schemaProp.type.copy(schemaProp.default, this[key]);
      } else {
        const type = schemaProp.type;
        this[key] = type.copy(type.default, this[key]);
      }
    }
  }
  dispose() {
    if (this._pool) {
      this._pool.release(this);
    }
  }
  getName() {
    return this.constructor.getName();
  }
  checkUndefinedAttributes(src) {
    const schema = this.constructor.schema;
    Object.keys(src).forEach((srcKey) => {
      if (!schema.hasOwnProperty(srcKey)) {
        console.warn(
          `Trying to set attribute '${srcKey}' not defined in the '${this.constructor.name}' schema. Please fix the schema, the attribute value won't be set`
        );
      }
    });
  }
};
Component.schema = {};
Component.isComponent = true;
Component.getName = function() {
  return this.displayName || this.name;
};

// submodules/ecsy/src/SystemStateComponent.js
var SystemStateComponent = class extends Component {
};
SystemStateComponent.isSystemStateComponent = true;

// submodules/ecsy/src/EntityManager.js
var EntityPool = class extends ObjectPool {
  constructor(entityManager, entityClass, initialSize) {
    super(entityClass, void 0);
    this.entityManager = entityManager;
    if (typeof initialSize !== "undefined") {
      this.expand(initialSize);
    }
  }
  expand(count) {
    for (var n = 0; n < count; n++) {
      var clone = new this.T(this.entityManager);
      clone._pool = this;
      this.freeList.push(clone);
    }
    this.count += count;
  }
};
var EntityManager = class {
  constructor(world) {
    this.world = world;
    this.componentsManager = world.componentsManager;
    this._entities = [];
    this._nextEntityId = 0;
    this._entitiesByNames = {};
    this._queryManager = new QueryManager(this);
    this.eventDispatcher = new EventDispatcher();
    this._entityPool = new EntityPool(
      this,
      this.world.options.entityClass,
      this.world.options.entityPoolSize
    );
    this.entitiesWithComponentsToRemove = [];
    this.entitiesToRemove = [];
    this.deferredRemovalEnabled = true;
  }
  getEntityByName(name) {
    return this._entitiesByNames[name];
  }
  createEntity(name) {
    var entity = this._entityPool.acquire();
    entity.alive = true;
    entity.name = name || "";
    if (name) {
      if (this._entitiesByNames[name]) {
        console.warn(`Entity name '${name}' already exist`);
      } else {
        this._entitiesByNames[name] = entity;
      }
    }
    this._entities.push(entity);
    this.eventDispatcher.dispatchEvent(ENTITY_CREATED, entity);
    return entity;
  }
  entityAddComponent(entity, Component2, values) {
    if (typeof Component2._typeId === "undefined" && !this.world.componentsManager._ComponentsMap[Component2._typeId]) {
      throw new Error(
        `Attempted to add unregistered component "${Component2.getName()}"`
      );
    }
    if (~entity._ComponentTypes.indexOf(Component2)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "Component type already exists on entity.",
          entity,
          Component2.getName()
        );
      }
      return;
    }
    entity._ComponentTypes.push(Component2);
    if (Component2.__proto__ === SystemStateComponent) {
      entity.numStateComponents++;
    }
    var componentPool = this.world.componentsManager.getComponentsPool(
      Component2
    );
    var component = componentPool ? componentPool.acquire() : new Component2(values);
    if (componentPool && values) {
      component.copy(values);
    }
    entity._components[Component2._typeId] = component;
    this._queryManager.onEntityComponentAdded(entity, Component2);
    this.world.componentsManager.componentAddedToEntity(Component2);
    this.eventDispatcher.dispatchEvent(COMPONENT_ADDED, entity, Component2);
  }
  entityRemoveComponent(entity, Component2, immediately) {
    var index = entity._ComponentTypes.indexOf(Component2);
    if (!~index)
      return;
    this.eventDispatcher.dispatchEvent(COMPONENT_REMOVE, entity, Component2);
    if (immediately) {
      this._entityRemoveComponentSync(entity, Component2, index);
    } else {
      if (entity._ComponentTypesToRemove.length === 0)
        this.entitiesWithComponentsToRemove.push(entity);
      entity._ComponentTypes.splice(index, 1);
      entity._ComponentTypesToRemove.push(Component2);
      entity._componentsToRemove[Component2._typeId] = entity._components[Component2._typeId];
      delete entity._components[Component2._typeId];
    }
    this._queryManager.onEntityComponentRemoved(entity, Component2);
    if (Component2.__proto__ === SystemStateComponent) {
      entity.numStateComponents--;
      if (entity.numStateComponents === 0 && !entity.alive) {
        entity.remove();
      }
    }
  }
  _entityRemoveComponentSync(entity, Component2, index) {
    entity._ComponentTypes.splice(index, 1);
    var component = entity._components[Component2._typeId];
    delete entity._components[Component2._typeId];
    component.dispose();
    this.world.componentsManager.componentRemovedFromEntity(Component2);
  }
  entityRemoveAllComponents(entity, immediately) {
    let Components = entity._ComponentTypes;
    for (let j = Components.length - 1; j >= 0; j--) {
      if (Components[j].__proto__ !== SystemStateComponent)
        this.entityRemoveComponent(entity, Components[j], immediately);
    }
  }
  removeEntity(entity, immediately) {
    var index = this._entities.indexOf(entity);
    if (!~index)
      throw new Error("Tried to remove entity not in list");
    entity.alive = false;
    this.entityRemoveAllComponents(entity, immediately);
    if (entity.numStateComponents === 0) {
      this.eventDispatcher.dispatchEvent(ENTITY_REMOVED, entity);
      this._queryManager.onEntityRemoved(entity);
      if (immediately === true) {
        this._releaseEntity(entity, index);
      } else {
        this.entitiesToRemove.push(entity);
      }
    }
  }
  _releaseEntity(entity, index) {
    this._entities.splice(index, 1);
    if (this._entitiesByNames[entity.name]) {
      delete this._entitiesByNames[entity.name];
    }
    entity._pool.release(entity);
  }
  removeAllEntities() {
    for (var i = this._entities.length - 1; i >= 0; i--) {
      this.removeEntity(this._entities[i]);
    }
  }
  processDeferredRemoval() {
    if (!this.deferredRemovalEnabled) {
      return;
    }
    for (let i = 0; i < this.entitiesToRemove.length; i++) {
      let entity = this.entitiesToRemove[i];
      let index = this._entities.indexOf(entity);
      this._releaseEntity(entity, index);
    }
    this.entitiesToRemove.length = 0;
    for (let i = 0; i < this.entitiesWithComponentsToRemove.length; i++) {
      let entity = this.entitiesWithComponentsToRemove[i];
      while (entity._ComponentTypesToRemove.length > 0) {
        let Component2 = entity._ComponentTypesToRemove.pop();
        var component = entity._componentsToRemove[Component2._typeId];
        delete entity._componentsToRemove[Component2._typeId];
        component.dispose();
        this.world.componentsManager.componentRemovedFromEntity(Component2);
      }
    }
    this.entitiesWithComponentsToRemove.length = 0;
  }
  queryComponents(Components) {
    return this._queryManager.getQuery(Components);
  }
  count() {
    return this._entities.length;
  }
  stats() {
    var stats = {
      numEntities: this._entities.length,
      numQueries: Object.keys(this._queryManager._queries).length,
      queries: this._queryManager.stats(),
      numComponentPool: Object.keys(this.componentsManager._componentPool).length,
      componentPool: {},
      eventDispatcher: this.eventDispatcher.stats
    };
    for (var ecsyComponentId in this.componentsManager._componentPool) {
      var pool = this.componentsManager._componentPool[ecsyComponentId];
      stats.componentPool[pool.T.getName()] = {
        used: pool.totalUsed(),
        size: pool.count
      };
    }
    return stats;
  }
};
var ENTITY_CREATED = "EntityManager#ENTITY_CREATE";
var ENTITY_REMOVED = "EntityManager#ENTITY_REMOVED";
var COMPONENT_ADDED = "EntityManager#COMPONENT_ADDED";
var COMPONENT_REMOVE = "EntityManager#COMPONENT_REMOVE";

// submodules/ecsy/src/ComponentManager.js
var ComponentManager = class {
  constructor() {
    this.Components = [];
    this._ComponentsMap = {};
    this._componentPool = {};
    this.numComponents = {};
    this.nextComponentId = 0;
  }
  hasComponent(Component2) {
    return this.Components.indexOf(Component2) !== -1;
  }
  registerComponent(Component2, objectPool) {
    if (this.Components.indexOf(Component2) !== -1) {
      console.warn(
        `Component type: '${Component2.getName()}' already registered.`
      );
      return;
    }
    const schema = Component2.schema;
    if (!schema) {
      throw new Error(
        `Component "${Component2.getName()}" has no schema property.`
      );
    }
    for (const propName in schema) {
      const prop = schema[propName];
      if (!prop.type) {
        throw new Error(
          `Invalid schema for component "${Component2.getName()}". Missing type for "${propName}" property.`
        );
      }
    }
    Component2._typeId = this.nextComponentId++;
    this.Components.push(Component2);
    this._ComponentsMap[Component2._typeId] = Component2;
    this.numComponents[Component2._typeId] = 0;
    if (objectPool === void 0) {
      objectPool = new ObjectPool(Component2);
    } else if (objectPool === false) {
      objectPool = void 0;
    }
    this._componentPool[Component2._typeId] = objectPool;
  }
  componentAddedToEntity(Component2) {
    this.numComponents[Component2._typeId]++;
  }
  componentRemovedFromEntity(Component2) {
    this.numComponents[Component2._typeId]--;
  }
  getComponentsPool(Component2) {
    return this._componentPool[Component2._typeId];
  }
};

// submodules/ecsy/src/Version.js
var Version = "0.3.1";

// submodules/ecsy/src/WrapImmutableComponent.js
var proxyMap = /* @__PURE__ */ new WeakMap();
var proxyHandler = {
  set(target, prop) {
    throw new Error(
      `Tried to write to "${target.constructor.getName()}#${String(
        prop
      )}" on immutable component. Use .getMutableComponent() to modify a component.`
    );
  }
};
function wrapImmutableComponent(T, component) {
  if (component === void 0) {
    return void 0;
  }
  let wrappedComponent = proxyMap.get(component);
  if (!wrappedComponent) {
    wrappedComponent = new Proxy(component, proxyHandler);
    proxyMap.set(component, wrappedComponent);
  }
  return wrappedComponent;
}

// submodules/ecsy/src/Entity.js
var Entity = class {
  constructor(entityManager) {
    this._entityManager = entityManager || null;
    this.id = entityManager._nextEntityId++;
    this._ComponentTypes = [];
    this._components = {};
    this._componentsToRemove = {};
    this.queries = [];
    this._ComponentTypesToRemove = [];
    this.alive = false;
    this.numStateComponents = 0;
  }
  getComponent(Component2, includeRemoved) {
    var component = this._components[Component2._typeId];
    if (!component && includeRemoved === true) {
      component = this._componentsToRemove[Component2._typeId];
    }
    return process.env.NODE_ENV !== "production" ? wrapImmutableComponent(Component2, component) : component;
  }
  getRemovedComponent(Component2) {
    const component = this._componentsToRemove[Component2._typeId];
    return process.env.NODE_ENV !== "production" ? wrapImmutableComponent(Component2, component) : component;
  }
  getComponents() {
    return this._components;
  }
  getComponentsToRemove() {
    return this._componentsToRemove;
  }
  getComponentTypes() {
    return this._ComponentTypes;
  }
  getMutableComponent(Component2) {
    var component = this._components[Component2._typeId];
    if (!component) {
      return;
    }
    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];
      if (query.reactive && query.Components.indexOf(Component2) !== -1) {
        query.eventDispatcher.dispatchEvent(
          Query.prototype.COMPONENT_CHANGED,
          this,
          component
        );
      }
    }
    return component;
  }
  addComponent(Component2, values) {
    this._entityManager.entityAddComponent(this, Component2, values);
    return this;
  }
  removeComponent(Component2, forceImmediate) {
    this._entityManager.entityRemoveComponent(this, Component2, forceImmediate);
    return this;
  }
  hasComponent(Component2, includeRemoved) {
    return !!~this._ComponentTypes.indexOf(Component2) || includeRemoved === true && this.hasRemovedComponent(Component2);
  }
  hasRemovedComponent(Component2) {
    return !!~this._ComponentTypesToRemove.indexOf(Component2);
  }
  hasAllComponents(Components) {
    for (var i = 0; i < Components.length; i++) {
      if (!this.hasComponent(Components[i]))
        return false;
    }
    return true;
  }
  hasAnyComponents(Components) {
    for (var i = 0; i < Components.length; i++) {
      if (this.hasComponent(Components[i]))
        return true;
    }
    return false;
  }
  removeAllComponents(forceImmediate) {
    return this._entityManager.entityRemoveAllComponents(this, forceImmediate);
  }
  copy(src) {
    for (var ecsyComponentId in src._components) {
      var srcComponent = src._components[ecsyComponentId];
      this.addComponent(srcComponent.constructor);
      var component = this.getComponent(srcComponent.constructor);
      component.copy(srcComponent);
    }
    return this;
  }
  clone() {
    return new Entity(this._entityManager).copy(this);
  }
  reset() {
    this.id = this._entityManager._nextEntityId++;
    this._ComponentTypes.length = 0;
    this.queries.length = 0;
    for (var ecsyComponentId in this._components) {
      delete this._components[ecsyComponentId];
    }
  }
  remove(forceImmediate) {
    return this._entityManager.removeEntity(this, forceImmediate);
  }
};

// submodules/ecsy/src/World.js
var DEFAULT_OPTIONS = {
  entityPoolSize: 0,
  entityClass: Entity
};
var World = class {
  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.componentsManager = new ComponentManager(this);
    this.entityManager = new EntityManager(this);
    this.systemManager = new SystemManager(this);
    this.enabled = true;
    this.eventQueues = {};
    if (hasWindow && typeof CustomEvent !== "undefined") {
      var event = new CustomEvent("ecsy-world-created", {
        detail: { world: this, version: Version }
      });
      window.dispatchEvent(event);
    }
    this.lastTime = now() / 1e3;
  }
  registerComponent(Component2, objectPool) {
    this.componentsManager.registerComponent(Component2, objectPool);
    return this;
  }
  registerSystem(System, attributes) {
    this.systemManager.registerSystem(System, attributes);
    return this;
  }
  hasRegisteredComponent(Component2) {
    return this.componentsManager.hasComponent(Component2);
  }
  unregisterSystem(System) {
    this.systemManager.unregisterSystem(System);
    return this;
  }
  getSystem(SystemClass) {
    return this.systemManager.getSystem(SystemClass);
  }
  getSystems() {
    return this.systemManager.getSystems();
  }
  execute(delta, time) {
    if (!delta) {
      time = now() / 1e3;
      delta = time - this.lastTime;
      this.lastTime = time;
    }
    if (this.enabled) {
      this.systemManager.execute(delta, time);
      this.entityManager.processDeferredRemoval();
    }
  }
  stop() {
    this.enabled = false;
  }
  play() {
    this.enabled = true;
  }
  createEntity(name) {
    return this.entityManager.createEntity(name);
  }
  stats() {
    var stats = {
      entities: this.entityManager.stats(),
      system: this.systemManager.stats()
    };
    return stats;
  }
};

// src/Core/index.ts
var mainWorld = new World();
var physicsWorld = new World();
var timeContext = {
  startTime: 0,
  currentTime: 0,
  deltaTime: 0,
  timeScale: 1,
  fixedTimeStep: 1 / 60
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
window.onload = mainInit;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mainWorld,
  physicsWorld,
  timeContext
});
