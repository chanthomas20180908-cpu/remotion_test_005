import "./utils/gsap-setup";
import { HarmonyOS6Video, TOTAL_FRAMES } from "./Video";

export const harmonyOS6Composition = {
  id: "HarmonyOS6",
  component: HarmonyOS6Video,
  durationInFrames: TOTAL_FRAMES,
  fps: 30,
  width: 1920,
  height: 1080,
} as const;
