declare module 'white-dwarf/Context/TimeContext' {
  export interface ITimeContext {
      startTime: number;
      currentTime: number;
      deltaTime: number;
      timeScale: number;
      fixedTimeStep: number;
  }

}
declare module 'white-dwarf/index' {
  import { World } from "ecsy/World";
  import { ITimeContext } from "white-dwarf/Context/TimeContext";
  export const mainWorld: World<import("../submodules/ecsy/src/index")._Entity>;
  export const physicsWorld: World<import("../submodules/ecsy/src/index")._Entity>;
  export const timeContext: ITimeContext;

}
declare module 'white-dwarf' {
  import main = require('white-dwarf/src/Core/index');
  export = main;
}