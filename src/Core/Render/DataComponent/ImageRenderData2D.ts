import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { Vector2, Vector2Type } from "../../../Mathematics/Vector2";
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
}
