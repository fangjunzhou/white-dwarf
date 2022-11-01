import {
  Component,
  ComponentSchema,
  COMPONENT_CHANGE_EVENT,
} from "ecsy/Component";
import { Types } from "ecsy/Types";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class PerspectiveCameraData3D extends Component<PerspectiveCameraData3D> {
  static schema: ComponentSchema = {
    fov: {
      type: Types.Number,
      default: Math.PI / 4,
    },
    aspect: {
      type: Types.Number,
      default: 1,
    },
    near: {
      type: Types.Number,
      default: 0.1,
    },
    far: {
      type: Types.Number,
      default: 1000,
    },
  };

  // y field of view in radians.
  fov!: number;
  // Camera aspect ratio.
  aspect!: number;
  // Camera near plane distance.
  near!: number;
  // Camera far plane distance.
  far!: number;

  public useDefaultInspector: boolean = false;
  public onInspector: (componentDiv: HTMLDivElement) => void | null = (
    componentDiv: HTMLDivElement
  ) => {
    const fovDiv = document.createElement("div");
    fovDiv.style.display = "flex";
    fovDiv.style.flexDirection = "row";

    fovDiv.appendChild(document.createTextNode("fov: "));
    // FOV Slider.
    const fovSlider = document.createElement("input");
    fovSlider.type = "range";
    fovSlider.min = "0";
    fovSlider.max = "3.14";
    fovSlider.step = "0.01";
    fovSlider.value = this.fov.toString();
    fovSlider.style.flex = "1";
    fovSlider.addEventListener("change", (event) => {
      this.fov = parseFloat(fovSlider.value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      // If the input is focused, don't update it.
      if (document.activeElement !== fovSlider) {
        fovSlider.value = this.fov.toString();
      }
    });
    fovDiv.appendChild(fovSlider);

    const aspectDiv = document.createElement("div");
    aspectDiv.style.display = "flex";
    aspectDiv.style.flexDirection = "row";

    aspectDiv.appendChild(document.createTextNode("aspect: "));
    const aspectInput = document.createElement("input");
    aspectInput.type = "number";
    aspectInput.value = this.aspect.toString();
    aspectInput.style.minWidth = "0px";
    aspectInput.style.flex = "1";
    aspectInput.addEventListener("change", (event) => {
      this.aspect = parseFloat(aspectInput.value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      // If the input is focused, don't update it.
      if (document.activeElement !== aspectInput) {
        aspectInput.value = this.aspect.toString();
      }
    });
    aspectDiv.appendChild(aspectInput);

    const nearDiv = document.createElement("div");
    nearDiv.style.display = "flex";
    nearDiv.style.flexDirection = "row";

    nearDiv.appendChild(document.createTextNode("near: "));
    const nearInput = document.createElement("input");
    nearInput.type = "number";
    nearInput.value = this.near.toString();
    nearInput.style.minWidth = "0px";
    nearInput.style.flex = "1";
    nearInput.addEventListener("change", (event) => {
      this.near = parseFloat(nearInput.value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      // If the input is focused, don't update it.
      if (document.activeElement !== nearInput) {
        nearInput.value = this.near.toString();
      }
    });
    nearDiv.appendChild(nearInput);

    const farDiv = document.createElement("div");
    farDiv.style.display = "flex";
    farDiv.style.flexDirection = "row";

    farDiv.appendChild(document.createTextNode("far: "));
    const farInput = document.createElement("input");
    farInput.type = "number";
    farInput.value = this.far.toString();
    farInput.style.minWidth = "0px";
    farInput.style.flex = "1";
    farInput.addEventListener("change", (event) => {
      this.far = parseFloat(farInput.value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      // If the input is focused, don't update it.
      if (document.activeElement !== farInput) {
        farInput.value = this.far.toString();
      }
    });
    farDiv.appendChild(farInput);

    componentDiv.appendChild(fovDiv);
    componentDiv.appendChild(aspectDiv);
    componentDiv.appendChild(nearDiv);
    componentDiv.appendChild(farDiv);
  };
}
