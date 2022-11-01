import { World } from "ecsy/World";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { CamDragSystem as CamDrag2DSystem } from "../Utils/System/CamDragSystem";
import { EditorHermiteCurveInspector as EditorHermiteCurve2DInspector } from "./System/EditorHermiteCurveInspector";
import { EditorViewPort2DSystem } from "./System/EditorViewPort2DSystems";

export class EditorSystem2DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(CamDrag2DSystem, {
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
