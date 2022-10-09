import { World } from "ecsy/World";
import { IWorldRegister } from "../../Utils/IWorldRegister";
import { CameraData2D } from "./DataComponent/CameraData2D";
import { CameraTag } from "./TagComponent/CameraTag";
import { MainCameraTag } from "./TagComponent/MainCameraTag";

export const renderComponentRegister: IWorldRegister = (world: World) => {
  // Register Data Components
  world.registerComponent(CameraData2D);

  // Register Tag Components
  world.registerComponent(CameraTag).registerComponent(MainCameraTag);
};
