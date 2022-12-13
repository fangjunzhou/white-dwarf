import { Entity } from "ecsy-wd";
import EventEmitter from "events";

export enum EditorControl {
  View,
  Move,
  Rotate,
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
  ee: EventEmitter;
  controlMode: EditorControl;

  setControlMode(mode: EditorControl): void;
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
  ee: new EventEmitter(),
  controlMode: EditorControl.Move,

  setControlMode: function (mode: EditorControl): void {
    this.controlMode = mode;
    this.ee.emit("controlModeChanged", mode);
  },
};
