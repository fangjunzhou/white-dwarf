import { mainWorld } from ".";
import { editorRenderContext } from "../Editor/EditorContext";
import { IComponent } from "./ComponentRegistry";
import { RenderSystemRegister } from "./Render/RenderSystemRegister";

export const coreSetup = () => {
  if (!editorRenderContext.mainCanvas) {
    throw new Error("Main canvas is not ready.");
  }

  // Register all components.
  let componentConstructors = IComponent.getImplementations();
  for (let i = 0; i < componentConstructors.length; i++) {
    mainWorld.registerComponent(componentConstructors[i]);
  }

  // Register Render Systems.
  new RenderSystemRegister(editorRenderContext.mainCanvas).register(mainWorld);
};
