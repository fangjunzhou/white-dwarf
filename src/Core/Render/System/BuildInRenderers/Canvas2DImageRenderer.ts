import { SystemQueries } from "ecsy/System";
import { mat3, vec2 } from "gl-matrix";
import { TransformData2D } from "../../../Locomotion/DataComponent/TransformData2D";
import { ImageRenderData2D } from "../../DataComponent/ImageRenderData2D";
import { Canvas2DRenderer } from "../Canvas2DRenderer";

export class Canvas2DImageRenderer extends Canvas2DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    imageEntities: {
      components: [ImageRenderData2D, TransformData2D],
    },
  };

  override execute(delta: number, time: number): void {
    super.execute(delta, time);

    // Get the camera transform.
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    // Construct world to camera matrix.
    const worldToCamera = mat3.create();
    // Center the camera.
    mat3.fromTranslation(
      worldToCamera,
      vec2.fromValues(canvasSize[0] / 2, canvasSize[1] / 2)
    );
    mat3.translate(
      worldToCamera,
      worldToCamera,
      vec2.negate(vec2.create(), cameraTransform.position.value)
    );
    mat3.rotate(worldToCamera, worldToCamera, cameraTransform.rotation);
    mat3.scale(worldToCamera, worldToCamera, cameraTransform.scale.value);

    // Draw all image entities.
    this.queries.imageEntities.results.forEach((imageEntity) => {
      // Get the image transform.
      const imageTransform = imageEntity.getComponent(
        TransformData2D
      ) as TransformData2D;
      // Get the image render data.
      const imageRenderData = imageEntity.getComponent(
        ImageRenderData2D
      ) as ImageRenderData2D;

      // If the image is not loaded, skip.
      if (!imageRenderData.img) return;

      // TODO: Convert local transform to world transform.

      // Construct entity to world matrix.
      const entityToWorld = mat3.create();
      mat3.fromTranslation(entityToWorld, imageTransform.position.value);
      mat3.rotate(entityToWorld, entityToWorld, imageTransform.rotation);
      mat3.scale(entityToWorld, entityToWorld, imageTransform.scale.value);

      // Construct image to entity matrix.
      const imageToEntity = mat3.create();
      mat3.fromTranslation(
        imageToEntity,
        vec2.negate(vec2.create(), imageRenderData.imageCenter.value)
      );

      // Calculate the final transform matrix.
      const finalTransform = mat3.create();
      mat3.multiply(finalTransform, worldToCamera, entityToWorld);
      mat3.multiply(finalTransform, finalTransform, imageToEntity);

      // Draw the image.
      this.canvasContext.setTransform(
        finalTransform[0],
        finalTransform[1],
        finalTransform[3],
        finalTransform[4],
        finalTransform[6],
        finalTransform[7]
      );
      this.canvasContext.drawImage(imageRenderData.img, 0, 0);
    });
  }
}
