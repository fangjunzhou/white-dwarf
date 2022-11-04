import { System, SystemQueries } from "ecsy/System";
import { vec3 } from "gl-matrix";
import { EulerVelocityData3D } from "../DataComponents/EulerVelocityData3D";

const GRAVITY_ACCELERATION = 9.8;
export class EulerVelocityGravitySystem extends System {
  static queries: SystemQueries = {
    gravityTargets: {
      components: [EulerVelocityData3D],
    },
  };

  execute(delta: number, time: number): void {
    this.queries.gravityTargets.results.forEach((target) => {
      // Get the mutable velocity component.
      const velocity = target.getMutableComponent(
        EulerVelocityData3D
      ) as EulerVelocityData3D;

      // Change velocity.
      let acceleration = vec3.fromValues(0, -GRAVITY_ACCELERATION, 0);
      vec3.scale(acceleration, acceleration, delta);
      vec3.add(velocity.velocity.value, velocity.velocity.value, acceleration);
    });
  }
}
