import { Component, ComponentSchema } from "ecsy-wd";
import { Types } from "ecsy-wd";
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
