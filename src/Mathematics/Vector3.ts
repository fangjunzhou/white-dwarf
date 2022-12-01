import { createType, copyCopyable, cloneClonable } from "ecsy-wd";
import { vec3 } from "gl-matrix";

export class Vector3 {
  value: vec3;

  constructor(x: number, y: number, z: number) {
    this.value = vec3.fromValues(x, y, z);
  }

  set(x: number, y: number, z: number) {
    vec3.set(this.value, x, y, z);
  }

  copy(v: Vector3): Vector3 {
    this.value = vec3.copy(this.value, v.value);
    return this;
  }

  clone(): Vector3 {
    return new Vector3(this.value[0], this.value[1], this.value[2]);
  }
}

export const Vector3Type = createType({
  name: "Vector3",
  default: new Vector3(0, 0, 0),
  copy: copyCopyable<Vector3>,
  clone: cloneClonable<Vector3>,
});

export const Vector3CustomEditor = (
  value: Vector3,
  onChange: (value: Vector3) => void
): [HTMLDivElement, (v: Vector3) => void] => {
  const vector3Div = document.createElement("div");
  vector3Div.style.display = "flex";
  vector3Div.style.flexDirection = "row";

  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  vector3Div.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  vector3Div.appendChild(xInput);

  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  vector3Div.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  vector3Div.appendChild(yInput);

  const zLabel = document.createElement("label");
  zLabel.innerText = "Z";
  vector3Div.appendChild(zLabel);
  const zInput = document.createElement("input");
  zInput.type = "number";
  zInput.style.minWidth = "0px";
  zInput.style.flexGrow = "1";
  zInput.value = value.value[2].toString();
  vector3Div.appendChild(zInput);

  const update = () => {
    onChange(
      new Vector3(
        parseFloat(xInput.value),
        parseFloat(yInput.value),
        parseFloat(zInput.value)
      )
    );
  };

  const setVector3 = (v: Vector3) => {
    if (
      document.activeElement === xInput ||
      document.activeElement === yInput ||
      document.activeElement === zInput
    ) {
      return;
    }

    xInput.value = v.value[0].toString();
    yInput.value = v.value[1].toString();
    zInput.value = v.value[2].toString();
  };

  xInput.addEventListener("change", update);
  yInput.addEventListener("change", update);
  zInput.addEventListener("change", update);

  return [vector3Div, setVector3];
};
