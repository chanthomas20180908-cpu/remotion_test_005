import type { ComponentType } from "react";
import { Video } from "./Video";
import {
  TOTAL_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./constants";

export const harmonyos6SixShotsComposition: {
  id: string;
  component: ComponentType;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps: Record<string, never>;
} = {
  id: "HarmonyOS6SixShots",
  component: Video,
  durationInFrames: TOTAL_DURATION_IN_FRAMES,
  fps: VIDEO_FPS,
  width: VIDEO_WIDTH,
  height: VIDEO_HEIGHT,
  defaultProps: {},
};
