import { World } from "ecsy/World";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { Cam3DDragSystem } from "../Utils/System/Cam3DDragSystem";
import { EditorViewPort3DSystem } from "./System/EditorViewPort3DSystem";

export class EditorSystem3DRegister {
  mainCanvas: HTMLCanvasElement;

  constructor(mainCanvas: HTMLCanvasElement) {
    this.mainCanvas = mainCanvas;
  }

  register: IWorldRegister = (world: World) => {
    world
      .registerSystem(Cam3DDragSystem, {
        mainCanvas: this.mainCanvas,
      })
      .registerSystem(EditorViewPort3DSystem, {
        mainCanvas: this.mainCanvas,
      });
  };
}
