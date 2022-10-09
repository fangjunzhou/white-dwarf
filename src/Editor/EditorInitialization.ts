import { mainWorld } from "../Core";
import { LocomotionComponentRegister } from "../Core/Locomotion/LocomotionComponentRegister";
import { RenderComponentRegister } from "../Core/Render/RenderComponentRegister";
import { RenderSystemRegister } from "../Core/Render/RenderSystemRegister";
import { CameraTag } from "../Core/Render/TagComponent/CameraTag";
import { MainCameraTag } from "../Core/Render/TagComponent/MainCameraTag";
import { EditorRenderContext, EditorUIContext } from "./EditorContext";

export const editorInitialization = () => {
  EditorRenderContext.mainCanvas = document.getElementById(
    "mainCanvas"
  ) as HTMLCanvasElement;
  EditorUIContext.entityLists = document.getElementsByClassName(
    "entityList"
  ) as HTMLCollectionOf<HTMLDivElement>;

  // Register Locomotion Components.
  LocomotionComponentRegister(mainWorld);

  // Register Render Components.
  RenderComponentRegister(mainWorld);
  // Register Render Systems.
  new RenderSystemRegister(EditorRenderContext.mainCanvas).register(mainWorld);

  // Add a editor scene camera.
  EditorRenderContext.mainCamera = mainWorld.createEntity("EditorSceneCamera");
  EditorRenderContext.mainCamera
    .addComponent(CameraTag)
    .addComponent(MainCameraTag);
};
