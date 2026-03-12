import { HarmonyOS6Video } from "./Video";
import { TOTAL_DURATION_IN_FRAMES, VIDEO_META } from "./constants";

export { HarmonyOS6Video, TOTAL_DURATION_IN_FRAMES, VIDEO_META };

export const harmonyOS6Composition = {
  id: VIDEO_META.id,
  component: HarmonyOS6Video,
  durationInFrames: TOTAL_DURATION_IN_FRAMES,
  fps: VIDEO_META.fps,
  width: VIDEO_META.width,
  height: VIDEO_META.height,
} as const;
