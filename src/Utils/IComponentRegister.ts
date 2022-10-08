import { World } from "ecsy/World";

export interface IComponentRegister {
  /**
   * Register all components to the world.
   *
   * @param {World} world
   * @memberof IComponentRegister
   */
  (world: World): void;
}
