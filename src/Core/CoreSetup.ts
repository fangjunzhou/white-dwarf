import { mainWorld } from ".";
import { editorRenderContext } from "../Editor/EditorContext";
import { locomotionComponentRegister } from "./Locomotion/LocomotionComponentRegister";
import { renderComponentRegister } from "./Render/RenderComponentRegister";
import { RenderSystemRegister } from "./Render/RenderSystemRegister";

export const coreSetup = () => {
  if (!editorRenderContext.mainCanvas) {
    throw new Error("Main canvas is not ready.");
  }

  // Register Locomotion Components.
  locomotionComponentRegister(mainWorld);

  // Register Render Components.
  renderComponentRegister(mainWorld);
  // Register Render Systems.
  new RenderSystemRegister(editorRenderContext.mainCanvas).register(mainWorld);
};
