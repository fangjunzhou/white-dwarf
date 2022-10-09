import { mainWorld } from "../Core";
import { locomotionComponentRegister } from "../Core/Locomotion/LocomotionComponentRegister";
import { renderComponentRegister } from "../Core/Render/RenderComponentRegister";
import { RenderSystemRegister } from "../Core/Render/RenderSystemRegister";
import { CameraTag } from "../Core/Render/TagComponent/CameraTag";
import { MainCameraTag } from "../Core/Render/TagComponent/MainCameraTag";
import { editorRenderContext, editorUIContext } from "./EditorContext";

export const editorInitialization = () => {
  editorRenderContext.mainCanvas = document.getElementById(
    "mainCanvas"
  ) as HTMLCanvasElement;
  editorUIContext.entityLists = document.getElementsByClassName(
    "entityList"
  ) as HTMLCollectionOf<HTMLDivElement>;

  // Register Locomotion Components.
  locomotionComponentRegister(mainWorld);

  // Register Render Components.
  renderComponentRegister(mainWorld);
  // Register Render Systems.
  new RenderSystemRegister(editorRenderContext.mainCanvas).register(mainWorld);

  // Setup scene camera.
  setupSceneCamera();
};

const setupSceneCamera = () => {
  // Add a editor scene camera.
  editorRenderContext.mainCamera = mainWorld.createEntity("EditorSceneCamera");
  editorRenderContext.mainCamera
    .addComponent(CameraTag)
    .addComponent(MainCameraTag);
};
