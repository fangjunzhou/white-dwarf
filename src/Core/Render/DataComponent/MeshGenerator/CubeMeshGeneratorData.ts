import {
  Component,
  ComponentSchema,
  COMPONENT_CHANGE_EVENT,
  Types,
} from "ecsy-wd";
import {
  Vector3,
  Vector3CustomEditor,
  Vector3Type,
} from "../../../../Mathematics/Vector3";
import { IComponent } from "../../../ComponentRegistry";

@IComponent.register
export class CubeMeshGeneratorData extends Component<CubeMeshGeneratorData> {
  static schema: ComponentSchema = {
    size: {
      type: Vector3Type,
      default: new Vector3(1, 1, 1),
    },
  };

  size: Vector3 = new Vector3(1, 1, 1);

  public useDefaultInspector: boolean = false;
  public onInspector: (componentDiv: HTMLDivElement) => void | null = (
    componentDiv: HTMLDivElement
  ) => {
    // Size editor.
    const sizeDiv = document.createElement("div");
    // Size title.
    sizeDiv.appendChild(document.createTextNode("Size"));
    // Position Vector3 editor.
    const [sizeVector3Div, setSize] = Vector3CustomEditor(
      this.size,
      (newValue) => {
        this.size = newValue;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    sizeDiv.appendChild(sizeVector3Div);

    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      setSize(this.size);
    });

    // Append the size editor to the component div.
    componentDiv.appendChild(sizeDiv);
  };
}
