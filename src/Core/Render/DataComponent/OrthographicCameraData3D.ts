import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { IComponent } from "../../ComponentRegistry";

@IComponent.register
export class OrthographicCameraData3D extends Component<OrthographicCameraData3D> {
  static schema: ComponentSchema = {
    left: {
      type: Types.Number,
      default: -1,
    },
    right: {
      type: Types.Number,
      default: 1,
    },
    top: {
      type: Types.Number,
      default: 1,
    },
    bottom: {
      type: Types.Number,
      default: -1,
    },
    near: {
      type: Types.Number,
      default: 0.1,
    },
    far: {
      type: Types.Number,
      default: 1000,
    },
  };

  // Camera left plane distance.
  left!: number;
  // Camera right plane distance.
  right!: number;
  // Camera top plane distance.
  top!: number;
  // Camera bottom plane distance.
  bottom!: number;
  // Camera near plane distance.
  near!: number;
  // Camera far plane distance.
  far!: number;
}
