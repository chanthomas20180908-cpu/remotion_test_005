import {
  getHarmonyOS6OfficialGridDrivenTotalDuration,
  HARMONY_OS6_OFFICIAL_GRID_DRIVEN_SCENES,
  HarmonyOS6OfficialGridDrivenVideo,
} from "./Video";

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const VIDEO_FPS = 30;

const totalDuration = getHarmonyOS6OfficialGridDrivenTotalDuration(
  HARMONY_OS6_OFFICIAL_GRID_DRIVEN_SCENES,
);

export const harmonyOS6OfficialGridDrivenComposition = {
  id: "HarmonyOS6OfficialGridDriven",
  component: HarmonyOS6OfficialGridDrivenVideo,
  durationInFrames: totalDuration,
  fps: VIDEO_FPS,
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  defaultProps: {
    scenes: HARMONY_OS6_OFFICIAL_GRID_DRIVEN_SCENES,
  },
} as const;
