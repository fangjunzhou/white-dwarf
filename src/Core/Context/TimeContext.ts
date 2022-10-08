export interface ITimeContext {
  // Start time stamp.
  startTime: number;
  // Current time stamp.
  currentTime: number;
  // Delta time.
  deltaTime: number;

  // Time scale.
  timeScale: number;
  // Fixed time step (used for physics world).
  fixedTimeStep: number;
}
