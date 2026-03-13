import { EpsonBannerVideo } from "./Video";

// --- 时间轴定义 ---
const SCENE_DURATION = 90;
const TRANSITION_DURATION = 30;
const NUM_SCENES = 4;

// 总时长 = 场景1时长 + (后续场景数 * (场景时长 + 转场时长))
const totalDuration =
  SCENE_DURATION + (NUM_SCENES - 1) * (SCENE_DURATION + TRANSITION_DURATION);

export const epsonBannerComposition = {
  id: "EpsonBanner",
  component: EpsonBannerVideo,
  durationInFrames: totalDuration,
  fps: 30,
  width: 1200,
  height: 200,
};
