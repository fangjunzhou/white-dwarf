import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";

export class ImageRenderData2D extends Component<ImageRenderData2D> {
  static schema: ComponentSchema = {
    src: {
      type: Types.String,
      default: "",
    },
  };

  src: string = "";
}
