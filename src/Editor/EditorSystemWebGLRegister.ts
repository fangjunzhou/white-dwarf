import { World } from "ecsy-wd";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { Cam3DDragSystem } from "../Utils/System/Cam3DDragSystem";
import { EditorViewPort3DSystem } from "./System/EditorViewPort3DSystem";
import { EditorViewPortWebGLTransformSystem } from "./System/EditorViewPortWebGlSystems/EditorViewPortWebGLTransformSystem";

export class EditorSystemWebGLRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world.registerSystem(Cam3DDragSystem, {
      mainCanvas: this.mainCanvas,
    });

    world.registerSystem(EditorViewPortWebGLTransformSystem, {
      mainCanvas: this.mainCanvas,
    });
  };
}
