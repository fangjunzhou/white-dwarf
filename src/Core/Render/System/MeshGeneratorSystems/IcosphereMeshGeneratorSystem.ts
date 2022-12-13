import { Attributes, Entity, System, SystemQueries } from "ecsy-wd";
import { vec2, vec3 } from "gl-matrix";
import { IcosphereMeshGeneratorData } from "../../DataComponent/MeshGenerator/IcosphereMeshGeneratorData";
import { MeshRenderData3D } from "../../DataComponent/MeshRenderData3D";
import { Mesh } from "../../Mesh";

export class IcosphereMeshGeneratorSystem extends System {
  static queries: SystemQueries = {
    meshEntities: {
      components: [IcosphereMeshGeneratorData],
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
    let vertices = this.generateIcosahedron(generatorData);

    // Subdivide.
    for (let i = 0; i < generatorData.subdivisions; i++) {
      vertices = this.subdivide(vertices);
    }

    // Generate the mesh.
    let index = 0;

    for (let i = 0; i < vertices.length; i += 3) {
      // Get vertices.
      const v1 = vertices[i];
      const v2 = vertices[i + 1];
      const v3 = vertices[i + 2];

      // Normalized vertices.

      // Normalize.
      vec3.normalize(v1, v1);
      vec3.normalize(v2, v2);
      vec3.normalize(v3, v3);

      // Scale.
      vec3.scale(v1, v1, generatorData.radius);
      vec3.scale(v2, v2, generatorData.radius);
      vec3.scale(v3, v3, generatorData.radius);

      // Calculate normal.
      const normal = this.calcNormal(v1, v2, v3);

      // Push vertices.
      meshRenderData.mesh.addVertexPosition(v1);
      meshRenderData.mesh.addVertexPosition(v2);
      meshRenderData.mesh.addVertexPosition(v3);

      // Push vertex colors.
      for (let j = 0; j < 3; j++) {
        meshRenderData.mesh.addVertexColor([1, 1, 1, 1]);
      }

      // Push normals.
      if (generatorData.flatNormal) {
        meshRenderData.mesh.addVertexNormal(normal);
        meshRenderData.mesh.addVertexNormal(normal);
        meshRenderData.mesh.addVertexNormal(normal);
      } else {
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v1));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v2));
        meshRenderData.mesh.addVertexNormal(vec3.normalize(vec3.create(), v3));
      }

      // Push vertex coordinates.

      let texCoord1 = this.calculateUV(v1);
      let texCoord2 = this.calculateUV(v2);
      let texCoord3 = this.calculateUV(v3);
      // Check if one of the x coordinates distance is greater than 0.5.
      if (texCoord1[0] - texCoord2[0] > 0.5) {
        texCoord1[0] -= 1;
      }
      if (texCoord2[0] - texCoord1[0] > 0.5) {
        texCoord2[0] -= 1;
      }
      if (texCoord1[0] - texCoord3[0] > 0.5) {
        texCoord1[0] -= 1;
      }
      if (texCoord3[0] - texCoord1[0] > 0.5) {
        texCoord3[0] -= 1;
      }
      if (texCoord2[0] - texCoord3[0] > 0.5) {
        texCoord2[0] -= 1;
      }
      if (texCoord3[0] - texCoord2[0] > 0.5) {
        texCoord3[0] -= 1;
      }

      meshRenderData.mesh.addVertexTexCoords(texCoord1);
      meshRenderData.mesh.addVertexTexCoords(texCoord2);
      meshRenderData.mesh.addVertexTexCoords(texCoord3);

      // Push indices.
      meshRenderData.mesh.registerTriangle(index, index + 1, index + 2);
      index += 3;
    }

    // Compile mesh.
    meshRenderData.mesh.compileBufferToArrays();
  }

  /**
   * Calulate the latitude and longitude of a vertex.
   */
  private calculateUV(pos: vec3): vec2 {
    // Normalize the vertex.
    vec3.normalize(pos, pos);

    // Calculate the longitude and latitude.
    const longitude = Math.atan2(pos[0], pos[2]);
    const latitude = -Math.asin(pos[1]);
    // Normalize latitude and longitude to [0, 1].
    const u = (longitude + Math.PI) / (2 * Math.PI);
    const v = (latitude + Math.PI / 2) / Math.PI;

    return vec2.fromValues(u, v);
  }

  /**
   * One subdivision step.
   * @param meshRenderData
   * @param generatorData
   */
  private subdivide(vertices: Array<vec3>) {
    const newVertices: Array<vec3> = [];

    // Generate the mesh.
    for (let i = 0; i < vertices.length; i += 3) {
      // Get vertices.
      const v1 = vertices[i];
      const v2 = vertices[i + 1];
      const v3 = vertices[i + 2];

      // Subdivide.
      const a = vec3.lerp(vec3.create(), v1, v2, 0.5);
      const b = vec3.lerp(vec3.create(), v2, v3, 0.5);
      const c = vec3.lerp(vec3.create(), v3, v1, 0.5);

      // Push vertices.
      newVertices.push(v1, a, c);
      newVertices.push(v2, b, a);
      newVertices.push(v3, c, b);
      newVertices.push(c, a, b);
    }

    return newVertices;
  }

  /**
   * Generate a icosahedron.
   * @param generatorData
   * @param meshRenderData
   */
  private generateIcosahedron(
    generatorData: IcosphereMeshGeneratorData
  ): Array<vec3> {
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

    const vertices: Array<vec3> = [];

    // Generate top vertices.
    for (let i = 0; i < 5; i++) {
      vertices.push(topVertex);
      vertices.push(topVertices[i]);
      vertices.push(topVertices[(i + 1) % 5]);
    }

    // Generate middle vertices.
    for (let i = 0; i < 5; i++) {
      vertices.push(topVertices[i]);
      vertices.push(bottomVertices[(i + 2) % 5]);
      vertices.push(bottomVertices[(i + 3) % 5]);

      vertices.push(bottomVertices[(i + 3) % 5]);
      vertices.push(topVertices[(i + 1) % 5]);
      vertices.push(topVertices[i]);
    }

    // Generate bottom vertices.
    for (let i = 0; i < 5; i++) {
      vertices.push(bottomVertex);
      vertices.push(bottomVertices[(i + 1) % 5]);
      vertices.push(bottomVertices[i]);
    }

    return vertices;
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
