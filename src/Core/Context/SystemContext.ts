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
   */
  coreStart: () => void;
}
