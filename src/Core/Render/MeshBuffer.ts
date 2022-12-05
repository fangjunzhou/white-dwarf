import { Mesh } from "./Mesh";

interface BufferInfo {
  itemSize: number;
  numItems: number;
}

interface BufferInfos {
  vertexPositions: BufferInfo | null;
  vertexNormals: BufferInfo | null;
  vertexColors: BufferInfo | null;
  vertexTexCoords: BufferInfo | null;
  triangleIndices: BufferInfo | null;
}

export class MeshBuffer {
  vertexPositionsBuffer!: WebGLBuffer;
  vertexNormalsBuffer!: WebGLBuffer;
  vertexColorsBuffer!: WebGLBuffer;
  vertexTexCoordsBuffer!: WebGLBuffer;
  triangleIndicesBuffer!: WebGLBuffer;

  bufferInfos: BufferInfos = {
    vertexPositions: null,
    vertexNormals: null,
    vertexColors: null,
    vertexTexCoords: null,
    triangleIndices: null,
  };

  constructor(glContext: WebGLRenderingContext, mesh: Mesh) {
    // Vertex position buffer.
    this.vertexPositionsBuffer = glContext.createBuffer()!;
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexPositionsBuffer);
    glContext.bufferData(
      glContext.ARRAY_BUFFER,
      new Float32Array(mesh.vertexPositions),
      glContext.STATIC_DRAW
    );
    this.bufferInfos.vertexPositions = {
      itemSize: 3,
      numItems: mesh.vertexPositions.length / 3,
    };

    // Vertex normal buffer.
    this.vertexNormalsBuffer = glContext.createBuffer()!;
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexNormalsBuffer);
    glContext.bufferData(
      glContext.ARRAY_BUFFER,
      new Float32Array(mesh.vertexNormals),
      glContext.STATIC_DRAW
    );
    this.bufferInfos.vertexNormals = {
      itemSize: 3,
      numItems: mesh.vertexNormals.length / 3,
    };

    // Vertex color buffer.
    this.vertexColorsBuffer = glContext.createBuffer()!;
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexColorsBuffer);
    glContext.bufferData(
      glContext.ARRAY_BUFFER,
      new Float32Array(mesh.vertexColors),
      glContext.STATIC_DRAW
    );
    this.bufferInfos.vertexColors = {
      itemSize: 4,
      numItems: mesh.vertexColors.length / 4,
    };

    // Vertex texture coordinate buffer.
    this.vertexTexCoordsBuffer = glContext.createBuffer()!;
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexTexCoordsBuffer);
    glContext.bufferData(
      glContext.ARRAY_BUFFER,
      new Float32Array(mesh.vertexTexCoords),
      glContext.STATIC_DRAW
    );
    this.bufferInfos.vertexTexCoords = {
      itemSize: 2,
      numItems: mesh.vertexTexCoords.length / 2,
    };

    // Triangle index buffer.
    this.triangleIndicesBuffer = glContext.createBuffer()!;
    glContext.bindBuffer(
      glContext.ELEMENT_ARRAY_BUFFER,
      this.triangleIndicesBuffer
    );
    glContext.bufferData(
      glContext.ELEMENT_ARRAY_BUFFER,
      new Uint8Array(mesh.triangleIndices),
      glContext.STATIC_DRAW
    );
    this.bufferInfos.triangleIndices = {
      itemSize: 1,
      numItems: mesh.triangleIndices.length,
    };
  }
}
