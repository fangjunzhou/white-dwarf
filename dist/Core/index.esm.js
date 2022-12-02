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
import { World } from "ecsy-wd";

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
var releaseInit = () => __async(void 0, null, function* () {
  coreSetup();
  yield systemContext.coreStart({});
  mainInit();
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
export {
  mainInit,
  mainWorld,
  physicsWorld,
  releaseInit,
  resetWorld,
  timeContext
};
//# sourceMappingURL=index.esm.js.map
