import { SystemQueries } from "ecsy";
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
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Get the camera transform.
    const cameraTransform = this.queries.mainCamera.results[0].getComponent(
      TransformData2D
    ) as TransformData2D;
    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );

    const worldToCamera = this.worldToCamera(cameraTransform, canvasSize);

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

      const objectToWorld = this.objectToWorld(imageTransform);

      // Construct image to object matrix.
      const imageToObject = mat3.create();
      mat3.fromTranslation(
        imageToObject,
        vec2.negate(vec2.create(), imageRenderData.imageCenter.value)
      );

      // Calculate the final transform matrix.
      // worldToCamera * objectToWorld * imageToObject
      const finalTransform = mat3.create();
      mat3.multiply(finalTransform, worldToCamera, objectToWorld);
      mat3.multiply(finalTransform, finalTransform, imageToObject);

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

      // Reset the transform.
      this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    });
  }
}
