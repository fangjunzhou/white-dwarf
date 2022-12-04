import { SystemQueries } from "ecsy-wd";
import { mat3, mat4, vec2 } from "gl-matrix";
import { TransformData3D } from "../../../../Locomotion/DataComponent/TransformData3D";
import { MeshRenderData3D } from "../../../DataComponent/MeshRenderData3D";
import { PerspectiveCameraData3D } from "../../../DataComponent/PerspectiveCameraData3D";
import { CanvasWebGLRenderer } from "../../CanvasWebGLRenderer";

export class WebGLOpaqueRenderer extends CanvasWebGLRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    meshEntities: {
      components: [TransformData3D, MeshRenderData3D],
    },
  };

  public execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // View matrux.
    const tView = this.getViewMatrix(this.cameraTransform);
    // Projection matrix.
    let tProjection: mat4;
    if (this.cameraPerspective) {
      tProjection = this.getPerspectiveProjectionMatrix(this.cameraPerspective);
    } else {
      // TODO: Orthographic camera.
      throw new Error("Orthographic camera not supported yet.");
    }

    // Render all objects.
    this.queries.meshEntities.results.forEach((entity) => {
      const transform = entity.getComponent(TransformData3D) as TransformData3D;
      const meshRenderData = entity.getComponent(
        MeshRenderData3D
      ) as MeshRenderData3D;

      // Model matrix.
      const tModel = this.getModelMatrix(transform);

      // MV matrix.
      const tMV = mat4.create();
      mat4.multiply(tMV, tView, tModel);

      // MVn matrix.
      const tMVn = mat3.create();
      mat3.normalFromMat4(tMVn, tMV);

      // MVP matrix.
      const tMVP = mat4.create();
      mat4.multiply(tMVP, tProjection, tMV);

      // Get material and buffer.
      const material = meshRenderData.material;
      const meshBuffer = meshRenderData.meshBuffer;

      // Enable the shader program.
      material.use(this.canvasContext);

      // Set the shader uniforms.
      this.canvasContext.uniformMatrix4fv(
        material.uniformLocations.uMV as WebGLUniformLocation,
        false,
        tMV
      );
      this.canvasContext.uniformMatrix3fv(
        material.uniformLocations.uMVn as WebGLUniformLocation,
        false,
        tMVn
      );
      this.canvasContext.uniformMatrix4fv(
        material.uniformLocations.uMVP as WebGLUniformLocation,
        false,
        tMVP
      );

      // Set the shader attributes.
      this.canvasContext.bindBuffer(
        this.canvasContext.ARRAY_BUFFER,
        meshBuffer.vertexPositionsBuffer
      );
      this.canvasContext.vertexAttribPointer(
        material.attributeLocations.vPosition as number,
        meshBuffer.bufferInfos.vertexPositions!.itemSize,
        this.canvasContext.FLOAT,
        false,
        0,
        0
      );

      this.canvasContext.bindBuffer(
        this.canvasContext.ARRAY_BUFFER,
        meshBuffer.vertexNormalsBuffer
      );
      this.canvasContext.vertexAttribPointer(
        material.attributeLocations.vNormal as number,
        meshBuffer.bufferInfos.vertexNormals!.itemSize,
        this.canvasContext.FLOAT,
        false,
        0,
        0
      );

      this.canvasContext.bindBuffer(
        this.canvasContext.ARRAY_BUFFER,
        meshBuffer.vertexColorsBuffer
      );
      this.canvasContext.vertexAttribPointer(
        material.attributeLocations.vColor as number,
        meshBuffer.bufferInfos.vertexColors!.itemSize,
        this.canvasContext.FLOAT,
        false,
        0,
        0
      );

      this.canvasContext.bindBuffer(
        this.canvasContext.ARRAY_BUFFER,
        meshBuffer.vertexTexCoordsBuffer
      );
      this.canvasContext.vertexAttribPointer(
        material.attributeLocations.vTexCoord as number,
        meshBuffer.bufferInfos.vertexTexCoords!.itemSize,
        this.canvasContext.FLOAT,
        false,
        0,
        0
      );

      // Draw the object.
      this.canvasContext.drawElements(
        this.canvasContext.TRIANGLES,
        meshBuffer.bufferInfos.triangleIndices!.numItems,
        this.canvasContext.UNSIGNED_BYTE,
        0
      );
    });
  }
}
