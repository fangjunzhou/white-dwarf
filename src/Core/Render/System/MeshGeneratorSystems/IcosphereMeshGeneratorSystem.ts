import { Attributes, Entity, System, SystemQueries } from "ecsy-wd";
import { vec3 } from "gl-matrix";
import { IcosphereMeshGeneratorData } from "../../DataComponent/MeshGenerator/IcosphereMeshGeneratorData";
import { MeshRenderData3D } from "../../DataComponent/MeshRenderData3D";
import { Mesh } from "../../Mesh";

export class IcosphereMeshGeneratorSystem extends System {
  static queries: SystemQueries = {
    meshEntities: {
      components: [IcosphereMeshGeneratorData, MeshRenderData3D],
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
      this.generateIcosphereMesh(entity);
    });
    this.queries.meshEntities.changed?.forEach((entity) => {
      this.generateIcosphereMesh(entity);
    });
  }

  generateIcosphereMesh(entity: Entity) {
    const generatorData = entity.getComponent(
      IcosphereMeshGeneratorData
    ) as IcosphereMeshGeneratorData;
    const meshRenderData = entity.getMutableComponent(
      MeshRenderData3D
    ) as MeshRenderData3D;

    if (!meshRenderData) {
      return;
    }

    // Generate Mesh.
    meshRenderData.mesh = new Mesh();

    // Top vertices layer.
    this.generateIcosahedron(generatorData, meshRenderData);

    // Subdivide.
    for (let i = 0; i < generatorData.subdivisions; i++) {
      this.subdivide(meshRenderData, generatorData);
    }

    // Compile mesh.
    meshRenderData.mesh.compileBufferToArrays();
  }

  /**
   * One subdivision step.
   * @param meshRenderData
   * @param generatorData
   */
  private subdivide(
    meshRenderData: MeshRenderData3D,
    generatorData: IcosphereMeshGeneratorData
  ) {
    // Fetch the vertices.
    const vertices = meshRenderData.mesh.vertexPositionBuffer;

    // Clear mesh buffer.
    meshRenderData.mesh.clearBuffers();

    let vertexIndex = 0;

    // Generate the mesh.
    while (vertices.length > 0) {
      const v1 = vec3.fromValues(
        vertices.shift() as number,
        vertices.shift() as number,
        vertices.shift() as number
      );
      const v2 = vec3.fromValues(
        vertices.shift() as number,
        vertices.shift() as number,
        vertices.shift() as number
      );
      const v3 = vec3.fromValues(
        vertices.shift() as number,
        vertices.shift() as number,
        vertices.shift() as number
      );

      // Subdivide.
      const v12 = vec3.lerp(vec3.create(), v1, v2, 0.5);
      const v23 = vec3.lerp(vec3.create(), v2, v3, 0.5);
      const v31 = vec3.lerp(vec3.create(), v3, v1, 0.5);

      // Normalize.
      vec3.normalize(v12, v12);
      vec3.normalize(v23, v23);
      vec3.normalize(v31, v31);

      // Scale.
      vec3.scale(v12, v12, generatorData.radius);
      vec3.scale(v23, v23, generatorData.radius);
      vec3.scale(v31, v31, generatorData.radius);

      // Push vertices.
      meshRenderData.mesh.addVertexPosition(v1);
      meshRenderData.mesh.addVertexPosition(v12);
      meshRenderData.mesh.addVertexPosition(v31);

      meshRenderData.mesh.addVertexPosition(v2);
      meshRenderData.mesh.addVertexPosition(v23);
      meshRenderData.mesh.addVertexPosition(v12);

      meshRenderData.mesh.addVertexPosition(v3);
      meshRenderData.mesh.addVertexPosition(v31);
      meshRenderData.mesh.addVertexPosition(v23);

      meshRenderData.mesh.addVertexPosition(v12);
      meshRenderData.mesh.addVertexPosition(v23);
      meshRenderData.mesh.addVertexPosition(v31);

      // Push normals.
      if (generatorData.flatNormal) {
        for (let i = 0; i < 3; i++) {
          meshRenderData.mesh.addVertexNormal(this.calcNormal(v1, v12, v31));
        }
        for (let i = 0; i < 3; i++) {
          meshRenderData.mesh.addVertexNormal(this.calcNormal(v2, v23, v12));
        }
        for (let i = 0; i < 3; i++) {
          meshRenderData.mesh.addVertexNormal(this.calcNormal(v3, v31, v23));
        }
        for (let i = 0; i < 3; i++) {
          meshRenderData.mesh.addVertexNormal(this.calcNormal(v12, v23, v31));
        }
      } else {
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v1));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v12));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v31));

        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v2));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v23));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v12));

        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v3));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v31));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v23));

        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v12));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v23));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v31));
      }

      // TODO: Add UV.
      // Push indices.
      for (let i = 0; i < 4; i++) {
        meshRenderData.mesh.registerTriangle(
          vertexIndex,
          vertexIndex + 1,
          vertexIndex + 2
        );

        vertexIndex += 3;
      }
    }
  }

  /**
   * Generate a icosahedron.
   * @param generatorData
   * @param meshRenderData
   */
  private generateIcosahedron(
    generatorData: IcosphereMeshGeneratorData,
    meshRenderData: MeshRenderData3D
  ) {
    const layerRadius = (generatorData.radius * 2) / Math.sqrt(5);
    const layerHeight = generatorData.radius / Math.sqrt(5);
    // Top vertex.
    const topVertex = vec3.fromValues(0, generatorData.radius, 0);
    // Top vertices.
    const topVertices: Array<vec3> = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const z = layerRadius * Math.cos(angle);
      const x = -layerRadius * Math.sin(angle);
      topVertices.push(vec3.fromValues(x, layerHeight, z));
    }
    // Bottom vertices.
    const bottomVertices: Array<vec3> = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const z = layerRadius * Math.cos(angle + Math.PI);
      const x = -layerRadius * Math.sin(angle + Math.PI);
      bottomVertices.push(vec3.fromValues(x, -layerHeight, z));
    }
    // Bottom vertex.
    const bottomVertex = vec3.fromValues(0, -generatorData.radius, 0);

    let verticesCount = 0;

    // Generate top vertices.
    for (let i = 0; i < 5; i++) {
      // Position.
      meshRenderData.mesh.addVertexPosition(topVertex);
      meshRenderData.mesh.addVertexPosition(topVertices[i]);
      meshRenderData.mesh.addVertexPosition(topVertices[(i + 1) % 5]);

      // Normal.
      // Choose flat normal or smooth normal.
      if (generatorData.flatNormal) {
        const flatNormal = this.calcNormal(
          topVertex,
          topVertices[i],
          topVertices[(i + 1) % 5]
        );
        meshRenderData.mesh.addVertexNormal(flatNormal);
        meshRenderData.mesh.addVertexNormal(flatNormal);
        meshRenderData.mesh.addVertexNormal(flatNormal);
      } else {
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertices[i])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertex)
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertices[(i + 1) % 5])
        );
      }

      // TODO: Texture coordinate.
      // Index.
      meshRenderData.mesh.registerTriangle(
        verticesCount,
        verticesCount + 1,
        verticesCount + 2
      );

      verticesCount += 3;
    }

    // Generate middle vertices.
    for (let i = 0; i < 5; i++) {
      // Position.
      meshRenderData.mesh.addVertexPosition(topVertices[i]);
      meshRenderData.mesh.addVertexPosition(bottomVertices[(i + 2) % 5]);
      meshRenderData.mesh.addVertexPosition(bottomVertices[(i + 3) % 5]);

      meshRenderData.mesh.addVertexPosition(bottomVertices[(i + 3) % 5]);
      meshRenderData.mesh.addVertexPosition(topVertices[(i + 1) % 5]);
      meshRenderData.mesh.addVertexPosition(topVertices[i]);

      // Normal.
      // Choose flat normal or smooth normal.
      if (generatorData.flatNormal) {
        const flatNormal1 = this.calcNormal(
          topVertices[i],
          bottomVertices[(i + 2) % 5],
          bottomVertices[(i + 3) % 5]
        );
        const flatNormal2 = this.calcNormal(
          bottomVertices[(i + 3) % 5],
          topVertices[(i + 1) % 5],
          topVertices[i]
        );
        meshRenderData.mesh.addVertexNormal(flatNormal1);
        meshRenderData.mesh.addVertexNormal(flatNormal1);
        meshRenderData.mesh.addVertexNormal(flatNormal1);

        meshRenderData.mesh.addVertexNormal(flatNormal2);
        meshRenderData.mesh.addVertexNormal(flatNormal2);
        meshRenderData.mesh.addVertexNormal(flatNormal2);
      } else {
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertices[i])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertices[(i + 2) % 5])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertices[(i + 3) % 5])
        );

        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertices[(i + 3) % 5])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertices[(i + 1) % 5])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), topVertices[i])
        );
      }

      // TODO: Texture coordinate.
      // Index.
      meshRenderData.mesh.registerTriangle(
        verticesCount,
        verticesCount + 1,
        verticesCount + 2
      );
      meshRenderData.mesh.registerTriangle(
        verticesCount + 3,
        verticesCount + 4,
        verticesCount + 5
      );

      verticesCount += 6;
    }

    // Generate bottom vertices.
    for (let i = 0; i < 5; i++) {
      // Position.
      meshRenderData.mesh.addVertexPosition(bottomVertex);
      meshRenderData.mesh.addVertexPosition(bottomVertices[(i + 1) % 5]);
      meshRenderData.mesh.addVertexPosition(bottomVertices[i]);

      // Normal.
      // Choose flat normal or smooth normal.
      if (generatorData.flatNormal) {
        const flatNormal = this.calcNormal(
          bottomVertex,
          bottomVertices[(i + 1) % 5],
          bottomVertices[i]
        );
        meshRenderData.mesh.addVertexNormal(flatNormal);
        meshRenderData.mesh.addVertexNormal(flatNormal);
        meshRenderData.mesh.addVertexNormal(flatNormal);
      } else {
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertices[i])
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertex)
        );
        meshRenderData.mesh.addVertexNormal(
          vec3.normalize(vec3.create(), bottomVertices[(i + 1) % 5])
        );
      }

      // TODO: Texture coordinate.
      // Index.
      meshRenderData.mesh.registerTriangle(
        verticesCount,
        verticesCount + 1,
        verticesCount + 2
      );

      verticesCount += 3;
    }
  }

  /**
   * Calculate the normal of a triangle.
   * @param v1 center vertex.
   * @param v2 from vertex.
   * @param v3 to vertex.
   * @returns (v3 - v1) cross (v2 - v1).
   */
  calcNormal(v1: vec3, v2: vec3, v3: vec3): vec3 {
    const normal = vec3.create();
    vec3.cross(
      normal,
      vec3.sub(vec3.create(), v3, v1),
      vec3.sub(vec3.create(), v2, v1)
    );
    vec3.normalize(normal, normal);
    return normal;
  }
}
