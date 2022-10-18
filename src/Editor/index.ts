import fileDownload from "js-file-download";
import { mainInit, mainWorld, releaseInit, resetWorld } from "../Core";
import { coreRenderContext } from "../Core/Context/RenderContext";
import { coreSetup, systemContext } from "../Core/CoreSetup";
import {
  EntitySerializer,
  IEntityObject,
} from "../Core/Serialization/EntitySerializer";
import {
  IWorldObject,
  WorldSerializer,
} from "../Core/Serialization/WorldSerializer";
import { editorUIContext, editorEventContext } from "./EditorContext";
import { updateEntityList, addNewEntity } from "./EditorEntityListManager";
import { EditorSystemRegister } from "./EditorSystemRegister";
import { EditorCamTagAppendSystem } from "./System/EditorCamTagAppendSystem";
import { EditorInspectorSystem } from "./System/EditorInspectorSystem";

let platState = false;
let worldData: IWorldObject | null = null;

export const editorInit = () => {
  console.log("Editor Started");

  // Editor initialization.

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
  editorUIContext.deserializeEntityButton = document.getElementById(
    "fileInput"
  ) as HTMLInputElement;

  editorUIContext.saveWorldButton = document.getElementById(
    "saveWorldButton"
  ) as HTMLButtonElement;
  editorUIContext.loadWorldButton = document.getElementById(
    "loadWorldButton"
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

  // Editor start.
  systemContext.editorStart();

  // Register Editor System.
  new EditorSystemRegister(coreRenderContext.mainCanvas).register(mainWorld);

  // Setup editor scene camera.
  try {
    mainWorld.registerSystem(EditorCamTagAppendSystem);
  } catch (error) {
    console.error(error);
  }

  // Setup play button.
  setupPlayButton();

  // Setup create entity button.
  setupCreateEntityButton();

  // Setup deserialize entity input.
  setupDeserializeEntityInput();

  // Setup save and load world button.
  setupSaveLoadWorldButton();

  // White Dwarf Engine initialization.
  mainInit();

  // Resize .
  onResize();
};
const onResize = () => {
  // Resize mainCanvas.
  if (coreRenderContext.mainCanvas) {
    coreRenderContext.mainCanvas.width =
      coreRenderContext.mainCanvas.clientWidth;
    coreRenderContext.mainCanvas.height =
      coreRenderContext.mainCanvas.clientHeight;
  }
};

const setupPlayButton = () => {
  editorUIContext.playButton?.addEventListener("click", async () => {
    if (!platState) {
      if (editorUIContext.playButton) {
        editorUIContext.playButton.innerHTML = "Stop";
      }

      await editorPlay();

      platState = true;
    } else {
      if (editorUIContext.playButton) {
        editorUIContext.playButton.innerHTML = "Play";
      }

      editorStop();

      platState = false;
    }
  });
};

const setupCreateEntityButton = () => {
  editorUIContext.createEntityButton?.addEventListener("click", () => {
    // Check if there's a target deserialize entity input.
    if (editorUIContext.entityNameInput) {
      addNewEntity(editorUIContext.entityNameInput.value);
      editorUIContext.entityNameInput.value = "";
    } else {
      addNewEntity();
    }
  });
};

const setupDeserializeEntityInput = () => {
  editorUIContext.deserializeEntityButton?.addEventListener("click", () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      // Read the entity data.
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            const entityData = JSON.parse(data as string) as IEntityObject;
            EntitySerializer.deserializeEntity(mainWorld, entityData);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });
};

const setupSaveLoadWorldButton = () => {
  editorUIContext.saveWorldButton?.addEventListener("click", () => {
    const worldObject = WorldSerializer.serializeWorld(mainWorld);
    fileDownload(JSON.stringify(worldObject, null, 2), "world.json");
  });

  editorUIContext.loadWorldButton?.addEventListener("click", () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      // Read the entity data.
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            worldData = JSON.parse(data as string) as IWorldObject;

            // Clear the world.
            editorStop();
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });
};

const editorPlay = async () => {
  // Serialize the world.
  const worldObject = WorldSerializer.serializeWorld(mainWorld);

  // Reset the main world.
  resetWorld();

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);

  // Call release init.
  // Setup core.
  coreSetup();

  await systemContext.coreStart({
    worldObject: worldObject,
  });

  // Start white dwarf.
  mainInit();
};

const editorStop = () => {
  // Reset the main world.
  resetWorld();

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);

  // Call editor init.// Core setup.
  coreSetup();

  // Editor start.
  systemContext.editorStart();

  // Register Editor System.
  if (coreRenderContext.mainCanvas) {
    new EditorSystemRegister(coreRenderContext.mainCanvas).register(mainWorld);
  }
  // Setup editor scene camera.
  try {
    mainWorld.registerSystem(EditorCamTagAppendSystem);
  } catch (error) {
    console.error(error);
  }

  // If there's world data, deserialize it.
  if (worldData) {
    WorldSerializer.deserializeWorld(mainWorld, worldData);
  }

  // White Dwarf Engine initialization.
  mainInit();
};

window.onload = editorInit;
window.onresize = onResize;
