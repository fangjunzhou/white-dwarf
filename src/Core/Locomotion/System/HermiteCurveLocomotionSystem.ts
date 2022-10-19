import { System, SystemQueries } from "ecsy/System";
import {
  hermiteCurve2DSegmentEvaluate,
  hermiteDerivativeBaseFunc,
} from "../../../Mathematics/HermiteCurveSegment";
import { HermiteCurveData2D } from "../DataComponent/HermiteCurveData2D";
import { HermiteCurveMoveData } from "../DataComponent/HermiteCurveMoveData";
import { TransformData2D } from "../DataComponent/TransformData2D";

export class HermiteCurveLocomotionSystem extends System {
  static queries: SystemQueries = {
    hermiteMoveEntities: {
      components: [TransformData2D, HermiteCurveData2D, HermiteCurveMoveData],
    },
  };

  execute(delta: number, time: number): void {
    this.queries.hermiteMoveEntities.results.forEach((entity) => {
      const hermiteCurveData = entity.getComponent(
        HermiteCurveData2D
      ) as HermiteCurveData2D;

      const transformData = entity.getMutableComponent(
        TransformData2D
      ) as TransformData2D;
      const hermiteCurveMoveData = entity.getMutableComponent(
        HermiteCurveMoveData
      ) as HermiteCurveMoveData;
      // Get time span.
      const timeSpan = hermiteCurveData.segments.length;

      // Update time.
      hermiteCurveMoveData.time += delta * hermiteCurveMoveData.speed;
      // Loop time.
      if (hermiteCurveMoveData.loop) {
        hermiteCurveMoveData.time %= timeSpan;
      }
      // Get current segment.
      const currentSegment = Math.floor(hermiteCurveMoveData.time);

      // Check if time is out of range.
      if (
        hermiteCurveMoveData.time < 0 ||
        hermiteCurveMoveData.time > timeSpan ||
        currentSegment >= hermiteCurveData.segments.length
      ) {
        return;
      }

      // Get current segment time.
      const currentSegmentTime = hermiteCurveMoveData.time - currentSegment;
      // Get current segment.
      const segment = hermiteCurveData.segments[currentSegment];
      // Evaluate position.
      const position = hermiteCurve2DSegmentEvaluate(
        segment,
        currentSegmentTime
      );

      // Update transform.
      transformData.position = position;

      // Evaluate direction if needed.
      if (hermiteCurveMoveData.controlRotation) {
        const direction = hermiteCurve2DSegmentEvaluate(
          segment,
          currentSegmentTime,
          hermiteDerivativeBaseFunc
        );
        // Convert direction to angle.
        const angle = Math.atan2(direction.value[1], direction.value[0]);

        // Update transform.
        transformData.rotation = angle;
      }
    });
  }
}
