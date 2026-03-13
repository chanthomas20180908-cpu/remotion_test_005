import { GuoyanMd001Template001Wide20sVideo } from "./Video";
import { TOTAL_DURATION_IN_FRAMES, VIDEO_META } from "./constants";

export const guoyanMd001Template001Wide20sComposition = {
  id: "GuoyanMd001Template001Wide20s",
  component: GuoyanMd001Template001Wide20sVideo,
  durationInFrames: TOTAL_DURATION_IN_FRAMES,
  fps: VIDEO_META.fps,
  width: VIDEO_META.width,
  height: VIDEO_META.height,
  defaultProps: {},
} as const;
