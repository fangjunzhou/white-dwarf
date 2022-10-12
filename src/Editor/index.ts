import { mainInit } from "../Core";
import { editorRenderContext } from "./EditorContext";
import { editorInitialization } from "./EditorInitialization";

const main = () => {
  console.log("Editor Started");

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
