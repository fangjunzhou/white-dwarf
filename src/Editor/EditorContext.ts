import { Entity } from "ecsy/Entity";

export interface IEditorRenderContext {
  mainCanvas: HTMLCanvasElement | null;
  mainCamera: Entity | null;
}

export interface IEditorUIContext {
  entityLists: HTMLCollectionOf<HTMLDivElement> | null;
}

export const EditorRenderContext: IEditorRenderContext = {
  mainCanvas: null,
  mainCamera: null,
};

export const EditorUIContext: IEditorUIContext = {
  entityLists: null,
};
