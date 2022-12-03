import { World } from "ecsy-wd";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas3DConstraintRenderer } from "./System/BuildInRenderers/Canvas3DConstraintRenderer";
import { Canvas3DLineFrameRenderer } from "./System/BuildInRenderers/Canvas3DLineFrameRenderer";
import { Canvas3DRenderer } from "./System/Canvas3DRenderer";
import { ClearCanvas2DSystem } from "./System/ClearCanvas2DSystem";

export class RenderSystem3DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world
      .registerSystem(ClearCanvas2DSystem, {
        mainCanvas: this.mainCanvas,
        priority: -100,
      })
      .registerSystem(Canvas3DLineFrameRenderer, {
        mainCanvas: this.mainCanvas,
      })
      .registerSystem(Canvas3DConstraintRenderer, {
        mainCanvas: this.mainCanvas,
      });
  };
}
