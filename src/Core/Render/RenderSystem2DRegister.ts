import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas2DImageLoader } from "./System/BuildInRenderers/Canvas2DImageLoader";
import { Canvas2DImageRenderer } from "./System/BuildInRenderers/Canvas2DImageRenderer";
import { ClearCanvasSystem } from "./System/ClearCanvasSystem";

export class RenderSystem2DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(ClearCanvasSystem, {
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
