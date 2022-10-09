import { mainInit, mainWorld } from "../Core";
import { editorRenderContext, editorUIContext } from "./EditorContext";
import { editorInitialization } from "./EditorInitialization";
import { updateEntityList } from "./EditorUIHandler";

const main = () => {
  console.log("Editor Started");

  // Register main world entity change.
  mainWorld.onEntityChanged.push(updateEntityList);

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
