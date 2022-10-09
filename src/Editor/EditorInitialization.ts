import { mainWorld } from "../Core";
import { TransformData2D } from "../Core/Locomotion/DataComponent/TransformData2D";
import { locomotionComponentRegister } from "../Core/Locomotion/LocomotionComponentRegister";
import {
  BackgroundType,
  CameraData2D,
} from "../Core/Render/DataComponent/CameraData2D";
import { ImageRenderData2D } from "../Core/Render/DataComponent/ImageRenderData2D";
import { renderComponentRegister } from "../Core/Render/RenderComponentRegister";
import { RenderSystemRegister } from "../Core/Render/RenderSystemRegister";
import { CameraTag } from "../Core/Render/TagComponent/CameraTag";
import { MainCameraTag } from "../Core/Render/TagComponent/MainCameraTag";
import { Vector2 } from "../Mathematics/Vector2";
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
    .addComponent(MainCameraTag)
    .addComponent(CameraData2D, {
      backgroundType: BackgroundType.Color,
      backgroundColor: "#000000",
    })
    .addComponent(TransformData2D, {
      position: new Vector2(200, 200),
      scale: new Vector2(1, 1),
    });

  // Add a image entity.
  const imageEntity = mainWorld.createEntity("ImageEntity");
  let imageTarget = new Image();
  imageTarget.src = "https://picsum.photos/200";
  imageEntity
    .addComponent(TransformData2D, {
      position: new Vector2(200, 200),
      scale: new Vector2(1, 1),
    })
    .addComponent(ImageRenderData2D, {
      img: imageTarget,
      imageCenter: new Vector2(100, 100),
    });
};
