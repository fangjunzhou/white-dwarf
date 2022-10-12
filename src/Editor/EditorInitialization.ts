import { mainWorld, resetWorld } from "../Core";
import { coreRenderContext } from "../Core/Context/RenderContext";
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
import { editorEventContext, editorUIContext } from "./EditorContext";
import { addNewEntity, updateEntityList } from "./EditorEntityListManager";
import { EditorSystemRegister } from "./EditorSystemRegister";
import { EditorInspectorSystem } from "./System/EditorInspectorSystem";
import { EditorSceneCamTag } from "./TagComponent/EditorSceneCamTag";

export const editorInitialization = () => {
  coreRenderContext.mainCanvas = document.getElementById(
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
  coreRenderContext.mainCanvas.oncontextmenu = () => false;

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);
  // Register entity selected event.
  editorEventContext.onEntitySelected.push(
    EditorInspectorSystem.updateEntityInspector
  );

  // Core setup.
  coreSetup();

  // Register Editor System.
  new EditorSystemRegister(coreRenderContext.mainCanvas).register(mainWorld);

  // Setup editor scene camera.
  setupEditorSceneCamera();

  // Setup play button.
  setupPlayButton();

  // Setup create entity button.
  setupCreateEntityButton();
};

export const setupEditorSceneCamera = () => {
  // Add a editor scene camera.
  coreRenderContext.mainCamera = mainWorld.createEntity("EditorSceneCamera");
  coreRenderContext.mainCamera
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
