import { World } from "ecsy-wd";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas3DConstraintRenderer } from "./System/BuildInRenderers/Canvas3DConstraintRenderer";
import { Canvas3DLineFrameRenderer } from "./System/BuildInRenderers/Canvas3DLineFrameRenderer";
import { ClearCanvasWebGLSystem } from "./System/ClearCanvasWebGLSystem";

export class RenderSystemWebGLRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(ClearCanvasWebGLSystem, {
      mainCanvas: this.mainCanvas,
      priority: -100,
    });
  };
}
