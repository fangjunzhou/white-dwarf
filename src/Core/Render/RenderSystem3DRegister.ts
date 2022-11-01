import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { ClearCanvasSystem } from "./System/ClearCanvasSystem";

export class RenderSystem3DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(ClearCanvasSystem, {
      mainCanvas: this.mainCanvas,
      priority: -100,
    });
  };
}
