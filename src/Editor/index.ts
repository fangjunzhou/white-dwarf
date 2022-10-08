import { mainInit, mainWorld } from "../Core";
import { LocomotionComponentRegister } from "../Core/Locomotion/LocomotionComponentRegister";
import { RenderComponentRegister } from "../Core/Render/RenderComponentRegister";

const main = () => {
  console.log("Editor Started");

  // Register Locomotion Components.
  LocomotionComponentRegister(mainWorld);

  // Register Render Components.
  RenderComponentRegister(mainWorld);

  // White Dwarf Engine initialization.
  mainInit();
};

window.onload = main;
