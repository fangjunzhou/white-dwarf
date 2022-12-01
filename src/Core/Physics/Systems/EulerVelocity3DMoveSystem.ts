import { Attributes, System, SystemQueries } from "ecsy-wd";
import { vec3 } from "gl-matrix";
import { TransformData3D } from "../../Locomotion/DataComponent/TransformData3D";
import { EulerVelocityData3D } from "../DataComponents/EulerVelocityData3D";

export class EulerVelocity3DMoveSystem extends System {
  static queries: SystemQueries = {
    moveTargets: {
      components: [TransformData3D, EulerVelocityData3D],
    },
  };

  execute(delta: number, time: number): void {
    // Move all the components based on euler velocity.
    this.queries.moveTargets.results.forEach((target) => {
      // Get the euler velocity.
      const eulerVelocity = target.getComponent(
        EulerVelocityData3D
      ) as EulerVelocityData3D;
      // Get mutable transform data.
      const transform = target.getMutableComponent(
        TransformData3D
      ) as TransformData3D;

      // Change the transform position.
      const deltaD = vec3.create();
      vec3.scale(deltaD, eulerVelocity.velocity.value, delta);
      vec3.add(transform.position.value, transform.position.value, deltaD);
    });
  }
}
