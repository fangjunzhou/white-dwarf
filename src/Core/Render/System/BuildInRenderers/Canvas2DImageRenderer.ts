import { SystemQueries } from "ecsy/System";
import { TransformData2D } from "../../../Locomotion/DataComponent/TransformData2D";
import { ImageRenderData2D } from "../../DataComponent/ImageRenderData2D";
import { Canvas2DRenderer } from "../Canvas2DRenderer";

export class Canvas2DImageRenderer extends Canvas2DRenderer {
  static queries: SystemQueries = {
    ...this.queries,
    imageEntities: {
      components: [ImageRenderData2D, TransformData2D],
    },
  };

  override execute(delta: number, time: number): void {
    super.execute(delta, time);
  }
}
