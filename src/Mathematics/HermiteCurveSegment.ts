import { cloneClonable, copyCopyable, createType } from "ecsy/Types";
import { Vector2 } from "./Vector2";

/**
 * Get the u*B value of a hermite curve.
 *
 * @param u the parametric value passed in for base matrix.
 * @returns a 4x1 matrix as u*B.
 */
const hermiteBaseFunc = (u: number): Array<number> => {
  const u0 = 2 * u * u * u - 3 * u * u + 1;
  const u1 = u * u * u - 2 * u * u + u;
  const u2 = -2 * u * u * u + 3 * u * u;
  const u3 = u * u * u - u * u;
  return [u0, u1, u2, u3];
};

export const hermiteCurve2DSegmentEvaluate = (
  segment: HermiteCurve2DSegment,
  u: number
): Vector2 => {
  const uB = hermiteBaseFunc(u);
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
