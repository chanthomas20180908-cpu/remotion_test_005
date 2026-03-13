import type { ComponentProps } from "react";
import { Composition } from "remotion";
import { EpsonWideBannerV2Video } from "./Video";

export const epsonWideBannerV2Composition: ComponentProps<typeof Composition> =
  {
    id: "epson-wide-banner-v2",
    component: EpsonWideBannerV2Video,
    width: 1200,
    height: 200,
    fps: 30,
    durationInFrames: 528,
  };
