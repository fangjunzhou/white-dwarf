import { cloneClonable, copyCopyable, createType } from "ecsy/Types";
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
  constructor(x: number, y: number) {
    this.value = vec2.fromValues(x, y);
  }

  set(x: number, y: number) {
    this.value = vec2.fromValues(x, y);
  }

  copy(v: Vector2): Vector2 {
    this.value = vec2.copy(this.value, v.value);
    return this;
  }

  clone(): Vector2 {
    return new Vector2(this.value[0], this.value[1]);
  }
}

export const Vector2Type = createType({
  name: "Vector2",
  default: new Vector2(0, 0),
  copy: copyCopyable<Vector2>,
  clone: cloneClonable<Vector2>,
});
