import { World } from "ecsy/World";
import { ITimeContext } from "./Context/TimeContext";

// Main world to hold all game entities.
export const mainWorld = new World();
// Physics world to hold all physics entities.
export const physicsWorld = new World();

// Time context.
export const timeContext: ITimeContext = {
  startTime: 0,
  currentTime: 0,
  deltaTime: 0,
  timeScale: 1,
  fixedTimeStep: 1 / 60,
};

// Frame update.
const mainUpdate = () => {
  // Update time context.
  let currentTime = Date.now() / 1000;
  timeContext.deltaTime =
    (currentTime - timeContext.currentTime) * timeContext.timeScale;
  timeContext.currentTime = currentTime;

  mainWorld.execute(timeContext.deltaTime);
  requestAnimationFrame(mainUpdate);
};

// Physics update.
const physicsUpdate = async () => {
  while (true) {
    physicsWorld.execute(timeContext.fixedTimeStep);

    // Wait for fixed time step.
    await new Promise((resolve) =>
      setTimeout(resolve, timeContext.fixedTimeStep * 1000)
    );
  }
};

export const mainInit = () => {
  // Initialize time context.
  timeContext.startTime = Date.now() / 1000;
  timeContext.currentTime = timeContext.startTime;
  timeContext.deltaTime = 0;

  // Request animation frame.
  requestAnimationFrame(mainUpdate);

  // Start async physics update.
  physicsUpdate();
};
