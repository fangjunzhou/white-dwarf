import { Component, ComponentSchema } from "ecsy-wd";
import { Types } from "ecsy-wd";
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
