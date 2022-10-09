import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { TransformData2D } from "./DataComponent/TransformData2D";

export const locomotionComponentRegister: IWorldRegister = (world: World) => {
  world.registerComponent(TransformData2D);
};
