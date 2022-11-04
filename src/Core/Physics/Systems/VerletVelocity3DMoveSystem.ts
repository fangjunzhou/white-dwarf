import { Attributes, System, SystemQueries } from "ecsy/System";
import { vec3 } from "gl-matrix";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { VerletVelocityData3D } from "../DataComponents/VerletVelocityData3D";

/**
 * The system to move all the objects using verlet velocity.
 * This system must be called last.
 */
export class VerletVelocity3DMoveSystem extends System {
  static queries: SystemQueries = {
    moveTargets: {
      components: [TransformData3D, VerletVelocityData3D],
    },
  };

  init(attributes?: Attributes | undefined): void {
    // Init verlet velocity.
    this.queries.moveTargets.results.forEach((target) => {
      // Get transform data.
      let transform = target.getComponent(TransformData3D) as TransformData3D;

      // Get verlet velocity data.
      let verletVelocity = target.getMutableComponent(
        VerletVelocityData3D
      ) as VerletVelocityData3D;

      // Init verlet position record.
      verletVelocity.lastFramePosition = transform.position.clone();
    });
  }

  execute(delta: number, time: number): void {
    // Move all the objects.
    this.queries.moveTargets.results.forEach((target) => {
      // Get transform data.
      let transform = target.getMutableComponent(
        TransformData3D
      ) as TransformData3D;
      // Get verlet velocity data.
      let verletVelocity = target.getMutableComponent(
        VerletVelocityData3D
      ) as VerletVelocityData3D;

      // Calculate the new position.
      const newPos = vec3.create();
      vec3.scale(newPos, transform.position.value, 2);
      vec3.sub(newPos, newPos, verletVelocity.lastFramePosition.value);
      vec3.add(
        newPos,
        newPos,
        vec3.scale(
          vec3.create(),
          verletVelocity.acceleration.value,
          Math.pow(delta, 2)
        )
      );

      // Update position.
      verletVelocity.lastFramePosition.value = transform.position.value;
      transform.position.value = newPos;

      // Clear acceleration.
      verletVelocity.acceleration.value = vec3.create();
    });
  }
}
