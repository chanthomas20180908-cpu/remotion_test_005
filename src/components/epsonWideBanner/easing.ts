import { Easing } from "remotion";

// template_001 约束：运镜 expo.inOut；元素 power4.out。
export const EASING = {
  // 近似 expo.inOut（更电影、推拉干净）
  expoInOut: Easing.bezier(0.87, 0, 0.13, 1),
  // 近似 power4.out（快速落位，克制）
  power4Out: Easing.bezier(0.16, 1, 0.3, 1),
} as const;
