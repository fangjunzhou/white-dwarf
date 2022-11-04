import { Component, ComponentSchema } from "ecsy/Component";
import { Vector3, Vector3Type } from "../../../Mathematics/Vector3";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class VerletVelocityData3D extends Component<VerletVelocityData3D> {
  static schema: ComponentSchema = {
    acceleration: {
      type: Vector3Type,
      default: new Vector3(0, 0, 0),
    },
    lastFramePosition: {
      type: Vector3Type,
      default: new Vector3(0, 0, 0),
    },
  };

  acceleration!: Vector3;
  lastFramePosition!: Vector3;
}
