import { Component, ComponentSchema } from "ecsy";
import { Vector3, Vector3Type } from "../../../Mathematics/Vector3";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class EulerVelocityData3D extends Component<EulerVelocityData3D> {
  static schema: ComponentSchema = {
    velocity: {
      type: Vector3Type,
      default: new Vector3(0, 0, 0),
    },
  };

  velocity!: Vector3;
}
