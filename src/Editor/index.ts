import fileDownload from "js-file-download";
import { mainInit, mainWorld, resetWorld } from "../Core";
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
import {
  editorUIContext,
  editorEventContext,
  EditorControl,
  editorControlContext,
} from "./EditorContext";
import { updateEntityList, addNewEntity } from "./EditorEntityListManager";
import { updateEntityInspector } from "./System/EditorInspectorSystem";
import { EditorViewPort2DSystem } from "./System/EditorViewPort2DSystems";

let platState = false;
let worldData: IWorldObject | null = null;

export const editorInit = () => {
  console.log("Editor Started");

  // Editor initialization.

  // TODO: Change the UI setup process.

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

  editorUIContext.editorModeDropdown = document.getElementById(
    "editorMode"
  ) as HTMLSelectElement;

  // Disable right click for main canvas.
  coreRenderContext.mainCanvas.oncontextmenu = () => false;

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);
  // Register entity selected event.
  editorEventContext.onEntitySelected.push(updateEntityInspector);

  // Check if worldData is available in local storage.
  const worldDataString = window.localStorage.getItem("worldData");
  if (worldDataString) {
    worldData = JSON.parse(worldDataString);
  }

  // Core setup.
  coreSetup();

  // Editor start.
  systemContext.editorStart();

  // If there's world data, deserialize it.
  if (worldData) {
    WorldSerializer.deserializeWorld(mainWorld, worldData);
  }

  // Setup play button.
  setupPlayButton();

  // Setup create entity button.
  setupCreateEntityButton();

  // Setup deserialize entity input.
  setupDeserializeEntityInput();

  // Setup save and load world button.
  setupSaveLoadWorldButton();

  // Setup editor mode dropdown.
  setupEditorModeDropdown();

  // Setup editor mode keybinds.
  setupEditorModeKeybinds();

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
            // Save the world data to localstorage.
            window.localStorage.setItem("worldData", JSON.stringify(worldData));

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

const setupEditorModeDropdown = () => {
  // Add listener to editor mode dropdown.
  editorUIContext.editorModeDropdown?.addEventListener("change", (e) => {
    const value = (e.target as HTMLSelectElement).value;
    switch (value) {
      case "view":
        editorControlContext.setControlMode(EditorControl.View);
        break;

      case "move":
        editorControlContext.setControlMode(EditorControl.Move);
        break;

      case "rotate":
        editorControlContext.setControlMode(EditorControl.Rotate);
        break;

      default:
        break;
    }
  });

  // Add listener to editor mode dropdown.
  editorControlContext.ee.on(
    "controlModeChanged",
    (controlMode: EditorControl) => {
      if (!editorUIContext.editorModeDropdown) {
        return;
      }
      switch (controlMode) {
        case EditorControl.View:
          editorUIContext.editorModeDropdown.value = "view";
          break;

        case EditorControl.Move:
          editorUIContext.editorModeDropdown.value = "move";
          break;

        case EditorControl.Rotate:
          editorUIContext.editorModeDropdown.value = "rotate";
          break;

        default:
          break;
      }
    }
  );
};

const setupEditorModeKeybinds = () => {
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyQ":
        editorControlContext.setControlMode(EditorControl.View);
        break;

      case "KeyW":
        editorControlContext.setControlMode(EditorControl.Move);
        break;

      case "KeyE":
        editorControlContext.setControlMode(EditorControl.Rotate);
        break;

      default:
        break;
    }
  });
};

const editorPlay = async () => {
  // Serialize the world.
  worldData = WorldSerializer.serializeWorld(mainWorld);

  // Reset the main world.
  resetWorld();

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);

  // Call release init.
  // Setup core.
  coreSetup();

  await systemContext.coreStart({
    worldObject: worldData,
  });

  // Start white dwarf.
  // mainInit();
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

  // If there's world data, deserialize it.
  if (worldData) {
    WorldSerializer.deserializeWorld(mainWorld, worldData);
  }

  // White Dwarf Engine initialization.
  // mainInit();
};

window.onload = editorInit;
window.onresize = onResize;
