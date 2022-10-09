import { mainInit, mainWorld } from "../Core";
import { EditorRenderContext, EditorUIContext } from "./EditorContext";
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
  if (EditorRenderContext.mainCanvas) {
    EditorRenderContext.mainCanvas.width =
      EditorRenderContext.mainCanvas.clientWidth;
    EditorRenderContext.mainCanvas.height =
      EditorRenderContext.mainCanvas.clientHeight;
  }
};

window.onload = main;
window.onresize = onResize;
