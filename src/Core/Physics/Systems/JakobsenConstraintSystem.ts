import { Attributes, System, SystemQueries } from "ecsy";
import { vec3 } from "gl-matrix";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { ConstraintData } from "../DataComponents/ConstraintData";

export class JakobsenConstraintSystem extends System {
  static queries: SystemQueries = {
    constrainedEntities: {
      components: [TransformData3D, ConstraintData],
    },
  };

  jakobsenIterations: number = 1;

  init(attributes?: Attributes | undefined): void {
    if (attributes?.jakobsenIteration) {
      this.jakobsenIterations = attributes.jakobsenIterations;
    }
  }

  execute(delta: number, time: number): void {
    // More iterations = more accurate, but slower.
    for (let i = 0; i < this.jakobsenIterations; i++) {
      this.queries.constrainedEntities.results.forEach((entity) => {
        // Get mutable transform.
        const transform = entity.getMutableComponent(
          TransformData3D
        ) as TransformData3D;

        // Get constraints.
        const constraints = entity.getComponent(
          ConstraintData
        ) as ConstraintData;

        // Enforce each constraint.
        constraints.constraints.forEach((constraint) => {
          const targetEntity = constraint.target;
          if (!targetEntity.hasComponent(TransformData3D)) {
            return;
          }
          const targetTransform = targetEntity.getMutableComponent(
            TransformData3D
          ) as TransformData3D;

          // Calculate the distance.
          const distance = vec3.dist(
            targetTransform.position.value,
            transform.position.value
          );
          const deltaDistance = distance - constraint.length;

          if (!targetEntity.hasComponent(ConstraintData)) {
            // If the target constraint have no constraint data.
            // Move current transform.
            const movePos = vec3.sub(
              vec3.create(),
              targetTransform.position.value,
              transform.position.value
            );
            vec3.normalize(movePos, movePos);
            vec3.scale(movePos, movePos, deltaDistance);
            vec3.add(
              transform.position.value,
              transform.position.value,
              movePos
            );
          } else {
            // Move current transform.
            const movePos = vec3.sub(
              vec3.create(),
              targetTransform.position.value,
              transform.position.value
            );
            vec3.normalize(movePos, movePos);
            vec3.scale(movePos, movePos, deltaDistance / 2);
            vec3.add(
              transform.position.value,
              transform.position.value,
              movePos
            );
            // Move target transform.
            vec3.negate(movePos, movePos);
            vec3.add(
              targetTransform.position.value,
              targetTransform.position.value,
              movePos
            );
          }
        });
      });
    }
  }
}
