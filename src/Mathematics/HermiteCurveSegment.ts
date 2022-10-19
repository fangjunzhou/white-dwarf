import { cloneClonable, copyCopyable, createType } from "ecsy/Types";
import { Vector2, Vector2CustomEditor } from "./Vector2";

/**
 * Get the u*B value of a hermite curve.
 *
 * @param u the parametric value passed in for base matrix.
 * @returns a 4x1 matrix as u*B.
 */
export const hermiteBaseFunc = (u: number): Array<number> => {
  const u0 = 2 * u * u * u - 3 * u * u + 1;
  const u1 = u * u * u - 2 * u * u + u;
  const u2 = -2 * u * u * u + 3 * u * u;
  const u3 = u * u * u - u * u;
  return [u0, u1, u2, u3];
};

export const hermiteDerivativeBaseFunc = (u: number): Array<number> => {
  const u0 = 6 * u * u - 6 * u;
  const u1 = 3 * u * u - 4 * u + 1;
  const u2 = -6 * u * u + 6 * u;
  const u3 = 3 * u * u - 2 * u;
  return [u0, u1, u2, u3];
};

export const hermiteCurve2DSegmentEvaluate = (
  segment: HermiteCurve2DSegment,
  u: number,
  baseFunc: (u: number) => Array<number> = hermiteBaseFunc
): Vector2 => {
  const uB = baseFunc(u);
  const p = new Vector2(0, 0);
  p.value[0] =
    uB[0] * segment.p0.value[0] +
    uB[1] * segment.d0.value[0] +
    uB[2] * segment.p1.value[0] +
    uB[3] * segment.d1.value[0];
  p.value[1] =
    uB[0] * segment.p0.value[1] +
    uB[1] * segment.d0.value[1] +
    uB[2] * segment.p1.value[1] +
    uB[3] * segment.d1.value[1];
  return p;
};

export class HermiteCurve2DSegment {
  public p0: Vector2;
  public d0: Vector2;
  public p1: Vector2;
  public d1: Vector2;

  constructor(p0: Vector2, d0: Vector2, p1: Vector2, d1: Vector2) {
    this.p0 = p0;
    this.d0 = d0;
    this.p1 = p1;
    this.d1 = d1;
  }

  set(p0: Vector2, d0: Vector2, p1: Vector2, d1: Vector2) {
    this.p0 = p0;
    this.d0 = d0;
    this.p1 = p1;
    this.d1 = d1;
  }

  copy(h: HermiteCurve2DSegment): HermiteCurve2DSegment {
    this.p0 = h.p0.clone();
    this.d0 = h.d0.clone();
    this.p1 = h.p1.clone();
    this.d1 = h.d1.clone();
    return this;
  }

  clone(): HermiteCurve2DSegment {
    return new HermiteCurve2DSegment(
      this.p0.clone(),
      this.d0.clone(),
      this.p1.clone(),
      this.d1.clone()
    );
  }
}

export const HermiteCurveSegmentType = createType({
  name: "HermiteCurve2DSegment",

  default: new HermiteCurve2DSegment(
    new Vector2(0, 0),
    new Vector2(0, 0),
    new Vector2(0, 0),
    new Vector2(0, 0)
  ),
  copy: copyCopyable<HermiteCurve2DSegment>,
  clone: cloneClonable<HermiteCurve2DSegment>,
});

export const HermiteCurve2DSegmentCustomEditor = (
  value: HermiteCurve2DSegment,
  onChange: (value: HermiteCurve2DSegment) => void
): HTMLDivElement => {
  const container = document.createElement("div");

  const p0Div = document.createElement("div");
  p0Div.style.display = "flex";
  p0Div.style.flexDirection = "row";
  p0Div.appendChild(document.createTextNode("p0:"));
  const [p0] = Vector2CustomEditor(value.p0, (v) => {
    value.p0 = v;
    onChange(value);
  });
  p0.style.minWidth = "0px";
  p0.style.flexGrow = "1";
  p0Div.appendChild(p0);
  container.appendChild(p0Div);

  const d0Div = document.createElement("div");
  d0Div.style.display = "flex";
  d0Div.style.flexDirection = "row";
  d0Div.appendChild(document.createTextNode("d0:"));
  const [d0] = Vector2CustomEditor(value.d0, (v) => {
    value.d0 = v;
    onChange(value);
  });
  d0.style.minWidth = "0px";
  d0.style.flexGrow = "1";
  d0Div.appendChild(d0);
  container.appendChild(d0Div);

  const p1Div = document.createElement("div");
  p1Div.style.display = "flex";
  p1Div.style.flexDirection = "row";
  p1Div.appendChild(document.createTextNode("p1:"));
  const [p1] = Vector2CustomEditor(value.p1, (v) => {
    value.p1 = v;
    onChange(value);
  });
  p1.style.minWidth = "0px";
  p1.style.flexGrow = "1";
  p1Div.appendChild(p1);
  container.appendChild(p1Div);

  const d1Div = document.createElement("div");
  d1Div.style.display = "flex";
  d1Div.style.flexDirection = "row";
  d1Div.appendChild(document.createTextNode("d1:"));
  const [d1] = Vector2CustomEditor(value.d1, (v) => {
    value.d1 = v;
    onChange(value);
  });
  d1.style.minWidth = "0px";
  d1.style.flexGrow = "1";
  d1Div.appendChild(d1);
  container.appendChild(d1Div);

  return container;
};
