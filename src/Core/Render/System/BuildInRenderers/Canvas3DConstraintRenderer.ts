import { Entity } from "ecsy";
import { SystemQueries } from "ecsy";
import { mat4, vec3 } from "gl-matrix";
import { TransformData3D } from "../../../Locomotion/DataComponent/TransformData3D";
import { ConstraintData } from "../../../Physics/DataComponents/ConstraintData";
import { LineFrameRenderData3D } from "../../DataComponent/LineFrameRenderData3D";
import { Canvas3DRenderer } from "../Canvas3DRenderer";

export class Canvas3DConstraintRenderer extends Canvas3DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    constraintEntities: {
      components: [TransformData3D, ConstraintData],
    },
  };

  execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }

    // Generate world to camera matrix.
    this.generateWorldToCameraMatrix();
    // Generate camera to screen matrix.
    this.generateCameraToScreenMatrix();

    // Generate world to screen matrix.
    const worldToScreen = mat4.multiply(
      mat4.create(),
      this.cameraToScreen,
      this.worldToCamera
    );

    // All the entities visited this frame.
    const visited: Set<Entity> = new Set<Entity>();
    this.queries.constraintEntities.results.forEach((entity) => {
      const frontier: Array<Entity> = new Array<Entity>();
      // Add the current entity to the frontier.
      frontier.push(entity);
      // DFS.
      while (frontier.length > 0) {
        let curr = frontier.pop() as Entity;
        // If curr node is already visited, continue.
        if (visited.has(curr)) {
          continue;
        }
        visited.add(curr);
        // Check if curr entity has constraint data.
        const currTransform = curr.getComponent(
          TransformData3D
        ) as TransformData3D;

        if (curr.hasComponent(ConstraintData)) {
          // Traverse all constrains.
          curr
            .getComponent(ConstraintData)
            ?.constraints.forEach((constraint) => {
              // Add the constraint to the frontier.
              frontier.push(constraint.target);
              // Get constraint transform.
              const constraintTransform = constraint.target.getComponent(
                TransformData3D
              ) as TransformData3D;

              if (currTransform && constraintTransform) {
                const startPos = vec3.transformMat4(
                  vec3.create(),
                  currTransform.position.value,
                  worldToScreen
                );
                const endPos = vec3.transformMat4(
                  vec3.create(),
                  constraintTransform.position.value,
                  worldToScreen
                );

                this.drawLine(startPos, endPos, "black", 1);
              }
            });
        }
      }
    });
  }
}
