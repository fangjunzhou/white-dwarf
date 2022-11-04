import { System, SystemQueries } from "ecsy/System";
import { vec3 } from "gl-matrix";
import { MassData } from "../DataComponents/MassData";
import { VerletVelocityData3D } from "../DataComponents/VerletVelocityData3D";

const GRAVITY_ACCELERATION = 9.8;
export class VerletVelocity3DGravitySystem extends System {
  static queries: SystemQueries = {
    gravityTargets: {
      components: [VerletVelocityData3D, MassData],
    },
  };

  execute(delta: number, time: number): void {
    this.queries.gravityTargets.results.forEach((target) => {
      // Get verlet velocity mutable component.
      const verletVelocity = target.getMutableComponent(
        VerletVelocityData3D
      ) as VerletVelocityData3D;

      // Change the acceleration.
      vec3.add(
        verletVelocity.acceleration.value,
        verletVelocity.acceleration.value,
        vec3.fromValues(0, -GRAVITY_ACCELERATION, 0)
      );
    });
  }
}
