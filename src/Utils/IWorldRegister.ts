import { World } from "ecsy/World";

export interface IWorldRegister {
  /**
   * Register all components to the world.
   *
   * @param {World} world
   * @memberof IComponentRegister
   */
  (world: World): void;
}
