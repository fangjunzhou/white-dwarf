import { SystemQueries } from "ecsy-wd";
import { TransformData3D } from "../../../../Locomotion/DataComponent/TransformData3D";
import { MeshRenderData3D } from "../../../DataComponent/MeshRenderData3D";
import { CanvasWebGLRenderer } from "../../CanvasWebGLRenderer";

export class WebGLOpaqueRenderer extends CanvasWebGLRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    imageEntities: {
      components: [TransformData3D, MeshRenderData3D],
    },
  };

  public execute(delta: number, time: number): void {
    try {
      super.execute(delta, time);
    } catch (error) {
      console.warn(error);
      return;
    }
  }
}
