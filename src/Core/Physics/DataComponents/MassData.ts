import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class MassData extends Component<MassData> {
  static schema: ComponentSchema = {
    mass: {
      type: Types.Number,
      default: 0,
    },
  };

  mass!: number;
}
