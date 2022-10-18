import { IWorldObject } from "../Serialization/WorldSerializer";

export interface CoreStartProps {
  worldObject?: IWorldObject;
}

export interface ISystemContext {
  /**
   * Callback function when engine core setup is called.
   * Core setup is the first function called by the engine.
   * Called both in editor edit mode and release mode.
   */
  coreSetup: () => void;

  /**
   * Callback game begin function.
   * Called only in release mode and editor play mode.
   * Register game play systems here.
   */
  coreStart: (props: CoreStartProps) => Promise<void>;

  /**
   * Callback when editor is initialized.
   * Register editor related systems here.
   */
  editorStart: () => void;
}
