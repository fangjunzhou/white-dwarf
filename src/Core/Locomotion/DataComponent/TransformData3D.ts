import {
  Component,
  ComponentSchema,
  COMPONENT_CHANGE_EVENT,
} from "ecsy/Component";
import {
  Quaternion,
  QuaternionCustomEditor,
  QuaternionType,
} from "../../../Mathematics/Quaternion";
import {
  Vector3,
  Vector3CustomEditor,
  Vector3Type,
} from "../../../Mathematics/Vector3";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class TransformData3D extends Component<TransformData3D> {
  static schema: ComponentSchema = {
    position: {
      type: Vector3Type,
      default: new Vector3(0, 0, 0),
    },
    rotation: {
      type: QuaternionType,
      default: new Quaternion(0, 0, 0, 1),
    },
    scale: {
      type: Vector3Type,
      default: new Vector3(1, 1, 1),
    },
  };

  position!: Vector3;
  rotation!: Quaternion;
  scale!: Vector3;

  public useDefaultInspector: boolean = false;
  public onInspector: (componentDiv: HTMLDivElement) => void | null = (
    componentDiv: HTMLDivElement
  ) => {
    const transformDiv = document.createElement("div");

    // Position editor.
    const positionDiv = document.createElement("div");
    // Position title.
    positionDiv.appendChild(document.createTextNode("Position"));
    // Position Vector3 editor.
    const [positionVector3Div, setPosition] = Vector3CustomEditor(
      this.position,
      (newValue) => {
        this.position = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    positionDiv.appendChild(positionVector3Div);

    // Rotation editor.
    const rotationDiv = document.createElement("div");
    // Rotation title.
    rotationDiv.appendChild(document.createTextNode("Rotation"));
    // Rotation Quaternion editor.
    const [rotationQuaternionDiv, setRotation] = QuaternionCustomEditor(
      this.rotation,
      (newValue) => {
        this.rotation = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    rotationDiv.appendChild(rotationQuaternionDiv);

    // Scale editor.
    const scaleDiv = document.createElement("div");
    // Scale title.
    scaleDiv.appendChild(document.createTextNode("Scale"));
    // Scale Vector3 editor.
    const [scaleVector3Div, setScale] = Vector3CustomEditor(
      this.scale,
      (newValue) => {
        this.scale = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    scaleDiv.appendChild(scaleVector3Div);

    // Append all editors to the transform editor.
    transformDiv.appendChild(positionDiv);
    transformDiv.appendChild(rotationDiv);
    transformDiv.appendChild(scaleDiv);

    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      setPosition(this.position);
      setRotation(this.rotation);
      setScale(this.scale);
    });

    // Append the transform editor to the component editor.
    componentDiv.appendChild(transformDiv);
  };
}
