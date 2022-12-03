import { Component, ComponentSchema } from "ecsy-wd";
import { IComponent } from "../../ComponentRegistry";
import { Material, MaterialType } from "../Material";

@IComponent.register
export class MeshRenderData3D extends Component<MeshRenderData3D> {
  static schema: ComponentSchema = {
    material: {
      type: MaterialType,
    },
  };

  material!: Material;
}
