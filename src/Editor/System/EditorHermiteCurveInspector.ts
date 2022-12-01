import { System, SystemQueries } from "ecsy-wd";
import { vec2, mat3 } from "gl-matrix";
import { HermiteCurveData2D } from "../../Core/Locomotion/DataComponent/HermiteCurveData2D";
import { TransformData2D } from "../../Core/Locomotion/DataComponent/TransformData2D";
import { Canvas2DRenderer } from "../../Core/Render/System/Canvas2DRenderer";
import {
  HermiteCurve2DSegment,
  hermiteCurve2DSegmentEvaluate,
} from "../../Mathematics/HermiteCurveSegment";
import { EditorSelectedTag } from "../TagComponent/EditorSelectedTag";

export class EditorHermiteCurveInspector extends Canvas2DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    curveEntities: {
      components: [HermiteCurveData2D, EditorSelectedTag],
    },
  };

  execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Draw transform and enable selection here.

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
    mat3.multiply(
      worldToCamera,
      worldToCamera,
      this.worldToCamera(cameraTransform, canvasSize)
    );

    // Draw all curves.
    this.queries.curveEntities.results.forEach((entity) => {
      // Get hermite curve data.
      const curveData = entity.getComponent(
        HermiteCurveData2D
      ) as HermiteCurveData2D;

      // Draw curve segments.
      curveData.segments.forEach((segment) => {
        // Move to start point.
        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = "red";
        const startPos = vec2.transformMat3(
          vec2.create(),
          segment.p0.value,
          worldToCamera
        );
        this.canvasContext.moveTo(startPos[0], startPos[1]);

        for (let i = 0; i < 1; i += curveData.resolution) {
          // Evaluate curve in world space.
          const curvePosWorld = hermiteCurve2DSegmentEvaluate(segment, i);
          // Transform to camera space.
          const curvePosCamera = vec2.transformMat3(
            vec2.create(),
            curvePosWorld.value,
            worldToCamera
          );

          // Draw line to curve position.
          this.canvasContext.lineTo(curvePosCamera[0], curvePosCamera[1]);
        }

        // Draw line to end point.
        const endPos = vec2.transformMat3(
          vec2.create(),
          segment.p1.value,
          worldToCamera
        );
        this.canvasContext.lineTo(endPos[0], endPos[1]);

        // Draw curve.
        this.canvasContext.stroke();
      });
    });
  }
}
