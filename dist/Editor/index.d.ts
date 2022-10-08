declare module 'white-dwarf/Core/Context/TimeContext' {
  export interface ITimeContext {
      startTime: number;
      currentTime: number;
      deltaTime: number;
      timeScale: number;
      fixedTimeStep: number;
  }

}
declare module 'white-dwarf/Core/DataComponent/TransformData2D' {
  import { Component, ComponentSchema } from "ecsy/Component";
  import { Vector2 } from "white-dwarf/Mathematics/Vector2";
  export class TransformData2D extends Component<TransformData2D> {
      static schema: ComponentSchema;
      position: Vector2;
  }

}
declare module 'white-dwarf/Core/index' {
  import { World } from "ecsy/World";
  import { ITimeContext } from "white-dwarf/Core/Context/TimeContext";
  export const mainWorld: World<import("submodules/ecsy/src/index")._Entity>;
  export const physicsWorld: World<import("submodules/ecsy/src/index")._Entity>;
  export const timeContext: ITimeContext;
  export const mainInit: () => void;

}
declare module 'white-dwarf/Editor/index' {
  export {};

}
declare module 'white-dwarf/Mathematics/Vector2' {
  import { vec2 } from "gl-matrix";
  /**
   * Wrapper for glmatrix vec2.
   *
   * @export
   * @class Vector2
   */
  export class Vector2 {
      value: vec2;
      /**
       * Creates an instance of Vector2.
       * @param {number} x the x component of the vector.
       * @param {number} y the y component of the vector.
       * @memberof Vector2
       */
      constructor(x: number, y: number);
      set(x: number, y: number): void;
      copy(v: Vector2): Vector2;
      clone(): Vector2;
  }
  export const Vector2Type: import("ecsy/Types").PropType<Vector2, Vector2>;

}
declare module 'white-dwarf' {
  import main = require('white-dwarf/src/Editor/index');
  export = main;
}