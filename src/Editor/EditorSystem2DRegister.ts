import { World } from "ecsy-wd";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { Cam2DDragSystem } from "../Utils/System/Cam2DDragSystem";
import { EditorHermiteCurveInspector as EditorHermiteCurve2DInspector } from "./System/EditorHermiteCurveInspector";
import { EditorViewPort2DSystem } from "./System/EditorViewPort2DSystems";

export class EditorSystem2DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(Cam2DDragSystem, {
      mainCanvas: this.mainCanvas,
    });

    world.registerSystem(EditorViewPort2DSystem, {
      mainCanvas: this.mainCanvas,
    });

    world.registerSystem(EditorHermiteCurve2DInspector, {
      mainCanvas: this.mainCanvas,
    });
  };
}
