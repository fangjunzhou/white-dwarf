import { World } from "ecsy/World";
import { IWorldRegister } from "../Utils/IWorldRegister";
import { EditorSceneCamTag } from "./TagComponent/EditorSceneCamTag";

export const editorComponentRegister: IWorldRegister = (world: World) => {
  // Register Editor Tag Components.
  world.registerComponent(EditorSceneCamTag);
};
