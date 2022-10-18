import { World } from "ecsy/World";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { CamDragSystem } from "../Utils/System/CamDragSystem";
import { EditorHermiteCurveInspector } from "./System/EditorHermiteCurveInspector";
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

    world.registerSystem(EditorInspectorSystem, {
      mainCanvas: this.mainCanvas,
    });

    world.registerSystem(EditorHermiteCurveInspector, {
      mainCanvas: this.mainCanvas,
    });
  };
}
