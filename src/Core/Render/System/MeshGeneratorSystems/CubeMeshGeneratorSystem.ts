import { Attributes, Entity, System, SystemQueries } from "ecsy-wd";
import { CubeMesh } from "../../../../Utils/DefaultMeshes/CubeMesh";
import { CubeMeshGeneratorData } from "../../DataComponent/MeshGenerator/CubeMeshGeneratorData";
import { MeshRenderData3D } from "../../DataComponent/MeshRenderData3D";

export class CubeMeshGeneratorSystem extends System {
  static queries: SystemQueries = {
    meshEntities: {
      components: [CubeMeshGeneratorData, MeshRenderData3D],
      listen: {
        added: true,
        changed: true,
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

    meshRenderData.mesh = new CubeMesh(
      meshGeneratorData.size.value[0],
      meshGeneratorData.size.value[1],
      meshGeneratorData.size.value[2]
    );
  }
}
