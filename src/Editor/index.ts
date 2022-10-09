import { Entity } from "ecsy/Entity";
import { mainInit, mainWorld } from "../Core";
import { LocomotionComponentRegister } from "../Core/Locomotion/LocomotionComponentRegister";
import { RenderComponentRegister } from "../Core/Render/RenderComponentRegister";
import { RenderSystemRegister } from "../Core/Render/RenderSystemRegister";

let mainCanvas: HTMLCanvasElement;
let entityLists: HTMLCollectionOf<HTMLDivElement>;

const updateEntityList = (entities: Array<Entity>) => {
  // Traverse all entityLists.
  for (let i = 0; i < entityLists.length; i++) {
    const entityList = entityLists[i];
    // Remove all children.
    while (entityList.firstChild) {
      entityList.removeChild(entityList.firstChild);
    }
    // Add new children.
    for (let j = 0; j < entities.length; j++) {
      const entity = entities[j];
      const entityDiv = document.createElement("div");

      // Add entity name.
      const entityName = document.createElement("span");
      entityName.innerText = entity.name === "" ? "Entity" : entity.name;
      entityDiv.appendChild(entityName);

      // Add entity id.
      const entityId = document.createElement("span");
      entityId.innerText = entity.id.toString();
      entityDiv.appendChild(entityId);

      entityDiv.className = "entityListItem";
      entityList.appendChild(entityDiv);
      // TODO: Add select behavior.
    }
  }
};

const main = () => {
  console.log("Editor Started");

  mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
  entityLists = document.getElementsByClassName(
    "entityList"
  ) as HTMLCollectionOf<HTMLDivElement>;

  // Register Locomotion Components.
  LocomotionComponentRegister(mainWorld);

  // Register Render Components.
  RenderComponentRegister(mainWorld);
  // Register Render Systems.
  new RenderSystemRegister(mainCanvas).register(mainWorld);

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);

  // Add a test entity.
  for (let i = 0; i < 100; i++) {
    const testEntity = mainWorld.createEntity();
  }

  // White Dwarf Engine initialization.
  mainInit();

  // Resize .
  onResize();
};

const onResize = () => {
  // Resize mainCanvas.
  if (mainCanvas) {
    mainCanvas.width = mainCanvas.clientWidth;
    mainCanvas.height = mainCanvas.clientHeight;
  }
};

window.onload = main;
window.onresize = onResize;
