import { Component, ComponentSchema } from "ecsy/Component";
import { Types } from "ecsy/Types";
import { IComponent } from "../../ComponentRegistry";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";

@IComponent.register
export class SyncTransform3DData extends Component<SyncTransform3DData> {
  static schema: ComponentSchema = {
    targetTransform: {
      type: Types.Ref,
      default: null,
    },
  };

  targetTransform!: TransformData3D;
}
