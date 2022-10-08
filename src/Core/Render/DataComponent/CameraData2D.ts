import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";

enum BackgroundType {
  Color = 0,
  Texture = 1,
}

export class CameraData extends Component<CameraData> {
  static schema: ComponentSchema = {
    backgroundType: {
      type: Types.Number,
      default: BackgroundType.Color,
    },
    backgroundColor: {
      type: Types.String,
      default: "#000000",
    },
    backgroundTexture: {
      type: Types.String,
      default: "",
    },
  };

  backgroundType!: BackgroundType;

  backgroundColor!: string;
  backgroundTexture!: string;
}
