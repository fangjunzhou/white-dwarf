import { Component, ComponentSchema, Types } from "ecsy-wd";
import { IComponent } from "../../ComponentRegistry";
import {
  Material,
  MaterialDescriptor,
  MaterialDescriptorType,
} from "../Material";
import { Mesh, MeshType } from "../Mesh";
import { MeshBuffer } from "../MeshBuffer";

@IComponent.register
export class MeshRenderData3D extends Component<MeshRenderData3D> {
  static schema: ComponentSchema = {
    mesh: {
      type: Types.Ref,
    },
    meshBuffer: {
      type: Types.Ref,
    },

    materialDesc: {
      type: MaterialDescriptorType,
    },
    material: {
      type: Types.Ref,
    },
  };

  mesh!: Mesh;
  meshBuffer!: MeshBuffer;

  materialDesc!: MaterialDescriptor;
  material!: Material;
}
