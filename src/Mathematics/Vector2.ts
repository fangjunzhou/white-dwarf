import { cloneClonable, copyCopyable, createType } from "ecsy";
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
    vec2.set(this.value, x, y);
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

export const Vector2CustomEditor = (
  value: Vector2,
  onChange: (value: Vector2) => void
): [HTMLDivElement, (v: Vector2) => void] => {
  const vector2Div = document.createElement("div");
  vector2Div.style.display = "flex";
  vector2Div.style.flexDirection = "row";

  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  vector2Div.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  vector2Div.appendChild(xInput);

  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  vector2Div.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  vector2Div.appendChild(yInput);

  const update = () => {
    onChange(new Vector2(parseFloat(xInput.value), parseFloat(yInput.value)));
  };

  const setVector2 = (v: Vector2) => {
    // If the value is focused, don't update it.
    if (
      document.activeElement === xInput ||
      document.activeElement === yInput
    ) {
      return;
    }

    xInput.value = v.value[0].toString();
    yInput.value = v.value[1].toString();
  };

  xInput.onchange = update;
  yInput.onchange = update;

  return [vector2Div, setVector2];
};
