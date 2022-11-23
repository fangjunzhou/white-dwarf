import { Entity } from "ecsy";

export interface IEditorRenderContext {
  mainCanvas: HTMLCanvasElement | null;
  mainCamera: Entity | null;
}

export const coreRenderContext: IEditorRenderContext = {
  mainCanvas: null,
  mainCamera: null,
};
