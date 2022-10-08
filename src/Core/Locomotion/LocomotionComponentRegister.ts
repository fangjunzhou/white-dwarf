import { World } from "ecsy/World";
import { IComponentRegister } from "../../Utils/IComponentRegister";
import { TransformData2D } from "./DataComponent/TransformData2D";

export const LocomotionComponentRegister: IComponentRegister = (
  world: World
) => {
  world.registerComponent(TransformData2D);
};
