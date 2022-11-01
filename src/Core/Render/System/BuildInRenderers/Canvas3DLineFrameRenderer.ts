import { System, SystemQueries } from "ecsy/System";
import { vec2 } from "gl-matrix";
import { TransformData3D } from "../../../Locomotion/DataComponent/TransformData3D";
import { LineFrameRenderData3D } from "../../DataComponent/LineFrameRenderData3D";
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

    // Get the canvas size.
    const canvasSize = vec2.fromValues(
      this.mainCanvas.width,
      this.mainCanvas.height
    );
    // Get Camera Position.
  }
}
