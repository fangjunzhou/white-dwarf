import {
  Component,
  ComponentSchema,
  COMPONENT_CHANGE_EVENT,
} from "ecsy/Component";
import { Types } from "ecsy/Types";
import {
  Vector2,
  Vector2CustomEditor,
  Vector2Type,
} from "../../../Mathematics/Vector2";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class TransformData2D extends Component<TransformData2D> {
  static schema: ComponentSchema = {
    position: {
      type: Vector2Type,
      default: new Vector2(0, 0),
    },
    rotation: {
      type: Types.Number,
      default: 0,
    },
    scale: {
      type: Vector2Type,
      default: new Vector2(1, 1),
    },
  };

  position!: Vector2;
  rotation!: number;
  scale!: Vector2;

  public useDefaultInspector: boolean = false;

  public onInspector = (componentDiv: HTMLDivElement) => {
    const transformDiv = document.createElement("div");

    // Position editor.
    const positionDiv = document.createElement("div");
    // Position title.
    positionDiv.appendChild(document.createTextNode("Position"));
    // Position Vector2 editor.
    const [positionVector2Div, setPosition] = Vector2CustomEditor(
      this.position,
      (newValue) => {
        this.position = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    positionDiv.appendChild(positionVector2Div);

    // Rotation editor.
    const rotationDiv = document.createElement("div");
    // Rotation title.
    rotationDiv.appendChild(document.createTextNode("Rotation"));
    // Rotation input.
    const rotationInput = document.createElement("input");
    rotationInput.type = "number";
    rotationInput.style.minWidth = "0px";
    rotationInput.style.width = "100%";
    rotationInput.value = this.rotation.toString();
    rotationInput.onchange = (event) => {
      this.rotation = parseFloat((event.target as HTMLInputElement).value);
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
    };
    rotationDiv.appendChild(rotationInput);

    // Scale editor.
    const scaleDiv = document.createElement("div");
    // Scale title.
    scaleDiv.appendChild(document.createTextNode("Scale"));
    // Scale Vector2 editor.
    const [scaleVector2Div, setScale] = Vector2CustomEditor(
      this.scale,
      (newValue) => {
        this.scale = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    scaleDiv.appendChild(scaleVector2Div);

    componentDiv.appendChild(positionDiv);
    componentDiv.appendChild(rotationDiv);
    componentDiv.appendChild(scaleDiv);

    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      setPosition(component.position);
      // Modify the rotation input value if it's not focused.
      if (document.activeElement !== rotationInput) {
        rotationInput.value = component.rotation.toString();
      }
      setScale(component.scale);
    });

    componentDiv.appendChild(transformDiv);
  };
}
