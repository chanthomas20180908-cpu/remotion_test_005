import type { ComponentType } from "react";
import { FPS, HEIGHT, TOTAL_DURATION, WIDTH } from "./constants";
import { GuoyanMd001DirectorialVideo } from "./Video";

export const guoyanMd001DirectorialComposition: {
  readonly id: string;
  readonly component: ComponentType;
  readonly durationInFrames: number;
  readonly fps: number;
  readonly width: number;
  readonly height: number;
} = {
  id: "GuoyanMd001Directorial",
  component: GuoyanMd001DirectorialVideo,
  durationInFrames: TOTAL_DURATION,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
};
