import { HarmonyOS6Video } from "./Video";

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const VIDEO_FPS = 30;

// All durations are in frames
const SCENE_DURATIONS = {
  SCENE_1: 90,
  SCENE_2: 120,
  SCENE_3: 120,
  SCENE_4: 90,
  SCENE_5: 120,
  SCENE_6: 90,
};

const totalDuration = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const harmonyOS6Composition = {
  id: "HarmonyOS6",
  component: HarmonyOS6Video,
  durationInFrames: totalDuration,
  fps: VIDEO_FPS,
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
} as const;
