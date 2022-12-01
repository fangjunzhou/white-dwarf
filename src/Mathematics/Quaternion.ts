import { createType, copyCopyable, cloneClonable } from "ecsy-wd";
import { quat, vec4 } from "gl-matrix";

export class Quaternion {
  value: quat;

  constructor(x: number, y: number, z: number, w: number) {
    this.value = quat.fromValues(x, y, z, w);
  }

  set(x: number, y: number, z: number, w: number) {
    quat.set(this.value, x, y, z, w);
  }

  copy(q: Quaternion): Quaternion {
    this.value = quat.copy(this.value, q.value);
    return this;
  }

  clone(): Quaternion {
    return new Quaternion(
      this.value[0],
      this.value[1],
      this.value[2],
      this.value[3]
    );
  }
}

export const QuaternionType = createType({
  name: "Quaternion",
  default: new Quaternion(0, 0, 0, 1),
  copy: copyCopyable<Quaternion>,
  clone: cloneClonable<Quaternion>,
});

export const QuaternionCustomEditor = (
  value: Quaternion,
  onChange: (value: Quaternion) => void
): [HTMLDivElement, (v: Quaternion) => void] => {
  const quaternionDiv = document.createElement("div");
  quaternionDiv.style.display = "flex";
  quaternionDiv.style.flexDirection = "row";

  const xLabel = document.createElement("label");
  xLabel.innerText = "X";
  quaternionDiv.appendChild(xLabel);
  const xInput = document.createElement("input");
  xInput.type = "number";
  xInput.style.minWidth = "0px";
  xInput.style.flexGrow = "1";
  xInput.value = value.value[0].toString();
  quaternionDiv.appendChild(xInput);

  const yLabel = document.createElement("label");
  yLabel.innerText = "Y";
  quaternionDiv.appendChild(yLabel);
  const yInput = document.createElement("input");
  yInput.type = "number";
  yInput.style.minWidth = "0px";
  yInput.style.flexGrow = "1";
  yInput.value = value.value[1].toString();
  quaternionDiv.appendChild(yInput);

  const zLabel = document.createElement("label");
  zLabel.innerText = "Z";
  quaternionDiv.appendChild(zLabel);
  const zInput = document.createElement("input");
  zInput.type = "number";
  zInput.style.minWidth = "0px";
  zInput.style.flexGrow = "1";
  zInput.value = value.value[2].toString();
  quaternionDiv.appendChild(zInput);

  const wLabel = document.createElement("label");
  wLabel.innerText = "W";
  quaternionDiv.appendChild(wLabel);
  const wInput = document.createElement("input");
  wInput.type = "number";
  wInput.style.minWidth = "0px";
  wInput.style.flexGrow = "1";
  wInput.value = value.value[3].toString();
  quaternionDiv.appendChild(wInput);

  const update = () => {
    onChange(
      new Quaternion(
        parseFloat(xInput.value),
        parseFloat(yInput.value),
        parseFloat(zInput.value),
        parseFloat(wInput.value)
      )
    );
  };

  const setQuaternion = (q: Quaternion) => {
    if (
      document.activeElement === xInput ||
      document.activeElement === yInput ||
      document.activeElement === zInput ||
      document.activeElement === wInput
    ) {
      return;
    }

    xInput.value = q.value[0].toString();
    yInput.value = q.value[1].toString();
    zInput.value = q.value[2].toString();
    wInput.value = q.value[3].toString();
  };

  xInput.addEventListener("change", update);
  yInput.addEventListener("change", update);
  zInput.addEventListener("change", update);
  wInput.addEventListener("change", update);

  return [quaternionDiv, setQuaternion];
};
