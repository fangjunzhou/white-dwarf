import { World } from "ecsy/World";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { editorRenderContext } from "./EditorContext";
import { CamDragSystem } from "../Utils/System/CamDragSystem";
import { EditorInspectorSystem } from "./System/EditorInspectorSystem";

export class EditorSystemRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(CamDragSystem, {
      mainCanvas: this.mainCanvas,
    });

    world.registerSystem(EditorInspectorSystem);
  };
}
