import { EpsonWideBannerVideo } from "./Video";
import { EPSON_WIDE_BANNER } from "./video-constants";

export const epsonWideBannerComposition = {
  id: "EpsonWideBanner",
  component: EpsonWideBannerVideo,
  durationInFrames: EPSON_WIDE_BANNER.totalDurationInFrames,
  fps: EPSON_WIDE_BANNER.fps,
  width: EPSON_WIDE_BANNER.width,
  height: EPSON_WIDE_BANNER.height,
  defaultProps: {},
};
