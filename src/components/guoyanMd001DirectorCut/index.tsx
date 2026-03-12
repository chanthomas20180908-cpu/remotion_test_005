import { GuoyanMd001DirectorCutVideo } from "./Video";
import { TOTAL_DURATION_IN_FRAMES, VIDEO_META } from "./constants";

export { GuoyanMd001DirectorCutVideo, TOTAL_DURATION_IN_FRAMES, VIDEO_META };

export const guoyanMd001DirectorCutComposition = {
  id: VIDEO_META.id,
  component: GuoyanMd001DirectorCutVideo,
  durationInFrames: TOTAL_DURATION_IN_FRAMES,
  fps: VIDEO_META.fps,
  width: VIDEO_META.width,
  height: VIDEO_META.height,
} as const;
