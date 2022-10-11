import { mainInit, mainWorld } from "../Core";
import { editorEventContext, editorRenderContext } from "./EditorContext";
import { editorInitialization } from "./EditorInitialization";
import { updateEntityInspector } from "./EditorInspectorManager";
import { updateEntityList } from "./EditorEntityListManager";

const main = () => {
  console.log("Editor Started");

  // Disable right click menu.
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);
  // Register entity selected event.
  editorEventContext.onEntitySelected.push(updateEntityInspector);

  // Call editor initialization.
  editorInitialization();

  // White Dwarf Engine initialization.
  mainInit();

  // Resize .
  onResize();
};

const onResize = () => {
  // Resize mainCanvas.
  if (editorRenderContext.mainCanvas) {
    editorRenderContext.mainCanvas.width =
      editorRenderContext.mainCanvas.clientWidth;
    editorRenderContext.mainCanvas.height =
      editorRenderContext.mainCanvas.clientHeight;
  }
};

window.onload = main;
window.onresize = onResize;
