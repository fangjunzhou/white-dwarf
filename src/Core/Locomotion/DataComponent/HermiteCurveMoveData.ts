import { Component, ComponentSchema, COMPONENT_CHANGE_EVENT } from "ecsy";
import { Types } from "ecsy";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class HermiteCurveMoveData extends Component<HermiteCurveMoveData> {
  static schema: ComponentSchema = {
    time: {
      type: Types.Number,
      default: 0,
    },
    loop: {
      type: Types.Boolean,
      default: false,
    },
    speed: {
      type: Types.Number,
      default: 1,
    },
    controlRotation: {
      type: Types.Boolean,
      default: false,
    },
  };

  time: number = 0;

  loop: boolean = false;
  speed: number = 1;
  controlRotation: boolean = false;

  public useDefaultInspector: boolean = false;

  public onInspector: (componentDiv: HTMLDivElement) => void = (
    componentDiv: HTMLDivElement
  ) => {
    // Create a loop div.
    const loopDiv = document.createElement("div");
    loopDiv.style.display = "flex";
    loopDiv.style.flexDirection = "row";

    loopDiv.appendChild(document.createTextNode("loop: "));
    const loopInput = document.createElement("input");
    loopInput.type = "checkbox";
    loopInput.checked = this.loop;
    loopInput.style.flex = "1";
    loopInput.addEventListener("change", (event) => {
      this.loop = loopInput.checked;
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      // Change if the checkbox is not focused.
      if (document.activeElement !== loopInput) {
        loopInput.checked = this.loop;
      }
    });
    loopDiv.appendChild(loopInput);

    // Create a speed div.
    const speedDiv = document.createElement("div");
    speedDiv.style.display = "flex";
    speedDiv.style.flexDirection = "row";

    speedDiv.appendChild(document.createTextNode("speed: "));
    const speedInput = document.createElement("input");
    speedInput.type = "number";
    speedInput.value = this.speed.toString();
    speedInput.style.flex = "1";
    speedInput.addEventListener("change", (event) => {
      this.speed = parseFloat(speedInput.value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      // Change if the input is not focused.
      if (document.activeElement !== speedInput) {
        speedInput.value = this.speed.toString();
      }
    });
    speedDiv.appendChild(speedInput);

    // Create a controlRotation div.
    const controlRotationDiv = document.createElement("div");
    controlRotationDiv.style.display = "flex";
    controlRotationDiv.style.flexDirection = "row";

    controlRotationDiv.appendChild(
      document.createTextNode("controlRotation: ")
    );
    const controlRotationInput = document.createElement("input");
    controlRotationInput.type = "checkbox";
    controlRotationInput.checked = this.controlRotation;
    controlRotationInput.style.flex = "1";
    controlRotationInput.addEventListener("change", (event) => {
      this.controlRotation = controlRotationInput.checked;
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      // Change if the checkbox is not focused.
      if (document.activeElement !== controlRotationInput) {
        controlRotationInput.checked = this.controlRotation;
      }
    });
    controlRotationDiv.appendChild(controlRotationInput);

    componentDiv.appendChild(loopDiv);
    componentDiv.appendChild(speedDiv);
    componentDiv.appendChild(controlRotationDiv);
  };
}
