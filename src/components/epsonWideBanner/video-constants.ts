export const EPSON_WIDE_BANNER = {
  // Banner spec: 1200×200, silent
  width: 1200,
  height: 200,
  fps: 30,

  // 节奏：保持克制，但必须“连续镜头”——转场 overlap 不少于 15f。
  transitionDurationInFrames: 15,

  // 4 scenes with 3 overlaps → total = sum(d) - 3*overlap = 240f
  sceneDurationsInFrames: [72, 72, 72, 69],
  totalDurationInFrames: 240,

  // Layout (Swiss / editorial slab)
  layout: {
    leftRatio: 0.38,
    gutter: 32,
  },

  /**
   * 10% safe area (strict). Values are in pixels.
   * width: 1200 → 120; height: 200 → 20
   */
  safe: {
    // 10% safe area: width 1200 → 120; height 200 → 20
    x: 120,
    y: 20,
  },
} as const;

export const EPSON_SCENE_STARTS_IN_FRAMES = [
  0,
  // nextStart = prevStart + prevDuration - transition
  72 - 15,
  72 - 15 + 72 - 15,
  72 - 15 + (72 - 15) + 72 - 15,
] as const;

export type EpsonSceneIndex = 0 | 1 | 2 | 3;
