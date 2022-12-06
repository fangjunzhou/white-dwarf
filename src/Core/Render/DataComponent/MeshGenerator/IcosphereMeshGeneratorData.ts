import { Component, Types } from "ecsy-wd";
import { IComponent } from "../../../ComponentRegistry";

@IComponent.register
export class IcosphereMeshGeneratorData extends Component<IcosphereMeshGeneratorData> {
  static schema = {
    radius: {
      type: Types.Number,
      default: 1,
    },
    subdivisions: {
      type: Types.Number,
      default: 0,
    },
    flatNormal: {
      type: Types.Boolean,
      default: false,
    },
  };

  radius: number = 1;
  subdivisions: number = 0;

  flatNormal: boolean = false;
}
