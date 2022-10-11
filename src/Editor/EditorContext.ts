import { Entity } from "ecsy/Entity";

export interface IEditorRenderContext {
  mainCanvas: HTMLCanvasElement | null;
  mainCamera: Entity | null;
}

export interface IEditorUIContext {
  entityLists: HTMLCollectionOf<HTMLDivElement> | null;
  entityInspector: HTMLCollectionOf<HTMLDivElement> | null;

  playButton: HTMLButtonElement | null;

  entityNameInput: HTMLInputElement | null;
  createEntityButton: HTMLButtonElement | null;
}

export interface IEditorEventContext {
  onEntitySelected: Array<(entity: Entity) => void>;
}

export const editorRenderContext: IEditorRenderContext = {
  mainCanvas: null,
  mainCamera: null,
};

export const editorUIContext: IEditorUIContext = {
  entityLists: null,
  entityInspector: null,
  playButton: null,
  entityNameInput: null,
  createEntityButton: null,
};

export const editorEventContext: IEditorEventContext = {
  onEntitySelected: [],
};
