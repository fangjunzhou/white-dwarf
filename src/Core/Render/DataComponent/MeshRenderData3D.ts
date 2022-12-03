import { Component, ComponentSchema, Types } from "ecsy-wd";
import { IComponent } from "../../ComponentRegistry";
import { Material } from "../Material";
import { Mesh } from "../Mesh";
import { MeshBuffer } from "../MeshBuffer";

@IComponent.register
export class MeshRenderData3D extends Component<MeshRenderData3D> {
  static schema: ComponentSchema = {
    mesh: {
      type: Types.Ref,
    },
    material: {
      type: Types.Ref,
    },

    meshBuffer: {
      type: Types.Ref,
    },
  };

  mesh!: Mesh;
  material!: Material;

  meshBuffer!: MeshBuffer;
}
