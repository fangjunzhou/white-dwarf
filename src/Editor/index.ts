import { mainInit } from "../Core";
import { editorRenderContext } from "./EditorContext";
import {
  editorInitialization,
  setupEditorSceneCamera,
} from "./EditorInitialization";

const main = () => {
  console.log("Editor Started");

  // Disable right click menu.
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  // Call editor initialization.
  editorInitialization();

  // Setup scene camera.
  setupEditorSceneCamera();

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
