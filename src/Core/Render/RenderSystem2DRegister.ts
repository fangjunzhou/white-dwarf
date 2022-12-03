import { World } from "ecsy-wd";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas2DImageLoader } from "./System/BuildInRenderers/Canvas2DImageLoader";
import { Canvas2DImageRenderer } from "./System/BuildInRenderers/Canvas2DImageRenderer";
import { ClearCanvas2DSystem } from "./System/ClearCanvas2DSystem";

export class RenderSystem2DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(ClearCanvas2DSystem, {
      mainCanvas: this.mainCanvas,
      priority: -100,
    });

    world
      .registerSystem(Canvas2DImageLoader)
      .registerSystem(Canvas2DImageRenderer, {
        mainCanvas: this.mainCanvas,
      });
  };
}
