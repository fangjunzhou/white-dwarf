import { Attributes, Entity, System, SystemQueries } from "ecsy-wd";
import { CubeMesh } from "../../../../Utils/DefaultMeshes/CubeMesh";
import { CubeMeshGeneratorData } from "../../DataComponent/MeshGenerator/CubeMeshGeneratorData";
import { MeshRenderData3D } from "../../DataComponent/MeshRenderData3D";
import { Mesh } from "../../Mesh";

export class CubeMeshGeneratorSystem extends System {
  static queries: SystemQueries = {
    meshEntities: {
      components: [CubeMeshGeneratorData, MeshRenderData3D],
      listen: {
        added: true,
      },
    },
  };

  mainCanvas!: HTMLCanvasElement;
  canvasContext!: WebGLRenderingContext;

  init(attributes?: Attributes | undefined): void {
    this.mainCanvas = attributes?.mainCanvas;
    this.canvasContext = this.mainCanvas.getContext(
      "webgl"
    ) as WebGLRenderingContext;
  }

  execute(delta: number, time: number): void {
    // Generate all mesh.
    this.queries.meshEntities.added?.forEach((entity) => {
      this.generateCubeMesh(entity);
    });
    this.queries.meshEntities.changed?.forEach((entity) => {
      this.generateCubeMesh(entity);
    });
  }

  private generateCubeMesh(entity: Entity) {
    const meshGeneratorData = entity.getComponent(
      CubeMeshGeneratorData
    ) as CubeMeshGeneratorData;
    const meshRenderData = entity.getMutableComponent(
      MeshRenderData3D
    ) as MeshRenderData3D;

    if (!meshGeneratorData) {
      return;
    }

    meshRenderData.mesh = new Mesh();

    meshRenderData.mesh.clearBuffers();

    const x = meshGeneratorData.size.value[0];
    const y = meshGeneratorData.size.value[1];
    const z = meshGeneratorData.size.value[2];

    // Front face.
    meshRenderData.mesh.addVertexPosition([-x, -y, z]);
    meshRenderData.mesh.addVertexPosition([x, -y, z]);
    meshRenderData.mesh.addVertexPosition([x, y, z]);
    meshRenderData.mesh.addVertexPosition([-x, y, z]);
    meshRenderData.mesh.addVertexNormal([0, 0, 1]);
    meshRenderData.mesh.addVertexNormal([0, 0, 1]);
    meshRenderData.mesh.addVertexNormal([0, 0, 1]);
    meshRenderData.mesh.addVertexNormal([0, 0, 1]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.registerTriangle(0, 1, 2);
    meshRenderData.mesh.registerTriangle(0, 2, 3);

    // Back face.
    meshRenderData.mesh.addVertexPosition([-x, -y, -z]);
    meshRenderData.mesh.addVertexPosition([-x, y, -z]);
    meshRenderData.mesh.addVertexPosition([x, y, -z]);
    meshRenderData.mesh.addVertexPosition([x, -y, -z]);
    meshRenderData.mesh.addVertexNormal([0, 0, -1]);
    meshRenderData.mesh.addVertexNormal([0, 0, -1]);
    meshRenderData.mesh.addVertexNormal([0, 0, -1]);
    meshRenderData.mesh.addVertexNormal([0, 0, -1]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.registerTriangle(4, 5, 6);
    meshRenderData.mesh.registerTriangle(4, 6, 7);

    // Top face.
    meshRenderData.mesh.addVertexPosition([-x, y, -z]);
    meshRenderData.mesh.addVertexPosition([-x, y, z]);
    meshRenderData.mesh.addVertexPosition([x, y, z]);
    meshRenderData.mesh.addVertexPosition([x, y, -z]);
    meshRenderData.mesh.addVertexNormal([0, 1, 0]);
    meshRenderData.mesh.addVertexNormal([0, 1, 0]);
    meshRenderData.mesh.addVertexNormal([0, 1, 0]);
    meshRenderData.mesh.addVertexNormal([0, 1, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.registerTriangle(8, 9, 10);
    meshRenderData.mesh.registerTriangle(8, 10, 11);

    // Bottom face.
    meshRenderData.mesh.addVertexPosition([-x, -y, -z]);
    meshRenderData.mesh.addVertexPosition([x, -y, -z]);
    meshRenderData.mesh.addVertexPosition([x, -y, z]);
    meshRenderData.mesh.addVertexPosition([-x, -y, z]);
    meshRenderData.mesh.addVertexNormal([0, -1, 0]);
    meshRenderData.mesh.addVertexNormal([0, -1, 0]);
    meshRenderData.mesh.addVertexNormal([0, -1, 0]);
    meshRenderData.mesh.addVertexNormal([0, -1, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.registerTriangle(12, 13, 14);
    meshRenderData.mesh.registerTriangle(12, 14, 15);

    // Right face.
    meshRenderData.mesh.addVertexPosition([x, -y, -z]);
    meshRenderData.mesh.addVertexPosition([x, y, -z]);
    meshRenderData.mesh.addVertexPosition([x, y, z]);
    meshRenderData.mesh.addVertexPosition([x, -y, z]);
    meshRenderData.mesh.addVertexNormal([1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([1, 0, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.registerTriangle(16, 17, 18);
    meshRenderData.mesh.registerTriangle(16, 18, 19);

    // Left face.
    meshRenderData.mesh.addVertexPosition([-x, -y, -z]);
    meshRenderData.mesh.addVertexPosition([-x, -y, z]);
    meshRenderData.mesh.addVertexPosition([-x, y, z]);
    meshRenderData.mesh.addVertexPosition([-x, y, -z]);
    meshRenderData.mesh.addVertexNormal([-1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([-1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([-1, 0, 0]);
    meshRenderData.mesh.addVertexNormal([-1, 0, 0]);
    meshRenderData.mesh.addVertexTexCoords([0, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 0]);
    meshRenderData.mesh.addVertexTexCoords([1, 1]);
    meshRenderData.mesh.addVertexTexCoords([0, 1]);
    meshRenderData.mesh.registerTriangle(20, 21, 22);
    meshRenderData.mesh.registerTriangle(20, 22, 23);

    // Add 24 white vertex colors.
    for (var i = 0; i < 24; i++) {
      meshRenderData.mesh.addVertexColor([1, 1, 1, 1]);
    }

    // Compile the mesh.
    meshRenderData.mesh.compileBufferToArrays();
  }
}
