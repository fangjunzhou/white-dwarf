import { Entity } from "ecsy/Entity";
import { System } from "ecsy/System";
import { mat4, vec3 } from "gl-matrix";
import { TransformData3D } from "../../Core/Locomotion/DataComponent/TransformData3D";
import { Canvas3DRenderer } from "../../Core/Render/System/Canvas3DRenderer";

export class EditorViewPort3DSystem extends Canvas3DRenderer {
  static inspectEntity: Entity | null = null;
  static inspectTransform: Readonly<TransformData3D> | null = null;

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

    // Draw selected entity.
    if (EditorViewPort3DSystem.inspectTransform) {
      // Generate object to world matrix.
      const objectToWorld = this.objectToWorld(
        EditorViewPort3DSystem.inspectTransform
      );

      // Generate object to screen matrix.
      const objectToScreen = mat4.create();
      mat4.multiply(objectToScreen, this.worldToCamera, objectToWorld);
      mat4.multiply(objectToScreen, this.cameraToScreen, objectToScreen);

      // Draw the axis.
      this.drawAxis(objectToScreen);
    }
  }

  drawAxis(objectToScreen: mat4): void {
    // Generate screen space start point.
    const startPoint = vec3.create();
    vec3.transformMat4(startPoint, [0, 0, 0], objectToScreen);

    // Generate screen space end point.
    const endPointX = vec3.create();
    vec3.transformMat4(endPointX, [1, 0, 0], objectToScreen);
    const endPointY = vec3.create();
    vec3.transformMat4(endPointY, [0, 1, 0], objectToScreen);
    const endPointZ = vec3.create();
    vec3.transformMat4(endPointZ, [0, 0, 1], objectToScreen);

    // Draw the line.
    this.drawLine(startPoint, endPointX, "red", 1);
    this.drawLine(startPoint, endPointY, "green", 1);
    this.drawLine(startPoint, endPointZ, "blue", 1);
  }
}
