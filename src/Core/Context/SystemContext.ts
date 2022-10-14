export interface ISystemContext {
  /**
   * Callback function to setup user defined systems.
   * Called both in editor edit mode and release mode.
   */
  coreSetup: () => void;

  /**
   * Callback game begin function.
   * Called only in release mode and editor play mode.
   */
  coreStart: () => void;
}
