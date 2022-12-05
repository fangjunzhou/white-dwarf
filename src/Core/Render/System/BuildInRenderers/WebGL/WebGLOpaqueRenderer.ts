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

    // View matrix.
    const tView = this.getViewMatrix(this.cameraTransform);
    // Projection matrix.
    let tProjection: mat4;
    if (this.cameraPerspective) {
      tProjection = this.getPerspectiveProjectionMatrix(this.cameraPerspective);
    } else if (this.cameraOrthographic) {
      tProjection = this.getOrthographicProjectionMatrix(
        this.cameraOrthographic
      );
    } else {
      throw new Error("No camera found.");
    }

    // Render all objects.
    this.queries.meshEntities.results.forEach((entity) => {
      const transform = entity.getComponent(TransformData3D) as TransformData3D;
      const meshRenderData = entity.getComponent(
        MeshRenderData3D
      ) as MeshRenderData3D;

      // Get material and buffer.
      const material = meshRenderData.material;
      const meshBuffer = meshRenderData.meshBuffer;

      // If the material is not ready, skip this object.
      if (!material || !meshBuffer) {
        return;
      }

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

      // Enable the shader program.
      material.use(this.glContext);

      // Set the shader uniforms.
      this.glContext.uniformMatrix4fv(
        material.uniformLocations.uMV as WebGLUniformLocation,
        false,
        tMV
      );
      this.glContext.uniformMatrix4fv(
        material.uniformLocations.uP as WebGLUniformLocation,
        false,
        tProjection
      );
      this.glContext.uniformMatrix3fv(
        material.uniformLocations.uMVn as WebGLUniformLocation,
        false,
        tMVn
      );
      this.glContext.uniformMatrix4fv(
        material.uniformLocations.uMVP as WebGLUniformLocation,
        false,
        tMVP
      );

      // Set the shader attributes.
      this.glContext.bindBuffer(
        this.glContext.ARRAY_BUFFER,
        meshBuffer.vertexPositionsBuffer
      );
      this.glContext.vertexAttribPointer(
        material.attributeLocations.vPosition as number,
        meshBuffer.bufferInfos.vertexPositions!.itemSize,
        this.glContext.FLOAT,
        false,
        0,
        0
      );

      this.glContext.bindBuffer(
        this.glContext.ARRAY_BUFFER,
        meshBuffer.vertexNormalsBuffer
      );
      this.glContext.vertexAttribPointer(
        material.attributeLocations.vNormal as number,
        meshBuffer.bufferInfos.vertexNormals!.itemSize,
        this.glContext.FLOAT,
        false,
        0,
        0
      );

      this.glContext.bindBuffer(
        this.glContext.ARRAY_BUFFER,
        meshBuffer.vertexColorsBuffer
      );
      this.glContext.vertexAttribPointer(
        material.attributeLocations.vColor as number,
        meshBuffer.bufferInfos.vertexColors!.itemSize,
        this.glContext.FLOAT,
        false,
        0,
        0
      );

      this.glContext.bindBuffer(
        this.glContext.ARRAY_BUFFER,
        meshBuffer.vertexTexCoordsBuffer
      );
      this.glContext.vertexAttribPointer(
        material.attributeLocations.vTexCoord as number,
        meshBuffer.bufferInfos.vertexTexCoords!.itemSize,
        this.glContext.FLOAT,
        false,
        0,
        0
      );

      // Draw the object.
      this.glContext.drawElements(
        this.glContext.TRIANGLES,
        meshBuffer.bufferInfos.triangleIndices!.numItems,
        this.glContext.UNSIGNED_BYTE,
        0
      );
    });
  }
}
