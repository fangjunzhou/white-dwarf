import { System, SystemQueries } from "ecsy-wd";
import { ImageRenderData2D } from "../../DataComponent/ImageRenderData2D";

export class Canvas2DImageLoader extends System {
  static queries: SystemQueries = {
    imageEntities: {
      components: [ImageRenderData2D],
      listen: {
        added: true,
        changed: true,
      },
    },
  };

  execute(delta: number, time: number): void {
    this.queries.imageEntities.results.forEach((imageEntity) => {
      const imageRenderData = imageEntity.getMutableComponent(
        ImageRenderData2D
      ) as ImageRenderData2D;

      const img = new Image();
      img.src = imageRenderData.src;
      img.onload = () => {
        imageRenderData.img = img;
      };
    });
  }
}
