import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { Canvas2DRenderer } from "./System/Canvas2DRenderer";

export class RenderSystemRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(Canvas2DRenderer, {
      mainCanvas: this.mainCanvas,
    });
  };
}
