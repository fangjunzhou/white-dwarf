import { cloneClonable, copyCopyable, createType } from "ecsy-wd";
import { vec2, vec3, vec4 } from "gl-matrix";

export class Mesh {
  vertexPositions!: Float32Array;
  vertexNormals!: Float32Array;
  vertexColors!: Float32Array;
  vertexTexCoords!: Float32Array;
  triangleIndices!: Uint8Array;

  vertexPositionBuffer: Array<number> = [];
  vertexNormalBuffer: Array<number> = [];
  vertexColorBuffer: Array<number> = [];
  vertexTexCoordsBuffer: Array<number> = [];
  triangleIndexBuffer: Array<number> = [];

  public compileBufferToArrays() {
    this.vertexPositions = new Float32Array(this.vertexPositionBuffer);
    this.vertexNormals = new Float32Array(this.vertexNormalBuffer);
    this.vertexColors = new Float32Array(this.vertexColorBuffer);
    this.vertexTexCoords = new Float32Array(this.vertexTexCoordsBuffer);
    this.triangleIndices = new Uint8Array(this.triangleIndexBuffer);

    this.clearBuffers();
  }

  public clearBuffers() {
    this.vertexPositionBuffer = [];
    this.vertexNormalBuffer = [];
    this.vertexColorBuffer = [];
    this.vertexTexCoordsBuffer = [];
    this.triangleIndexBuffer = [];
  }

  public addVertexPosition(vertex: vec3) {
    this.vertexPositionBuffer.push(vertex[0], vertex[1], vertex[2]);
  }

  public addVertexNormal(normal: vec3) {
    this.vertexNormalBuffer.push(normal[0], normal[1], normal[2]);
  }

  public addVertexColor(color: vec4) {
    this.vertexColorBuffer.push(color[0], color[1], color[2], color[3]);
  }

  public addVertexTexCoords(texCoords: vec2) {
    this.vertexTexCoordsBuffer.push(texCoords[0], texCoords[1]);
  }

  public registerTriangle(t1: number, t2: number, t3: number) {
    this.triangleIndexBuffer.push(t1, t2, t3);
  }

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
