import { mainWorld } from ".";

import { IComponent } from "./ComponentRegistry";
import { coreRenderContext } from "./Context/RenderContext";
import { ISystemContext } from "./Context/SystemContext";
import { RenderSystemRegister } from "./Render/RenderSystemRegister";

export const coreSetup = () => {
  if (!coreRenderContext.mainCanvas) {
    throw new Error("Main canvas is not ready.");
  }

  // Register all components.
  let componentConstructors = IComponent.getImplementations();
  for (let i = 0; i < componentConstructors.length; i++) {
    mainWorld.registerComponent(componentConstructors[i]);
  }

  // Call core setup callback.
  systemContext.coreSetup();
};

export const systemContext: ISystemContext = {
  coreSetup: () => {},
  coreStart: () => {},
};
