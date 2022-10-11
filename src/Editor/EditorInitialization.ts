import { mainWorld, resetWorld } from "../Core";
import { coreSetup } from "../Core/CoreSetup";
import { TransformData2D } from "../Core/Locomotion/DataComponent/TransformData2D";
import {
  BackgroundType,
  CameraData2D,
} from "../Core/Render/DataComponent/CameraData2D";
import { ImageRenderData2D } from "../Core/Render/DataComponent/ImageRenderData2D";
import { CameraTag } from "../Core/Render/TagComponent/CameraTag";
import { MainCameraTag } from "../Core/Render/TagComponent/MainCameraTag";
import { Vector2 } from "../Mathematics/Vector2";
import {
  editorEventContext,
  editorRenderContext,
  editorUIContext,
} from "./EditorContext";
import { addNewEntity, updateEntityList } from "./EditorEntityListManager";
import { EditorSystemRegister } from "./EditorSystemRegister";
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
  editorUIContext.playButton = document.getElementById(
    "playButton"
  ) as HTMLButtonElement;

  editorUIContext.entityNameInput = document.getElementById(
    "entityName"
  ) as HTMLInputElement;
  editorUIContext.createEntityButton = document.getElementById(
    "createEntityButton"
  ) as HTMLButtonElement;

  // Disable right click for main canvas.
  editorRenderContext.mainCanvas.oncontextmenu = () => false;

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);
  // Register entity selected event.
  editorEventContext.onEntitySelected.push(
    EditorInspectorSystem.updateEntityInspector
  );

  // Core setup.
  coreSetup();

  // Register Editor System.
  new EditorSystemRegister(editorRenderContext.mainCanvas).register(mainWorld);

  // Setup play button.
  setupPlayButton();

  // Setup create entity button.
  setupCreateEntityButton();
};

export const setupEditorSceneCamera = () => {
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

const setupPlayButton = () => {
  editorUIContext.playButton?.addEventListener("click", () => {
    // Create a new world.
    resetWorld();

    // Register main world entity change.
    mainWorld.onEntityChanged.push(updateEntityList);
    // Register entity selected event.
    editorEventContext.onEntitySelected.push(
      EditorInspectorSystem.updateEntityInspector
    );
    updateEntityList([]);
    EditorInspectorSystem.updateEntityInspector(null);

    // Setup core.
    coreSetup();
  });
};

const setupCreateEntityButton = () => {
  editorUIContext.createEntityButton?.addEventListener("click", () => {
    if (editorUIContext.entityNameInput) {
      addNewEntity(editorUIContext.entityNameInput.value);
      editorUIContext.entityNameInput.value = "";
    } else {
      addNewEntity();
    }
  });
};
