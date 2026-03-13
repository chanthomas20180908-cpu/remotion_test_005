import type { ComponentType } from "react";
import { Video } from "./Video";
import {
  MVP_FPS,
  MVP_HEIGHT,
  MVP_TOTAL_DURATION_IN_FRAMES,
  MVP_WIDTH,
} from "./constants";

export const mvpHarmonyOS6Composition: {
  id: string;
  component: ComponentType;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps: Record<string, never>;
} = {
  // Remotion Composition id 不允许下划线
  id: "HarmonyOS6-MVP-Templates",
  component: Video,
  durationInFrames: MVP_TOTAL_DURATION_IN_FRAMES,
  fps: MVP_FPS,
  width: MVP_WIDTH,
  height: MVP_HEIGHT,
  defaultProps: {},
};
