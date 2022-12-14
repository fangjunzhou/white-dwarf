import { Attributes, Entity, System, SystemQueries } from "ecsy-wd";
import { MeshRenderData3D } from "../DataComponent/MeshRenderData3D";
import { Material } from "../Material";
import { MeshBuffer } from "../MeshBuffer";
import default_vert from "../Shader/DefaultShader/default_vert.glsl";
import error_frag from "../Shader/ErrorShader/error_frag.glsl";

export class WebGLMeshCompiler extends System {
  static queries: SystemQueries = {
    meshEntities: {
      components: [MeshRenderData3D],
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
    // Compile all mesh.
    this.queries.meshEntities.added?.forEach((entity) => {
      this.compileMesh(entity);
      this.compileMaterial(entity);
    });
    this.queries.meshEntities.changed?.forEach((entity) => {
      this.compileMesh(entity);
      this.compileMaterial(entity);
    });
  }

  compileMesh(entity: Entity) {
    const meshRenderData = entity.getMutableComponent(
      MeshRenderData3D
    ) as MeshRenderData3D;

    if (!meshRenderData.mesh) {
      return;
    }

    meshRenderData.meshBuffer = new MeshBuffer(
      this.canvasContext,
      meshRenderData.mesh
    );
  }

  private async compileMaterial(entity: Entity) {
    const meshRenderData = entity.getMutableComponent(
      MeshRenderData3D
    ) as MeshRenderData3D;

    if (!meshRenderData.mesh) {
      return;
    }

    let vert: string;
    let frag: string;
    if (meshRenderData.materialDesc.fetchShader) {
      const [v, f] = await Promise.all([
        fetch(meshRenderData.materialDesc.vertexSource),
        fetch(meshRenderData.materialDesc.fragmentSource),
      ]);

      if (!v.ok || !f.ok) {
        console.log("Error fetching shader.");
        vert = default_vert;
        frag = error_frag;
      } else {
        vert = await v.text();
        frag = await f.text();
      }
    } else {
      vert = meshRenderData.materialDesc.vertexSource;
      frag = meshRenderData.materialDesc.fragmentSource;
    }

    // Compile material.
    try {
      meshRenderData.material = new Material(
        this.canvasContext,
        vert,
        frag,
        meshRenderData.materialDesc.attributes,
        meshRenderData.materialDesc.uniforms,
        Object.keys(meshRenderData.materialDesc.textureSamplers)
      );
    } catch (e) {
      meshRenderData.material = new Material(
        this.canvasContext,
        default_vert,
        error_frag,
        meshRenderData.materialDesc.attributes,
        meshRenderData.materialDesc.uniforms,
        Object.keys(meshRenderData.materialDesc.textureSamplers)
      );
      console.error(e);
    }

    // Load textures.
    for (const [name, src] of Object.entries(
      meshRenderData.materialDesc.textureSamplers
    )) {
      meshRenderData.material.loadTexture(name, src);
    }
  }
}
