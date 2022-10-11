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
import { CamDragSystem } from "./System/CamDragSystem";
import { EditorInspectorSystem } from "./System/EditorInspectorSystem";
import { EditorSceneCamTag } from "./TagComponent/EditorSceneCamTag";

export const editorInitialization = () => {
  editorRenderContext.mainCanvas = document.getElementById(
    "mainCanvas"
  ) as HTMLCanvasElement;
  editorUIContext.entityLists = document.getElementsByClassName(
    "entityList"
  ) as HTMLCollectionOf<HTMLDivElement>;
  editorUIContext.entityInspector = document.getElementsByClassName(
    "entityInspector"
  ) as HTMLCollectionOf<HTMLDivElement>;

  // Register Locomotion Components.
  locomotionComponentRegister(mainWorld);

  // Register Render Components.
  renderComponentRegister(mainWorld);
  // Register Render Systems.
  new RenderSystemRegister(editorRenderContext.mainCanvas).register(mainWorld);

  // Register Editor Tag Components.
  mainWorld.registerComponent(EditorSceneCamTag);
  // Register Editor System.
  mainWorld
    .registerSystem(CamDragSystem, {
      mainCanvas: editorRenderContext.mainCanvas,
    })
    .registerSystem(EditorInspectorSystem);

  // Setup scene camera.
  setupSceneCamera();
};

const setupSceneCamera = () => {
  // Add a editor scene camera.
  editorRenderContext.mainCamera = mainWorld.createEntity("EditorSceneCamera");
  editorRenderContext.mainCamera
    .addComponent(EditorSceneCamTag)
    .addComponent(CameraTag)
    .addComponent(MainCameraTag)
    .addComponent(CameraData2D, {
      backgroundType: BackgroundType.Color,
      backgroundColor: "#000000",
    })
    .addComponent(TransformData2D, {
      position: new Vector2(0, 0),
      scale: new Vector2(1, 1),
    });

  // TODO: Remove debug image here.
  // Add a image entity.
  for (let i = 0; i < 5; i++) {
    const imageEntity = mainWorld.createEntity();
    let imageTarget = new Image();
    imageTarget.src = "https://picsum.photos/200";
    // Random position.
    const position = new Vector2(
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500
    );
    imageEntity
      .addComponent(TransformData2D, {
        position: position,
        scale: new Vector2(1, 1),
      })
      .addComponent(ImageRenderData2D, {
        img: imageTarget,
        imageCenter: new Vector2(100, 100),
      });
  }
};
