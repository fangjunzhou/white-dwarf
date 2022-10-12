export interface ISystemContext {
  // Callback function to setup user defined systems.
  userSetup: () => void;

  // Callback game begin function.
  playerStart: () => void;
}
