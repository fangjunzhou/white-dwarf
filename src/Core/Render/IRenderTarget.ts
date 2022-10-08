import { mat3 } from "gl-matrix";

export interface IRenderTarget {
  /**
   * The callback function to draw the render target.
   *
   * @param {HTMLCanvasElement} canvas
   * @param {mat3} contextMat
   * @memberof IRenderTarget
   */
  (canvas: HTMLCanvasElement, contextMat: mat3): void;
}
