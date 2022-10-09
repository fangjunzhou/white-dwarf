import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas2DImageRenderer } from "./System/BuildInRenderers/Canvas2DImageRenderer";

export class RenderSystemRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(Canvas2DImageRenderer, {
      mainCanvas: this.mainCanvas,
    });
  };
}
