"use strict";
(() => {
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
  var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
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
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
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
      var fulfilled = (value2) => {
        try {
          step(generator.next(value2));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value2) => {
        try {
          step(generator.throw(value2));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/js-file-download/file-download.js
  var require_file_download = __commonJS({
    "node_modules/js-file-download/file-download.js"(exports, module) {
      module.exports = function(data2, filename, mime, bom) {
        var blobData = typeof bom !== "undefined" ? [bom, data2] : [data2];
        var blob = new Blob(blobData, { type: mime || "application/octet-stream" });
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          var blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
          var tempLink = document.createElement("a");
          tempLink.style.display = "none";
          tempLink.href = blobURL;
          tempLink.setAttribute("download", filename);
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }
          document.body.appendChild(tempLink);
          tempLink.click();
          setTimeout(function() {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
          }, 200);
        }
      };
    }
  });

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value2) {
        return value2 !== value2;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len4 = handler.length;
          var listeners = arrayClone(handler, len4);
          for (var i = 0; i < len4; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy7 = new Array(n);
        for (var i = 0; i < n; ++i)
          copy7[i] = arr[i];
        return copy7;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // src/Editor/index.ts
  var import_js_file_download2 = __toESM(require_file_download());

  // ecsy/src/Utils.js
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

  // ecsy/src/SystemManager.js
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

  // ecsy/src/ObjectPool.js
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
        var clone7 = new this.T();
        clone7._pool = this;
        this.freeList.push(clone7);
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

  // ecsy/src/EventDispatcher.js
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

  // ecsy/src/Query.js
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

  // ecsy/src/QueryManager.js
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

  // ecsy/src/Component.js
  var import_events = __toESM(require_events());
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
        if (props !== void 0) {
          this.checkUndefinedAttributes(props);
        }
      }
      this.eventEmitter = new import_events.default();
      this._pool = null;
      this.onInspector = null;
      this.useDefaultInspector = true;
    }
    copy(source) {
      const schema = this.constructor.schema;
      for (const key in schema) {
        const prop = schema[key];
        if (source.hasOwnProperty(key)) {
          this[key] = prop.type.copy(source[key], this[key]);
        }
      }
      if (true) {
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
  var COMPONENT_CHANGE_EVENT = "COMPONENT_CHANGE_EVENT";

  // ecsy/src/SystemStateComponent.js
  var SystemStateComponent = class extends Component {
  };
  SystemStateComponent.isSystemStateComponent = true;

  // ecsy/src/EntityManager.js
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
        var clone7 = new this.T(this.entityManager);
        clone7._pool = this;
        this.freeList.push(clone7);
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
      this._entitiesById = {};
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
    getEntityById(id) {
      return this._entitiesById[id];
    }
    getAllEntities() {
      return this._entities;
    }
    idExists(id) {
      return this._entitiesById[id] !== void 0;
    }
    createEntity(name, id) {
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
      if (id) {
        entity.id = id;
        this._entityPool.freeList = this._entityPool.freeList.filter(
          (e) => e.id !== id
        );
      }
      this._entitiesById[entity.id] = entity;
      this._entities.push(entity);
      this.eventDispatcher.dispatchEvent(ENTITY_CREATED, entity);
      this.world.onEntityChanged.forEach((callback) => {
        callback(this._entities);
      });
      return entity;
    }
    entityAddComponent(entity, Component2, values) {
      if (typeof Component2._typeId === "undefined" && !this.world.componentsManager._ComponentsMap[Component2._typeId]) {
        throw new Error(
          `Attempted to add unregistered component "${Component2.getName()}"`
        );
      }
      if (~entity._ComponentTypes.indexOf(Component2)) {
        if (true) {
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
      if (this._entitiesById[entity.id]) {
        delete this._entitiesById[entity.id];
      }
      entity._pool.release(entity);
      this.world.onEntityChanged.forEach((callback) => {
        callback(this._entities);
      });
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

  // ecsy/src/ComponentManager.js
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

  // ecsy/src/Version.js
  var Version2 = "0.3.1";

  // ecsy/src/WrapImmutableComponent.js
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

  // ecsy/src/Entity.js
  var Entity = class {
    constructor(entityManager) {
      this._entityManager = entityManager || null;
      do {
        this.id = entityManager._nextEntityId++;
      } while (entityManager.idExists(this.id));
      this.name = "";
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
      return true ? wrapImmutableComponent(Component2, component) : component;
    }
    getRemovedComponent(Component2) {
      const component = this._componentsToRemove[Component2._typeId];
      return true ? wrapImmutableComponent(Component2, component) : component;
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
      component.eventEmitter.emit(COMPONENT_CHANGE_EVENT, component);
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

  // ecsy/src/World.js
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
      this.onEntityChanged = [];
      this.enabled = true;
      this.eventQueues = {};
      if (hasWindow && typeof CustomEvent !== "undefined") {
        var event = new CustomEvent("ecsy-world-created", {
          detail: { world: this, version: Version2 }
        });
        window.dispatchEvent(event);
      }
      this.lastTime = now() / 1e3;
    }
    registerComponent(Component2, objectPool) {
      this.componentsManager.registerComponent(Component2, objectPool);
      return this;
    }
    registerSystem(System2, attributes) {
      this.systemManager.registerSystem(System2, attributes);
      return this;
    }
    hasRegisteredComponent(Component2) {
      return this.componentsManager.hasComponent(Component2);
    }
    unregisterSystem(System2) {
      this.systemManager.unregisterSystem(System2);
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
    createEntity(name, id) {
      return this.entityManager.createEntity(name, id);
    }
    getAllEntities() {
      return this.entityManager.getAllEntities();
    }
    getEntityByName(name) {
      return this.entityManager.getEntityByName(name);
    }
    getEntityById(id) {
      return this.entityManager.getEntityById(id);
    }
    stats() {
      var stats = {
        entities: this.entityManager.stats(),
        system: this.systemManager.stats()
      };
      return stats;
    }
  };

  // ecsy/src/System.js
  var System = class {
    canExecute() {
      if (this._mandatoryQueries.length === 0)
        return true;
      for (let i = 0; i < this._mandatoryQueries.length; i++) {
        var query = this._mandatoryQueries[i];
        if (query.entities.length === 0) {
          return false;
        }
      }
      return true;
    }
    getName() {
      return this.constructor.getName();
    }
    constructor(world, attributes) {
      this.world = world;
      this.enabled = true;
      this._queries = {};
      this.queries = {};
      this.priority = 0;
      this.executeTime = 0;
      if (attributes && attributes.priority) {
        this.priority = attributes.priority;
      }
      this._mandatoryQueries = [];
      this.initialized = true;
      if (this.constructor.queries) {
        for (var queryName in this.constructor.queries) {
          var queryConfig = this.constructor.queries[queryName];
          var Components = queryConfig.components;
          if (!Components || Components.length === 0) {
            throw new Error("'components' attribute can't be empty in a query");
          }
          let unregisteredComponents = Components.filter(
            (Component2) => !componentRegistered(Component2)
          );
          if (unregisteredComponents.length > 0) {
            throw new Error(
              `Tried to create a query '${this.constructor.name}.${queryName}' with unregistered components: [${unregisteredComponents.map((c) => c.getName()).join(", ")}]`
            );
          }
          var query = this.world.entityManager.queryComponents(Components);
          this._queries[queryName] = query;
          if (queryConfig.mandatory === true) {
            this._mandatoryQueries.push(query);
          }
          this.queries[queryName] = {
            results: query.entities
          };
          var validEvents = ["added", "removed", "changed"];
          const eventMapping = {
            added: Query.prototype.ENTITY_ADDED,
            removed: Query.prototype.ENTITY_REMOVED,
            changed: Query.prototype.COMPONENT_CHANGED
          };
          if (queryConfig.listen) {
            validEvents.forEach((eventName) => {
              if (!this.execute) {
                console.warn(
                  `System '${this.getName()}' has defined listen events (${validEvents.join(
                    ", "
                  )}) for query '${queryName}' but it does not implement the 'execute' method.`
                );
              }
              if (queryConfig.listen[eventName]) {
                let event = queryConfig.listen[eventName];
                if (eventName === "changed") {
                  query.reactive = true;
                  if (event === true) {
                    let eventList = this.queries[queryName][eventName] = [];
                    query.eventDispatcher.addEventListener(
                      Query.prototype.COMPONENT_CHANGED,
                      (entity) => {
                        if (eventList.indexOf(entity) === -1) {
                          eventList.push(entity);
                        }
                      }
                    );
                  } else if (Array.isArray(event)) {
                    let eventList = this.queries[queryName][eventName] = [];
                    query.eventDispatcher.addEventListener(
                      Query.prototype.COMPONENT_CHANGED,
                      (entity, changedComponent) => {
                        if (event.indexOf(changedComponent.constructor) !== -1 && eventList.indexOf(entity) === -1) {
                          eventList.push(entity);
                        }
                      }
                    );
                  } else {
                  }
                } else {
                  let eventList = this.queries[queryName][eventName] = [];
                  query.eventDispatcher.addEventListener(
                    eventMapping[eventName],
                    (entity) => {
                      if (eventList.indexOf(entity) === -1)
                        eventList.push(entity);
                    }
                  );
                }
              }
            });
          }
        }
      }
    }
    stop() {
      this.executeTime = 0;
      this.enabled = false;
    }
    play() {
      this.enabled = true;
    }
    clearEvents() {
      for (let queryName in this.queries) {
        var query = this.queries[queryName];
        if (query.added) {
          query.added.length = 0;
        }
        if (query.removed) {
          query.removed.length = 0;
        }
        if (query.changed) {
          if (Array.isArray(query.changed)) {
            query.changed.length = 0;
          } else {
            for (let name in query.changed) {
              query.changed[name].length = 0;
            }
          }
        }
      }
    }
    toJSON() {
      var json = {
        name: this.getName(),
        enabled: this.enabled,
        executeTime: this.executeTime,
        priority: this.priority,
        queries: {}
      };
      if (this.constructor.queries) {
        var queries = this.constructor.queries;
        for (let queryName in queries) {
          let query = this.queries[queryName];
          let queryDefinition = queries[queryName];
          let jsonQuery = json.queries[queryName] = {
            key: this._queries[queryName].key
          };
          jsonQuery.mandatory = queryDefinition.mandatory === true;
          jsonQuery.reactive = queryDefinition.listen && (queryDefinition.listen.added === true || queryDefinition.listen.removed === true || queryDefinition.listen.changed === true || Array.isArray(queryDefinition.listen.changed));
          if (jsonQuery.reactive) {
            jsonQuery.listen = {};
            const methods = ["added", "removed", "changed"];
            methods.forEach((method) => {
              if (query[method]) {
                jsonQuery.listen[method] = {
                  entities: query[method].length
                };
              }
            });
          }
        }
      }
      return json;
    }
  };
  System.isSystem = true;
  System.getName = function() {
    return this.displayName || this.name;
  };

  // ecsy/src/TagComponent.js
  var TagComponent = class extends Component {
    constructor() {
      super(false);
    }
  };
  TagComponent.isTagComponent = true;

  // ecsy/src/Types.js
  var copyValue = (src) => src;
  var cloneValue = (src) => src;
  var copyArray = (src, dest) => {
    if (!src) {
      return src;
    }
    if (!dest) {
      return src.slice();
    }
    dest.length = 0;
    for (let i = 0; i < src.length; i++) {
      dest.push(src[i]);
    }
    return dest;
  };
  var cloneArray = (src) => src && src.slice();
  var copyJSON = (src) => JSON.parse(JSON.stringify(src));
  var cloneJSON = (src) => JSON.parse(JSON.stringify(src));
  var copyCopyable = (src, dest) => {
    if (!src) {
      return src;
    }
    if (!dest) {
      return src.clone();
    }
    return dest.copy(src);
  };
  var cloneClonable = (src) => src && src.clone();
  function createType(typeDefinition) {
    var mandatoryProperties = ["name", "default", "copy", "clone"];
    var undefinedProperties = mandatoryProperties.filter((p) => {
      return !typeDefinition.hasOwnProperty(p);
    });
    if (undefinedProperties.length > 0) {
      throw new Error(
        `createType expects a type definition with the following properties: ${undefinedProperties.join(
          ", "
        )}`
      );
    }
    typeDefinition.isType = true;
    return typeDefinition;
  }
  var Types = {
    Number: createType({
      name: "Number",
      default: 0,
      copy: copyValue,
      clone: cloneValue
    }),
    Boolean: createType({
      name: "Boolean",
      default: false,
      copy: copyValue,
      clone: cloneValue
    }),
    String: createType({
      name: "String",
      default: "",
      copy: copyValue,
      clone: cloneValue
    }),
    Array: createType({
      name: "Array",
      default: [],
      copy: copyArray,
      clone: cloneArray
    }),
    Ref: createType({
      name: "Ref",
      default: void 0,
      copy: copyValue,
      clone: cloneValue
    }),
    JSON: createType({
      name: "JSON",
      default: null,
      copy: copyJSON,
      clone: cloneJSON
    })
  };

  // ecsy/src/RemoteDevTools/utils.js
  function generateId(length5) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  function injectScript(src, onLoad) {
    var script2 = document.createElement("script");
    script2.src = src;
    script2.onload = onLoad;
    (document.head || document.documentElement).appendChild(script2);
  }

  // ecsy/src/RemoteDevTools/index.js
  function hookConsoleAndErrors(connection2) {
    var wrapFunctions = ["error", "warning", "log"];
    wrapFunctions.forEach((key) => {
      if (typeof console[key] === "function") {
        var fn = console[key].bind(console);
        console[key] = (...args) => {
          connection2.send({
            method: "console",
            type: key,
            args: JSON.stringify(args)
          });
          return fn.apply(null, args);
        };
      }
    });
    window.addEventListener("error", (error) => {
      connection2.send({
        method: "error",
        error: JSON.stringify({
          message: error.error.message,
          stack: error.error.stack
        })
      });
    });
  }
  function includeRemoteIdHTML(remoteId2) {
    let infoDiv2 = document.createElement("div");
    infoDiv2.style.cssText = `
    align-items: center;
    background-color: #333;
    color: #aaa;
    display:flex;
    font-family: Arial;
    font-size: 1.1em;
    height: 40px;
    justify-content: center;
    left: 0;
    opacity: 0.9;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
  `;
    infoDiv2.innerHTML = `Open ECSY devtools to connect to this page using the code:&nbsp;<b style="color: #fff">${remoteId2}</b>&nbsp;<button onClick="generateNewCode()">Generate new code</button>`;
    document.body.appendChild(infoDiv2);
    return infoDiv2;
  }
  function enableRemoteDevtools(remoteId) {
    if (!hasWindow) {
      console.warn("Remote devtools not available outside the browser");
      return;
    }
    window.generateNewCode = () => {
      window.localStorage.clear();
      remoteId = generateId(6);
      window.localStorage.setItem("ecsyRemoteId", remoteId);
      window.location.reload(false);
    };
    remoteId = remoteId || window.localStorage.getItem("ecsyRemoteId");
    if (!remoteId) {
      remoteId = generateId(6);
      window.localStorage.setItem("ecsyRemoteId", remoteId);
    }
    let infoDiv = includeRemoteIdHTML(remoteId);
    window.__ECSY_REMOTE_DEVTOOLS_INJECTED = true;
    window.__ECSY_REMOTE_DEVTOOLS = {};
    let Version = "";
    let worldsBeforeLoading = [];
    let onWorldCreated = (e) => {
      var world = e.detail.world;
      Version = e.detail.version;
      worldsBeforeLoading.push(world);
    };
    window.addEventListener("ecsy-world-created", onWorldCreated);
    let onLoaded = () => {
      var peer = new Peer(remoteId, {
        host: "peerjs.ecsy.io",
        secure: true,
        port: 443,
        config: {
          iceServers: [
            { url: "stun:stun.l.google.com:19302" },
            { url: "stun:stun1.l.google.com:19302" },
            { url: "stun:stun2.l.google.com:19302" },
            { url: "stun:stun3.l.google.com:19302" },
            { url: "stun:stun4.l.google.com:19302" }
          ]
        },
        debug: 3
      });
      peer.on("open", () => {
        peer.on("connection", (connection) => {
          window.__ECSY_REMOTE_DEVTOOLS.connection = connection;
          connection.on("open", function() {
            infoDiv.innerHTML = "Connected";
            connection.on("data", function(data) {
              if (data.type === "init") {
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.onload = () => {
                  script.parentNode.removeChild(script);
                  window.removeEventListener(
                    "ecsy-world-created",
                    onWorldCreated
                  );
                  worldsBeforeLoading.forEach((world) => {
                    var event = new CustomEvent("ecsy-world-created", {
                      detail: { world, version: Version }
                    });
                    window.dispatchEvent(event);
                  });
                };
                script.innerHTML = data.script;
                (document.head || document.documentElement).appendChild(script);
                script.onload();
                hookConsoleAndErrors(connection);
              } else if (data.type === "executeScript") {
                let value = eval(data.script);
                if (data.returnEval) {
                  connection.send({
                    method: "evalReturn",
                    value
                  });
                }
              }
            });
          });
        });
      });
    };
    injectScript(
      "https://cdn.jsdelivr.net/npm/peerjs@0.3.20/dist/peer.min.js",
      onLoaded
    );
  }
  if (hasWindow) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("enable-remote-devtools")) {
      enableRemoteDevtools();
    }
  }

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
  var mainWorld = new World();
  var physicsWorld = new World();
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
    mainWorld = new World();
    physicsWorld = new World();
  };

  // src/Editor/TagComponent/EditorSelectedTag.ts
  var EditorSelectedTag = class extends TagComponent {
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
        if (Object.keys(componentSchema).includes(key) && componentSchema[key].type !== Types.Ref) {
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
  var EditorSceneCamTag = class extends TagComponent {
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
  var import_js_file_download = __toESM(require_file_download());

  // node_modules/gl-matrix/esm/common.js
  var EPSILON = 1e-6;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var RANDOM = Math.random;
  var degree = Math.PI / 180;
  if (!Math.hypot)
    Math.hypot = function() {
      var y = 0, i = arguments.length;
      while (i--) {
        y += arguments[i] * arguments[i];
      }
      return Math.sqrt(y);
    };

  // node_modules/gl-matrix/esm/mat3.js
  var mat3_exports = {};
  __export(mat3_exports, {
    add: () => add,
    adjoint: () => adjoint,
    clone: () => clone,
    copy: () => copy,
    create: () => create,
    determinant: () => determinant,
    equals: () => equals,
    exactEquals: () => exactEquals,
    frob: () => frob,
    fromMat2d: () => fromMat2d,
    fromMat4: () => fromMat4,
    fromQuat: () => fromQuat,
    fromRotation: () => fromRotation,
    fromScaling: () => fromScaling,
    fromTranslation: () => fromTranslation,
    fromValues: () => fromValues,
    identity: () => identity,
    invert: () => invert,
    mul: () => mul,
    multiply: () => multiply,
    multiplyScalar: () => multiplyScalar,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd,
    normalFromMat4: () => normalFromMat4,
    projection: () => projection,
    rotate: () => rotate,
    scale: () => scale,
    set: () => set,
    str: () => str,
    sub: () => sub,
    subtract: () => subtract,
    translate: () => translate,
    transpose: () => transpose
  });
  function create() {
    var out = new ARRAY_TYPE(9);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }
    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  function clone(a) {
    var out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function transpose(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }
    return out;
  }
  function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20;
    var det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate(out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale(out, a, v) {
    var x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  function fromRotation(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  function normalFromMat4(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  function str(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
  }
  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  function multiplyScalarAndAdd(out, a, b, scale7) {
    out[0] = a[0] + b[0] * scale7;
    out[1] = a[1] + b[1] * scale7;
    out[2] = a[2] + b[2] * scale7;
    out[3] = a[3] + b[3] * scale7;
    out[4] = a[4] + b[4] * scale7;
    out[5] = a[5] + b[5] * scale7;
    out[6] = a[6] + b[6] * scale7;
    out[7] = a[7] + b[7] * scale7;
    out[8] = a[8] + b[8] * scale7;
    return out;
  }
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  function equals(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
  }
  var mul = multiply;
  var sub = subtract;

  // node_modules/gl-matrix/esm/mat4.js
  var mat4_exports = {};
  __export(mat4_exports, {
    add: () => add2,
    adjoint: () => adjoint2,
    clone: () => clone2,
    copy: () => copy2,
    create: () => create2,
    determinant: () => determinant2,
    equals: () => equals2,
    exactEquals: () => exactEquals2,
    frob: () => frob2,
    fromQuat: () => fromQuat3,
    fromQuat2: () => fromQuat2,
    fromRotation: () => fromRotation2,
    fromRotationTranslation: () => fromRotationTranslation,
    fromRotationTranslationScale: () => fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
    fromScaling: () => fromScaling2,
    fromTranslation: () => fromTranslation2,
    fromValues: () => fromValues2,
    fromXRotation: () => fromXRotation,
    fromYRotation: () => fromYRotation,
    fromZRotation: () => fromZRotation,
    frustum: () => frustum,
    getRotation: () => getRotation,
    getScaling: () => getScaling,
    getTranslation: () => getTranslation,
    identity: () => identity2,
    invert: () => invert2,
    lookAt: () => lookAt,
    mul: () => mul2,
    multiply: () => multiply2,
    multiplyScalar: () => multiplyScalar2,
    multiplyScalarAndAdd: () => multiplyScalarAndAdd2,
    ortho: () => ortho,
    orthoNO: () => orthoNO,
    orthoZO: () => orthoZO,
    perspective: () => perspective,
    perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
    perspectiveNO: () => perspectiveNO,
    perspectiveZO: () => perspectiveZO,
    rotate: () => rotate2,
    rotateX: () => rotateX,
    rotateY: () => rotateY,
    rotateZ: () => rotateZ,
    scale: () => scale2,
    set: () => set2,
    str: () => str2,
    sub: () => sub2,
    subtract: () => subtract2,
    targetTo: () => targetTo,
    translate: () => translate2,
    transpose: () => transpose2
  });
  function create2() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  function clone2(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function transpose2(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a03 = a[3];
      var a12 = a[6], a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  }
  function invert2(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function adjoint2(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  function determinant2(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply2(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate2(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale2(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate2(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len4 = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;
    if (len4 < EPSILON) {
      return null;
    }
    len4 = 1 / len4;
    x *= len4;
    y *= len4;
    z *= len4;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  function fromTranslation2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromScaling2(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotation2(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len4 = Math.hypot(x, y, z);
    var s, c, t;
    if (len4 < EPSILON) {
      return null;
    }
    len4 = 1 / len4;
    x *= len4;
    y *= len4;
    z *= len4;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function fromRotationTranslation(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw;
    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }
    fromRotationTranslation(out, a, translation);
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;
    if (trace > 0) {
      S = Math.sqrt(trace + 1) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }
    return out;
  }
  function fromRotationTranslationScale(out, q, v, s) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  function fromQuat3(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }
    return out;
  }
  var perspective = perspectiveNO;
  function perspectiveZO(out, fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2), nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;
    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = far * nf;
      out[14] = far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -near;
    }
    return out;
  }
  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    var xScale = 2 / (leftTan + rightTan);
    var yScale = 2 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = yScale;
    out[6] = 0;
    out[7] = 0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near / (near - far);
    out[15] = 0;
    return out;
  }
  function orthoNO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  var ortho = orthoNO;
  function orthoZO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
  }
  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len4;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];
    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity2(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len4 = 1 / Math.hypot(z0, z1, z2);
    z0 *= len4;
    z1 *= len4;
    z2 *= len4;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len4 = Math.hypot(x0, x1, x2);
    if (!len4) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len4 = 1 / len4;
      x0 *= len4;
      x1 *= len4;
      x2 *= len4;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len4 = Math.hypot(y0, y1, y2);
    if (!len4) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len4 = 1 / len4;
      y0 *= len4;
      y1 *= len4;
      y2 *= len4;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    var len4 = z0 * z0 + z1 * z1 + z2 * z2;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
      z0 *= len4;
      z1 *= len4;
      z2 *= len4;
    }
    var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len4 = x0 * x0 + x1 * x1 + x2 * x2;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
      x0 *= len4;
      x1 *= len4;
      x2 *= len4;
    }
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  function str2(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  function frob2(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  function add2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  function multiplyScalar2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  function multiplyScalarAndAdd2(out, a, b, scale7) {
    out[0] = a[0] + b[0] * scale7;
    out[1] = a[1] + b[1] * scale7;
    out[2] = a[2] + b[2] * scale7;
    out[3] = a[3] + b[3] * scale7;
    out[4] = a[4] + b[4] * scale7;
    out[5] = a[5] + b[5] * scale7;
    out[6] = a[6] + b[6] * scale7;
    out[7] = a[7] + b[7] * scale7;
    out[8] = a[8] + b[8] * scale7;
    out[9] = a[9] + b[9] * scale7;
    out[10] = a[10] + b[10] * scale7;
    out[11] = a[11] + b[11] * scale7;
    out[12] = a[12] + b[12] * scale7;
    out[13] = a[13] + b[13] * scale7;
    out[14] = a[14] + b[14] * scale7;
    out[15] = a[15] + b[15] * scale7;
    return out;
  }
  function exactEquals2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  function equals2(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
    var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
    var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
    var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
    var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
  }
  var mul2 = multiply2;
  var sub2 = subtract2;

  // node_modules/gl-matrix/esm/quat.js
  var quat_exports = {};
  __export(quat_exports, {
    add: () => add5,
    calculateW: () => calculateW,
    clone: () => clone5,
    conjugate: () => conjugate,
    copy: () => copy5,
    create: () => create5,
    dot: () => dot3,
    equals: () => equals5,
    exactEquals: () => exactEquals5,
    exp: () => exp,
    fromEuler: () => fromEuler,
    fromMat3: () => fromMat3,
    fromValues: () => fromValues5,
    getAngle: () => getAngle,
    getAxisAngle: () => getAxisAngle,
    identity: () => identity3,
    invert: () => invert3,
    len: () => len2,
    length: () => length3,
    lerp: () => lerp3,
    ln: () => ln,
    mul: () => mul4,
    multiply: () => multiply4,
    normalize: () => normalize3,
    pow: () => pow,
    random: () => random2,
    rotateX: () => rotateX3,
    rotateY: () => rotateY3,
    rotateZ: () => rotateZ3,
    rotationTo: () => rotationTo,
    scale: () => scale5,
    set: () => set5,
    setAxes: () => setAxes,
    setAxisAngle: () => setAxisAngle,
    slerp: () => slerp,
    sqlerp: () => sqlerp,
    sqrLen: () => sqrLen2,
    squaredLength: () => squaredLength3,
    str: () => str4
  });

  // node_modules/gl-matrix/esm/vec3.js
  var vec3_exports = {};
  __export(vec3_exports, {
    add: () => add3,
    angle: () => angle,
    bezier: () => bezier,
    ceil: () => ceil,
    clone: () => clone3,
    copy: () => copy3,
    create: () => create3,
    cross: () => cross,
    dist: () => dist,
    distance: () => distance,
    div: () => div,
    divide: () => divide,
    dot: () => dot,
    equals: () => equals3,
    exactEquals: () => exactEquals3,
    floor: () => floor,
    forEach: () => forEach,
    fromValues: () => fromValues3,
    hermite: () => hermite,
    inverse: () => inverse,
    len: () => len,
    length: () => length,
    lerp: () => lerp,
    max: () => max,
    min: () => min,
    mul: () => mul3,
    multiply: () => multiply3,
    negate: () => negate,
    normalize: () => normalize,
    random: () => random,
    rotateX: () => rotateX2,
    rotateY: () => rotateY2,
    rotateZ: () => rotateZ2,
    round: () => round,
    scale: () => scale3,
    scaleAndAdd: () => scaleAndAdd,
    set: () => set3,
    sqrDist: () => sqrDist,
    sqrLen: () => sqrLen,
    squaredDistance: () => squaredDistance,
    squaredLength: () => squaredLength,
    str: () => str3,
    sub: () => sub3,
    subtract: () => subtract3,
    transformMat3: () => transformMat3,
    transformMat4: () => transformMat4,
    transformQuat: () => transformQuat,
    zero: () => zero
  });
  function create3() {
    var out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function clone3(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  function fromValues3(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function copy3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set3(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract3(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply3(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  function scale3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function scaleAndAdd(out, a, b, scale7) {
    out[0] = a[0] + b[0] * scale7;
    out[1] = a[1] + b[1] * scale7;
    out[2] = a[2] + b[2] * scale7;
    return out;
  }
  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len4 = x * x + y * y + z * z;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
    }
    out[0] = a[0] * len4;
    out[1] = a[1] * len4;
    out[2] = a[2] * len4;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2];
    var bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  function random(out, scale7) {
    scale7 = scale7 || 1;
    var r = RANDOM() * 2 * Math.PI;
    var z = RANDOM() * 2 - 1;
    var zScale = Math.sqrt(1 - z * z) * scale7;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale7;
    return out;
  }
  function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    var x = a[0], y = a[1], z = a[2];
    var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function rotateX2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateY2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateZ2(out, a, b, rad) {
    var p = [], r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2];
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function angle(a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  function zero(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }
  function str3(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  function exactEquals3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  function equals3(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
  }
  var sub3 = subtract3;
  var mul3 = multiply3;
  var div = divide;
  var dist = distance;
  var sqrDist = squaredDistance;
  var len = length;
  var sqrLen = squaredLength;
  var forEach = function() {
    var vec = create3();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/vec4.js
  function create4() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  function clone4(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function fromValues4(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function copy4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function set4(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function add4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  function scale4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  function length2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
  }
  function squaredLength2(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  function normalize2(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len4 = x * x + y * y + z * z + w * w;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
    }
    out[0] = x * len4;
    out[1] = y * len4;
    out[2] = z * len4;
    out[3] = w * len4;
    return out;
  }
  function dot2(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  function lerp2(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  function exactEquals4(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  function equals4(a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
  }
  var forEach2 = function() {
    var vec = create4();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  }();

  // node_modules/gl-matrix/esm/quat.js
  function create5() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    out[3] = 1;
    return out;
  }
  function identity3(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2;
    var s = Math.sin(rad / 2);
    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }
    return rad;
  }
  function getAngle(a, b) {
    var dotproduct = dot3(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
  function multiply4(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function rotateX3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  function rotateY3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  function rotateZ3(out, a, rad) {
    rad *= 0.5;
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  function calculateW(out, a) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
    return out;
  }
  function exp(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }
  function ln(out, a) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
  }
  function pow(out, a, b) {
    ln(out, a);
    scale5(out, out, b);
    exp(out, out);
    return out;
  }
  function slerp(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3];
    var bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > EPSILON) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function random2(out) {
    var u1 = RANDOM();
    var u2 = RANDOM();
    var u3 = RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
    return out;
  }
  function invert3(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var dot5 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot5 ? 1 / dot5 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  function fromMat3(out, m) {
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      var i = 0;
      if (m[4] > m[0])
        i = 1;
      if (m[8] > m[i * 3 + i])
        i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  function str4(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  var clone5 = clone4;
  var fromValues5 = fromValues4;
  var copy5 = copy4;
  var set5 = set4;
  var add5 = add4;
  var mul4 = multiply4;
  var scale5 = scale4;
  var dot3 = dot2;
  var lerp3 = lerp2;
  var length3 = length2;
  var len2 = length3;
  var squaredLength3 = squaredLength2;
  var sqrLen2 = squaredLength3;
  var normalize3 = normalize2;
  var exactEquals5 = exactEquals4;
  var equals5 = equals4;
  var rotationTo = function() {
    var tmpvec3 = create3();
    var xUnitVec3 = fromValues3(1, 0, 0);
    var yUnitVec3 = fromValues3(0, 1, 0);
    return function(out, a, b) {
      var dot5 = dot(a, b);
      if (dot5 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 1e-6)
          cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot5 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot5;
        return normalize3(out, out);
      }
    };
  }();
  var sqlerp = function() {
    var temp1 = create5();
    var temp2 = create5();
    return function(out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  var setAxes = function() {
    var matr = create();
    return function(out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize3(out, fromMat3(out, matr));
    };
  }();

  // node_modules/gl-matrix/esm/vec2.js
  var vec2_exports = {};
  __export(vec2_exports, {
    add: () => add6,
    angle: () => angle2,
    ceil: () => ceil2,
    clone: () => clone6,
    copy: () => copy6,
    create: () => create6,
    cross: () => cross2,
    dist: () => dist2,
    distance: () => distance2,
    div: () => div2,
    divide: () => divide2,
    dot: () => dot4,
    equals: () => equals6,
    exactEquals: () => exactEquals6,
    floor: () => floor2,
    forEach: () => forEach3,
    fromValues: () => fromValues6,
    inverse: () => inverse2,
    len: () => len3,
    length: () => length4,
    lerp: () => lerp4,
    max: () => max2,
    min: () => min2,
    mul: () => mul5,
    multiply: () => multiply5,
    negate: () => negate2,
    normalize: () => normalize4,
    random: () => random3,
    rotate: () => rotate3,
    round: () => round2,
    scale: () => scale6,
    scaleAndAdd: () => scaleAndAdd2,
    set: () => set6,
    sqrDist: () => sqrDist2,
    sqrLen: () => sqrLen3,
    squaredDistance: () => squaredDistance2,
    squaredLength: () => squaredLength4,
    str: () => str5,
    sub: () => sub4,
    subtract: () => subtract4,
    transformMat2: () => transformMat2,
    transformMat2d: () => transformMat2d,
    transformMat3: () => transformMat32,
    transformMat4: () => transformMat42,
    zero: () => zero2
  });
  function create6() {
    var out = new ARRAY_TYPE(2);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }
  function clone6(a) {
    var out = new ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  function fromValues6(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  function copy6(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  function set6(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  function add6(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  function subtract4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  function multiply5(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }
  function divide2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }
  function ceil2(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
  }
  function floor2(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
  }
  function min2(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  }
  function max2(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  }
  function round2(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
  }
  function scale6(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  function scaleAndAdd2(out, a, b, scale7) {
    out[0] = a[0] + b[0] * scale7;
    out[1] = a[1] + b[1] * scale7;
    return out;
  }
  function distance2(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return Math.hypot(x, y);
  }
  function squaredDistance2(a, b) {
    var x = b[0] - a[0], y = b[1] - a[1];
    return x * x + y * y;
  }
  function length4(a) {
    var x = a[0], y = a[1];
    return Math.hypot(x, y);
  }
  function squaredLength4(a) {
    var x = a[0], y = a[1];
    return x * x + y * y;
  }
  function negate2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }
  function inverse2(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    return out;
  }
  function normalize4(out, a) {
    var x = a[0], y = a[1];
    var len4 = x * x + y * y;
    if (len4 > 0) {
      len4 = 1 / Math.sqrt(len4);
    }
    out[0] = a[0] * len4;
    out[1] = a[1] * len4;
    return out;
  }
  function dot4(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function cross2(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }
  function lerp4(out, a, b, t) {
    var ax = a[0], ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }
  function random3(out, scale7) {
    scale7 = scale7 || 1;
    var r = RANDOM() * 2 * Math.PI;
    out[0] = Math.cos(r) * scale7;
    out[1] = Math.sin(r) * scale7;
    return out;
  }
  function transformMat2(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  function transformMat2d(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
  function transformMat32(out, a, m) {
    var x = a[0], y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  function transformMat42(out, a, m) {
    var x = a[0];
    var y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }
  function rotate3(out, a, b, rad) {
    var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
  }
  function angle2(a, b) {
    var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  function zero2(out) {
    out[0] = 0;
    out[1] = 0;
    return out;
  }
  function str5(a) {
    return "vec2(" + a[0] + ", " + a[1] + ")";
  }
  function exactEquals6(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }
  function equals6(a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
  }
  var len3 = length4;
  var sub4 = subtract4;
  var mul5 = multiply5;
  var div2 = divide2;
  var dist2 = distance2;
  var sqrDist2 = squaredDistance2;
  var sqrLen3 = squaredLength4;
  var forEach3 = function() {
    var vec = create6();
    return function(a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }
      return a;
    };
  }();

  // src/Mathematics/Vector2.ts
  var Vector2 = class {
    constructor(x, y) {
      this.value = vec2_exports.fromValues(x, y);
    }
    set(x, y) {
      vec2_exports.set(this.value, x, y);
    }
    copy(v) {
      this.value = vec2_exports.copy(this.value, v.value);
      return this;
    }
    clone() {
      return new Vector2(this.value[0], this.value[1]);
    }
  };
  var Vector2Type = createType({
    name: "Vector2",
    default: new Vector2(0, 0),
    copy: copyCopyable,
    clone: cloneClonable
  });
  var Vector2CustomEditor = (value2, onChange) => {
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
    xInput.value = value2.value[0].toString();
    vector2Div.appendChild(xInput);
    const yLabel = document.createElement("label");
    yLabel.innerText = "Y";
    vector2Div.appendChild(yLabel);
    const yInput = document.createElement("input");
    yInput.type = "number";
    yInput.style.minWidth = "0px";
    yInput.style.flexGrow = "1";
    yInput.value = value2.value[1].toString();
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
  var TransformData2D = class extends Component {
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
            this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
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
          this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
        };
        rotationDiv.appendChild(rotationInput);
        const scaleDiv = document.createElement("div");
        scaleDiv.appendChild(document.createTextNode("Scale"));
        const [scaleVector2Div, setScale] = Vector2CustomEditor(
          this.scale,
          (newValue) => {
            this.scale = newValue;
            this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
          }
        );
        scaleDiv.appendChild(scaleVector2Div);
        componentDiv.appendChild(positionDiv);
        componentDiv.appendChild(rotationDiv);
        componentDiv.appendChild(scaleDiv);
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
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
      type: Types.Number,
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

  // src/Mathematics/Quaternion.ts
  var Quaternion = class {
    constructor(x, y, z, w) {
      this.value = quat_exports.fromValues(x, y, z, w);
    }
    set(x, y, z, w) {
      quat_exports.set(this.value, x, y, z, w);
    }
    copy(q) {
      this.value = quat_exports.copy(this.value, q.value);
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
  var QuaternionType = createType({
    name: "Quaternion",
    default: new Quaternion(0, 0, 0, 1),
    copy: copyCopyable,
    clone: cloneClonable
  });
  var QuaternionCustomEditor = (value2, onChange) => {
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
    xInput.value = value2.value[0].toString();
    quaternionDiv.appendChild(xInput);
    const yLabel = document.createElement("label");
    yLabel.innerText = "Y";
    quaternionDiv.appendChild(yLabel);
    const yInput = document.createElement("input");
    yInput.type = "number";
    yInput.style.minWidth = "0px";
    yInput.style.flexGrow = "1";
    yInput.value = value2.value[1].toString();
    quaternionDiv.appendChild(yInput);
    const zLabel = document.createElement("label");
    zLabel.innerText = "Z";
    quaternionDiv.appendChild(zLabel);
    const zInput = document.createElement("input");
    zInput.type = "number";
    zInput.style.minWidth = "0px";
    zInput.style.flexGrow = "1";
    zInput.value = value2.value[2].toString();
    quaternionDiv.appendChild(zInput);
    const wLabel = document.createElement("label");
    wLabel.innerText = "W";
    quaternionDiv.appendChild(wLabel);
    const wInput = document.createElement("input");
    wInput.type = "number";
    wInput.style.minWidth = "0px";
    wInput.style.flexGrow = "1";
    wInput.value = value2.value[3].toString();
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
  var Vector3 = class {
    constructor(x, y, z) {
      this.value = vec3_exports.fromValues(x, y, z);
    }
    set(x, y, z) {
      vec3_exports.set(this.value, x, y, z);
    }
    copy(v) {
      this.value = vec3_exports.copy(this.value, v.value);
      return this;
    }
    clone() {
      return new Vector3(this.value[0], this.value[1], this.value[2]);
    }
  };
  var Vector3Type = createType({
    name: "Vector3",
    default: new Vector3(0, 0, 0),
    copy: copyCopyable,
    clone: cloneClonable
  });
  var Vector3CustomEditor = (value2, onChange) => {
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
    xInput.value = value2.value[0].toString();
    vector3Div.appendChild(xInput);
    const yLabel = document.createElement("label");
    yLabel.innerText = "Y";
    vector3Div.appendChild(yLabel);
    const yInput = document.createElement("input");
    yInput.type = "number";
    yInput.style.minWidth = "0px";
    yInput.style.flexGrow = "1";
    yInput.value = value2.value[1].toString();
    vector3Div.appendChild(yInput);
    const zLabel = document.createElement("label");
    zLabel.innerText = "Z";
    vector3Div.appendChild(zLabel);
    const zInput = document.createElement("input");
    zInput.type = "number";
    zInput.style.minWidth = "0px";
    zInput.style.flexGrow = "1";
    zInput.value = value2.value[2].toString();
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
  var TransformData3D = class extends Component {
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
            this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
          }
        );
        positionDiv.appendChild(positionVector3Div);
        const rotationDiv = document.createElement("div");
        rotationDiv.appendChild(document.createTextNode("Rotation"));
        const [rotationQuaternionDiv, setRotation] = QuaternionCustomEditor(
          this.rotation,
          (newValue) => {
            this.rotation = newValue;
            this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
          }
        );
        rotationDiv.appendChild(rotationQuaternionDiv);
        const scaleDiv = document.createElement("div");
        scaleDiv.appendChild(document.createTextNode("Scale"));
        const [scaleVector3Div, setScale] = Vector3CustomEditor(
          this.scale,
          (newValue) => {
            this.scale = newValue;
            this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
          }
        );
        scaleDiv.appendChild(scaleVector3Div);
        transformDiv.appendChild(positionDiv);
        transformDiv.appendChild(rotationDiv);
        transformDiv.appendChild(scaleDiv);
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
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

  // src/Core/Render/DataComponent/CameraData2D.ts
  var CameraData2D = class extends Component {
  };
  CameraData2D.schema = {
    backgroundType: {
      type: Types.Number,
      default: 0 /* Color */
    },
    backgroundColor: {
      type: Types.String,
      default: "#000000"
    },
    backgroundTexture: {
      type: Types.String,
      default: ""
    }
  };
  CameraData2D = __decorateClass([
    IComponent.register
  ], CameraData2D);

  // src/Core/Render/TagComponent/MainCameraTag.ts
  var MainCameraTag = class extends TagComponent {
  };
  MainCameraTag = __decorateClass([
    IComponent.register
  ], MainCameraTag);

  // src/Core/Render/System/Canvas2DRenderer.ts
  var Canvas2DRenderer = class extends System {
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
      const worldToCamera = mat3_exports.create();
      mat3_exports.fromTranslation(
        worldToCamera,
        vec2_exports.fromValues(canvasSize[0] / 2, canvasSize[1] / 2)
      );
      mat3_exports.scale(worldToCamera, worldToCamera, camTransform.scale.value);
      mat3_exports.translate(
        worldToCamera,
        worldToCamera,
        vec2_exports.negate(vec2_exports.create(), camTransform.position.value)
      );
      mat3_exports.rotate(worldToCamera, worldToCamera, camTransform.rotation);
      return worldToCamera;
    }
    objectToWorld(objTransform) {
      const objectToWorld = mat3_exports.create();
      mat3_exports.fromTranslation(objectToWorld, objTransform.position.value);
      mat3_exports.rotate(objectToWorld, objectToWorld, objTransform.rotation);
      mat3_exports.scale(objectToWorld, objectToWorld, objTransform.scale.value);
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
            const distance3 = vec2_exports.distance(
              mousePos,
              this.worldToScreen(transform.position.value)
            );
            if (distance3 < highlightThreshold && distance3 < closestDistance && !entity.hasComponent(EditorSceneCamTag)) {
              closestEntity = entity;
              closestDistance = distance3;
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
      const canvasSize = vec2_exports.fromValues(
        this.mainCanvas.width,
        this.mainCanvas.height
      );
      const worldToCamera = mat3_exports.create();
      mat3_exports.multiply(
        worldToCamera,
        worldToCamera,
        this.worldToCamera(cameraTransform, canvasSize)
      );
      if (_EditorViewPort2DSystem.inspectTransform) {
        const inspectObjToCamera = mat3_exports.create();
        mat3_exports.multiply(
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
        const highlightObjToCamera = mat3_exports.create();
        mat3_exports.multiply(
          highlightObjToCamera,
          worldToCamera,
          this.objectToWorld(transform)
        );
        this.drawHighlight(highlightObjToCamera);
      }
    }
    getMousePos(event) {
      const rect = this.mainCanvas.getBoundingClientRect();
      return vec2_exports.fromValues(event.clientX - rect.left, event.clientY - rect.top);
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
      const canvasSize = vec2_exports.fromValues(
        this.mainCanvas.width,
        this.mainCanvas.height
      );
      const worldPos = vec2_exports.create();
      vec2_exports.transformMat3(
        worldPos,
        screenPos,
        mat3_exports.invert(
          mat3_exports.create(),
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
      const canvasSize = vec2_exports.fromValues(
        this.mainCanvas.width,
        this.mainCanvas.height
      );
      const screenPos = vec2_exports.create();
      vec2_exports.transformMat3(
        screenPos,
        worldPos,
        this.worldToCamera(cameraTransform, canvasSize)
      );
      return screenPos;
    }
    drawAxis(inspectObjToCamera) {
      const startPos = vec2_exports.fromValues(0, 0);
      vec2_exports.transformMat3(startPos, startPos, inspectObjToCamera);
      const xAxisPos = vec2_exports.fromValues(1, 0);
      vec2_exports.transformMat3(xAxisPos, xAxisPos, inspectObjToCamera);
      const yAxisPos = vec2_exports.fromValues(0, 1);
      vec2_exports.transformMat3(yAxisPos, yAxisPos, inspectObjToCamera);
      vec2_exports.add(
        xAxisPos,
        startPos,
        vec2_exports.scale(
          vec2_exports.create(),
          vec2_exports.normalize(
            vec2_exports.create(),
            vec2_exports.sub(vec2_exports.create(), xAxisPos, startPos)
          ),
          axisLength
        )
      );
      vec2_exports.add(
        yAxisPos,
        startPos,
        vec2_exports.scale(
          vec2_exports.create(),
          vec2_exports.normalize(
            vec2_exports.create(),
            vec2_exports.sub(vec2_exports.create(), yAxisPos, startPos)
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
      const startPos = vec2_exports.fromValues(0, 0);
      vec2_exports.transformMat3(startPos, startPos, highlightObjToCamera);
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

  // src/Core/Render/DataComponent/OrthographicCameraData3D.ts
  var OrthographicCameraData3D = class extends Component {
  };
  OrthographicCameraData3D.schema = {
    left: {
      type: Types.Number,
      default: -1
    },
    right: {
      type: Types.Number,
      default: 1
    },
    top: {
      type: Types.Number,
      default: 1
    },
    bottom: {
      type: Types.Number,
      default: -1
    },
    near: {
      type: Types.Number,
      default: 0.1
    },
    far: {
      type: Types.Number,
      default: 1e3
    }
  };
  OrthographicCameraData3D = __decorateClass([
    IComponent.register
  ], OrthographicCameraData3D);

  // src/Core/Render/DataComponent/PerspectiveCameraData3D.ts
  var PerspectiveCameraData3D = class extends Component {
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
          this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
        });
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
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
          this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
        });
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
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
          this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
        });
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
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
          this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
        });
        this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
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
      type: Types.Number,
      default: Math.PI / 4
    },
    aspect: {
      type: Types.Number,
      default: 1
    },
    near: {
      type: Types.Number,
      default: 0.1
    },
    far: {
      type: Types.Number,
      default: 1e3
    }
  };
  PerspectiveCameraData3D = __decorateClass([
    IComponent.register
  ], PerspectiveCameraData3D);

  // src/Core/Render/System/Canvas3DRenderer.ts
  var Canvas3DRenderer = class extends System {
    constructor() {
      super(...arguments);
      this.worldToCamera = mat4_exports.create();
      this.cameraToScreen = mat4_exports.create();
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
      const worldToCamera = mat4_exports.create();
      mat4_exports.invert(worldToCamera, this.objectToWorld(camTransform));
      const orthographic = mat4_exports.create();
      mat4_exports.ortho(
        orthographic,
        camData.left,
        camData.right,
        camData.bottom,
        camData.top,
        camData.near,
        camData.far
      );
      mat4_exports.multiply(worldToCamera, orthographic, worldToCamera);
      return worldToCamera;
    }
    perspectiveWorldToCamera(camTransform, camData) {
      const worldToCamera = mat4_exports.create();
      mat4_exports.invert(worldToCamera, this.objectToWorld(camTransform));
      const perspective2 = mat4_exports.create();
      mat4_exports.perspective(
        perspective2,
        camData.fov,
        camData.aspect,
        camData.near,
        camData.far
      );
      mat4_exports.multiply(worldToCamera, perspective2, worldToCamera);
      return worldToCamera;
    }
    objectToWorld(transform, dropScale = false) {
      const objectToWorld = mat4_exports.create();
      if (dropScale) {
        mat4_exports.fromRotationTranslation(
          objectToWorld,
          transform.rotation.value,
          transform.position.value
        );
      } else {
        mat4_exports.fromRotationTranslationScale(
          objectToWorld,
          transform.rotation.value,
          transform.position.value,
          transform.scale.value
        );
      }
      return objectToWorld;
    }
    generateCameraToScreenMatrix() {
      this.cameraToScreen = mat4_exports.create();
      mat4_exports.fromTranslation(this.cameraToScreen, [
        this.mainCanvas.width / 2,
        this.mainCanvas.height / 2,
        0
      ]);
      mat4_exports.scale(this.cameraToScreen, this.cameraToScreen, [
        this.mainCanvas.width,
        this.mainCanvas.height,
        1
      ]);
    }
    generateWorldToCameraMatrix() {
      const canvasSize = vec2_exports.fromValues(
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
      this.mousePosition = vec2_exports.create();
      this.mouseDelta = vec2_exports.create();
      this.mouseInCanvas = true;
      this.highlightAxis = null;
      this.movingAxis = null;
    }
    init(attributes) {
      super.init(attributes);
      this.mainCanvas.addEventListener("mousemove", (event) => {
        this.mousePosition = this.getMousePos(event);
        vec2_exports.add(
          this.mouseDelta,
          this.mouseDelta,
          vec2_exports.fromValues(event.movementX, event.movementY)
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
        const objectToScreen = mat4_exports.create();
        mat4_exports.multiply(objectToScreen, this.worldToCamera, objectToWorld);
        mat4_exports.multiply(objectToScreen, this.cameraToScreen, objectToScreen);
        this.drawAxis(objectToScreen);
        const startPoint = vec3_exports.create();
        vec3_exports.transformMat4(startPoint, [0, 0, 0], objectToScreen);
        const endPointX = vec3_exports.create();
        vec3_exports.transformMat4(endPointX, [1, 0, 0], objectToScreen);
        const endPointY = vec3_exports.create();
        vec3_exports.transformMat4(endPointY, [0, 1, 0], objectToScreen);
        const endPointZ = vec3_exports.create();
        vec3_exports.transformMat4(endPointZ, [0, 0, 1], objectToScreen);
        if (this.mouseInCanvas) {
          const xDistance = vec2_exports.distance(
            this.mousePosition,
            vec2_exports.fromValues(endPointX[0], endPointX[1])
          );
          const yDistance = vec2_exports.distance(
            this.mousePosition,
            vec2_exports.fromValues(endPointY[0], endPointY[1])
          );
          const zDistance = vec2_exports.distance(
            this.mousePosition,
            vec2_exports.fromValues(endPointZ[0], endPointZ[1])
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
      vec2_exports.set(this.mouseDelta, 0, 0);
    }
    moveAxis(axisEndPoint, startPoint, axisIndex) {
      var _a;
      const axisDir = vec2_exports.create();
      vec2_exports.sub(
        axisDir,
        vec2_exports.fromValues(axisEndPoint[0], axisEndPoint[1]),
        vec2_exports.fromValues(startPoint[0], startPoint[1])
      );
      let axisMove = vec2_exports.dot(
        axisDir,
        vec2_exports.fromValues(this.mouseDelta[0], this.mouseDelta[1])
      );
      axisMove = axisMove / Math.pow(vec2_exports.length(axisDir), 2);
      if (_EditorViewPort3DSystem.inspectTransform) {
        _EditorViewPort3DSystem.inspectTransform.position.value[axisIndex] += axisMove;
        (_a = _EditorViewPort3DSystem.inspectEntity) == null ? void 0 : _a.getMutableComponent(
          TransformData3D
        );
      }
    }
    drawAxis(objectToScreen) {
      const startPoint = vec3_exports.create();
      vec3_exports.transformMat4(startPoint, [0, 0, 0], objectToScreen);
      const endPointX = vec3_exports.create();
      vec3_exports.transformMat4(endPointX, [1, 0, 0], objectToScreen);
      const endPointY = vec3_exports.create();
      vec3_exports.transformMat4(endPointY, [0, 1, 0], objectToScreen);
      const endPointZ = vec3_exports.create();
      vec3_exports.transformMat4(endPointZ, [0, 0, 1], objectToScreen);
      this.drawLine(startPoint, endPointX, "red", 1);
      this.drawLine(startPoint, endPointY, "green", 1);
      this.drawLine(startPoint, endPointZ, "blue", 1);
    }
    getMousePos(event) {
      const rect = this.mainCanvas.getBoundingClientRect();
      return vec2_exports.fromValues(event.clientX - rect.left, event.clientY - rect.top);
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
          component.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component2) => {
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
            const data2 = (_a3 = e2.target) == null ? void 0 : _a3.result;
            if (data2) {
              const entityData = JSON.parse(data2);
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
            const data2 = (_a3 = e2.target) == null ? void 0 : _a3.result;
            if (data2) {
              worldData = JSON.parse(data2);
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
      const value2 = e.target.value;
      switch (value2) {
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
})();
//# sourceMappingURL=editor.js.map
