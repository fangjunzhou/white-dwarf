import { cloneClonable, copyCopyable, createType } from "ecsy-wd";

export class Mesh {
  vertexPositions!: Float32Array;
  vertexNormals!: Float32Array;
  vertexColors!: Float32Array;
  vertexTexCoords!: Float32Array;
  triangleIndices!: Uint8Array;

  copy(m: Mesh): Mesh {
    this.vertexPositions = new Float32Array(m.vertexPositions);
    this.vertexNormals = new Float32Array(m.vertexNormals);
    this.vertexColors = new Float32Array(m.vertexColors);
    this.vertexTexCoords = new Float32Array(m.vertexTexCoords);
    this.triangleIndices = new Uint8Array(m.triangleIndices);
    return this;
  }

  clone(): Mesh {
    return new Mesh().copy(this);
  }
}

export const MeshType = createType({
  name: "Mesh",
  default: new Mesh(),
  copy: copyCopyable<Mesh>,
  clone: cloneClonable<Mesh>,
});
