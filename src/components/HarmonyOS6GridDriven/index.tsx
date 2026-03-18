import {
  getHarmonyOS6GridDrivenTotalDuration,
  HARMONY_OS6_GRID_DRIVEN_SCENES,
  HarmonyOS6GridDrivenVideo,
} from "./Video";

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const VIDEO_FPS = 30;

const totalDuration = getHarmonyOS6GridDrivenTotalDuration(
  HARMONY_OS6_GRID_DRIVEN_SCENES,
);

export const harmonyOS6GridDrivenComposition = {
  id: "HarmonyOS6GridDriven",
  component: HarmonyOS6GridDrivenVideo,
  durationInFrames: totalDuration,
  fps: VIDEO_FPS,
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  defaultProps: {
    scenes: HARMONY_OS6_GRID_DRIVEN_SCENES,
  },
} as const;
