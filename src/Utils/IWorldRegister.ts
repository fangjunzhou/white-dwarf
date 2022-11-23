import { World } from "ecsy";

export interface IWorldRegister {
  /**
   * Register all components to the world.
   *
   * @param {World} world
   * @memberof IComponentRegister
   */
  (world: World): void;
}
