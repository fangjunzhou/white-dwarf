import { Component, ComponentSchema, COMPONENT_CHANGE_EVENT } from "ecsy-wd";
import { Types } from "ecsy-wd";
import {
  Vector2,
  Vector2CustomEditor,
  Vector2Type,
} from "../../../Mathematics/Vector2";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class ImageRenderData2D extends Component<ImageRenderData2D> {
  static schema: ComponentSchema = {
    src: {
      type: Types.String,
      default: "",
    },
    img: {
      type: Types.Ref,
      default: null,
    },
    imageCenter: {
      type: Vector2Type,
      default: new Vector2(0, 0),
    },
  };

  src: string = "";
  img: CanvasImageSource | null = null;
  imageCenter!: Vector2;

  public useDefaultInspector: boolean = false;

  public onInspector: (componentDiv: HTMLDivElement) => void = (
    componentDiv: HTMLDivElement
  ) => {
    // Create src div.
    const srcDiv = document.createElement("div");
    srcDiv.style.display = "flex";
    srcDiv.style.flexDirection = "row";

    srcDiv.appendChild(document.createTextNode("src: "));
    const srcInput = document.createElement("input");
    srcInput.value = this.src;
    srcInput.style.flex = "1";
    srcInput.addEventListener("change", (event) => {
      this.src = srcInput.value;
      this.eventEmitter.emit(COMPONENT_CHANGE_EVENT);
    });
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, () => {
      // If the input is focused, don't update it.
      if (document.activeElement !== srcInput) {
        srcInput.value = this.src;
      }
    });
    srcDiv.appendChild(srcInput);

    // Add image center div.
    const imageCenterDiv = document.createElement("div");
    imageCenterDiv.style.display = "flex";
    imageCenterDiv.style.flexDirection = "column";

    imageCenterDiv.appendChild(document.createTextNode("imageCenter: "));
    const [imageCenterVector2Div, onImgCenterChanged] = Vector2CustomEditor(
      this.imageCenter,
      (value) => {
        this.imageCenter = value;
        this.eventEmitter.emit(COMPONENT_CHANGE_EVENT, this);
      }
    );
    this.eventEmitter.on(COMPONENT_CHANGE_EVENT, (component) => {
      onImgCenterChanged(this.imageCenter);
    });
    imageCenterVector2Div.style.minWidth = "0px";
    imageCenterDiv.appendChild(imageCenterVector2Div);

    componentDiv.appendChild(srcDiv);
    componentDiv.appendChild(imageCenterDiv);
  };
}
