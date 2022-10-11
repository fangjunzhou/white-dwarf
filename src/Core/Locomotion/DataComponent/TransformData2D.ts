import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { Vector2, Vector2Type } from "../../../Mathematics/Vector2";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class TransformData2D extends Component<TransformData2D> {
  static schema: ComponentSchema = {
    position: {
      type: Vector2Type,
      default: new Vector2(0, 0),
    },
    rotation: {
      type: Types.Number,
      default: 0,
    },
    scale: {
      type: Vector2Type,
      default: new Vector2(1, 1),
    },
  };

  position!: Vector2;
  rotation!: number;
  scale!: Vector2;
}
