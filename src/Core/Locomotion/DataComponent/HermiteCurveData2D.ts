import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { HermiteCurve2DSegment } from "../../../Mathematics/HermiteCurveSegment";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class HermiteCurveData2D extends Component<HermiteCurveData2D> {
  static schema: ComponentSchema = {
    segments: {
      type: Types.Array,
      default: [],
    },
    resolution: {
      type: Types.Number,
      default: 0.01,
    },
  };

  segments: HermiteCurve2DSegment[] = [];
  resolution: number = 0.01;
}
