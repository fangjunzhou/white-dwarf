import { Component, ComponentSchema } from "ecsy-wd";
import { Material, MaterialType } from "../Material";

export class MeshRenderData3D extends Component<MeshRenderData3D> {
  static schema: ComponentSchema = {
    material: {
      type: MaterialType,
    },
  };

  material!: Material;
}
