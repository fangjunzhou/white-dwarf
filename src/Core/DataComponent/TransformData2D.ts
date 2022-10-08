import { Component, ComponentSchema } from "ecsy/Component";
import { Vector2, Vector2Type } from "../../Mathematics/Vector2";

export class TransformData2D extends Component<TransformData2D> {
  static schema: ComponentSchema = {
    position: { type: Vector2Type, default: new Vector2(0, 0) },
  };

  position!: Vector2;
}
