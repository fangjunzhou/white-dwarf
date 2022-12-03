import { World } from "ecsy-wd";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { Cam3DDragSystem } from "../Utils/System/Cam3DDragSystem";
import { EditorViewPort3DSystem } from "./System/EditorViewPort3DSystem";

export class EditorSystemWebGLRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(Cam3DDragSystem, {
      mainCanvas: this.mainCanvas,
    });
  };
}
