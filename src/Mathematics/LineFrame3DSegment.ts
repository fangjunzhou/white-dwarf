import { cloneClonable, copyCopyable, createType } from "ecsy-wd";
import { Vector3, Vector3CustomEditor } from "./Vector3";

export class LineFrame3DSegment {
  public p0: Vector3;
  public p1: Vector3;

  constructor(p0: Vector3, p1: Vector3) {
    this.p0 = p0;
    this.p1 = p1;
  }

  set(p0: Vector3, p1: Vector3) {
    this.p0 = p0;
    this.p1 = p1;
  }

  copy(h: LineFrame3DSegment): LineFrame3DSegment {
    this.p0 = h.p0.clone();
    this.p1 = h.p1.clone();
    return this;
  }

  clone(): LineFrame3DSegment {
    return new LineFrame3DSegment(this.p0.clone(), this.p1.clone());
  }
}

export const LineFrame3DSegmentType = createType({
  name: "LineFrame3DSegment",
  default: new LineFrame3DSegment(new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
  copy: copyCopyable<LineFrame3DSegment>,
  clone: cloneClonable<LineFrame3DSegment>,
});

export const LineFrame3DSegmentEditor = (
  segment: LineFrame3DSegment,
  onChange: (segment: LineFrame3DSegment) => void
): HTMLElement => {
  const el = document.createElement("div");
  const p0 = document.createElement("div");
  const p1 = document.createElement("div");
  el.appendChild(p0);
  el.appendChild(p1);
  p0.innerText = "p0";
  p1.innerText = "p1";
  p0.appendChild(
    Vector3CustomEditor(segment.p0, (v) => {
      segment.p0 = v;
      onChange(segment);
    })[0]
  );
  p1.appendChild(
    Vector3CustomEditor(segment.p1, (v) => {
      segment.p1 = v;
      onChange(segment);
    })[0]
  );
  return el;
};
