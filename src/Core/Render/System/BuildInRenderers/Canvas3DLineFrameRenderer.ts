import { System, SystemQueries } from "ecsy/System";
import { mat4, vec2, vec3 } from "gl-matrix";
import { TransformData3D } from "../../../Locomotion/DataComponent/TransformData3D";
import { LineFrameRenderData3D } from "../../DataComponent/LineFrameRenderData3D";
import { PerspectiveCameraData3D } from "../../DataComponent/PerspectiveCameraData3D";
import { Canvas3DRenderer } from "../Canvas3DRenderer";

export class Canvas3DLineFrameRenderer extends Canvas3DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    lineEntities: {
      components: [LineFrameRenderData3D, TransformData3D],
    },
  };

  execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Generate camera to screen matrix.
    this.generateCameraToScreenMatrix();

    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    // Get Object to world to screen space matrix.
    if (this.queries.perspectiveMainCamera.results.length > 0) {
      // Perspective camera.
      const camera = this.queries.perspectiveMainCamera.results[0];
      const cameraTransform = camera.getComponent(
        TransformData3D
      ) as TransformData3D;
      const cameraPerspective = camera.getMutableComponent(
        PerspectiveCameraData3D
      ) as PerspectiveCameraData3D;

      // Change the aspect ratio.
      cameraPerspective.aspect = canvasSize[0] / canvasSize[1];

      this.worldToCamera = this.perspectiveWorldToCamera(
        cameraTransform,
        cameraPerspective
      );
    } else {
      // TODO: Orthographic camera.
    }

    // Draw all frame lines.
    this.queries.lineEntities.results.forEach((entity) => {
      // Get the transform and render data.
      const transform = entity.getComponent(TransformData3D) as TransformData3D;
      const renderData = entity.getComponent(
        LineFrameRenderData3D
      ) as LineFrameRenderData3D;

      // Generate object to world matrix.
      const objectToWorld = this.objectToWorld(transform);

      renderData.segments.forEach((segment) => {
        // Generate object to camera matrix.
        const objectToScreen = mat4.create();
        mat4.multiply(objectToScreen, this.worldToCamera, objectToWorld);
        mat4.multiply(objectToScreen, this.cameraToScreen, objectToScreen);

        // Generate screen space start point.
        const startPoint = vec3.create();
        vec3.transformMat4(startPoint, segment.p0.value, objectToScreen);

        // Generate screen space end point.
        const endPoint = vec3.create();
        vec3.transformMat4(endPoint, segment.p1.value, objectToScreen);

        // Draw the line.
        this.drawLine(startPoint, endPoint, "black", 1);
      });
    });
  }

  drawLine(
    startPoint: vec3,
    endPoint: vec3,
    color: string,
    lineWidth: number
  ): void {
    this.canvasContext.strokeStyle = color;
    this.canvasContext.lineWidth = lineWidth;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(startPoint[0], startPoint[1]);
    this.canvasContext.lineTo(endPoint[0], endPoint[1]);
    this.canvasContext.stroke();
  }
}
