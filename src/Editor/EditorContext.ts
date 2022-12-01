import { Entity } from "ecsy-wd";

export enum EditorControl {
  View,
  Move,
}

export interface IEditorUIContext {
  entityLists: HTMLCollectionOf<HTMLDivElement> | null;
  entityInspector: HTMLCollectionOf<HTMLDivElement> | null;

  playButton: HTMLButtonElement | null;

  entityNameInput: HTMLInputElement | null;
  createEntityButton: HTMLButtonElement | null;
  deserializeEntityButton: HTMLInputElement | null;

  saveWorldButton: HTMLButtonElement | null;
  loadWorldButton: HTMLButtonElement | null;

  editorModeDropdown: HTMLSelectElement | null;
}

export interface IEditorEventContext {
  onEntitySelected: Array<(entity: Entity) => void>;
}

export interface IEditorControlContext {
  controlMode: EditorControl;
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

  editorModeDropdown: null,
};

export const editorEventContext: IEditorEventContext = {
  onEntitySelected: [],
};

export const editorControlContext: IEditorControlContext = {
  controlMode: EditorControl.Move,
};
