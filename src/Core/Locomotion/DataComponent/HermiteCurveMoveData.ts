import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
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
}
