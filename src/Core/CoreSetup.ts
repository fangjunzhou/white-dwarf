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

  // Register Render Systems.
  new RenderSystemRegister(coreRenderContext.mainCanvas).register(mainWorld);

  // TODO: Register more systems here.

  // Register all user defined systems.
  systemContext.userSetup();
};

export const systemContext: ISystemContext = {
  userSetup: () => {},
};
