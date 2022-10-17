import { Entity } from "ecsy/Entity";

export interface IEditorUIContext {
  entityLists: HTMLCollectionOf<HTMLDivElement> | null;
  entityInspector: HTMLCollectionOf<HTMLDivElement> | null;

  playButton: HTMLButtonElement | null;

  entityNameInput: HTMLInputElement | null;
  createEntityButton: HTMLButtonElement | null;
  deserializeEntityButton: HTMLInputElement | null;

  saveWorldButton: HTMLButtonElement | null;
  loadWorldButton: HTMLButtonElement | null;
}

export interface IEditorEventContext {
  onEntitySelected: Array<(entity: Entity) => void>;
}

export const editorUIContext: IEditorUIContext = {
  entityLists: null,
  entityInspector: null,
  playButton: null,
  entityNameInput: null,
  createEntityButton: null,
  deserializeEntityButton: null,
  saveWorldButton: null,
  loadWorldButton: null,
};

export const editorEventContext: IEditorEventContext = {
  onEntitySelected: [],
};
