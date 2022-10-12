import { mainInit } from "../Core";
import { coreRenderContext } from "../Core/Context/RenderContext";
import { editorInitialization } from "./EditorInitialization";

export const editorInit = () => {
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
  if (coreRenderContext.mainCanvas) {
    coreRenderContext.mainCanvas.width =
      coreRenderContext.mainCanvas.clientWidth;
    coreRenderContext.mainCanvas.height =
      coreRenderContext.mainCanvas.clientHeight;
  }
};

window.onload = editorInit;
window.onresize = onResize;
