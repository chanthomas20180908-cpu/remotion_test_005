export const VIDEO_META = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const TRANSITION_DURATION = 16;

export const SCENE_DURATIONS = {
  S01: 140,
  S02: 120,
  S03: 120,
  S04: 120,
  S05: 140,
} as const;

export const TOTAL_DURATION_IN_FRAMES =
  SCENE_DURATIONS.S01 +
  SCENE_DURATIONS.S02 +
  SCENE_DURATIONS.S03 +
  SCENE_DURATIONS.S04 +
  SCENE_DURATIONS.S05 -
  4 * TRANSITION_DURATION;

export const SAFE = {
  x: 200,
  y: 120,
} as const;

export const GRID = {
  columns: 12,
  gutter: 24,
  contentWidth: VIDEO_META.width - SAFE.x * 2,
} as const;

export const COLORS = {
  bg: "#0B0F14",
  ink: "#E7EEF8",
  ink2: "#A8B3C4",
  ink3: "#6D7A90",
  hairline: "#243042",
  accent: "#69D2FF",
} as const;

// 资源路径声明（最终建议迁移到本组件 assets/ 下的本地文件）
export const ASSET_PATHS = {
  bgm: "HarmonyOS6/audio/bgm.wav",
  gifBars: "guoyan_md_001/assets/img_0001_97b99e67.gif",
  gifDashed: "guoyan_md_001/assets/img_0002_1d36845f.gif",
  square: "guoyan_md_001/assets/img_0003_09b31eda.png",
  cctv: "guoyan_md_001/assets/img_0004_d663462d.png",
  product: "guoyan_md_001/assets/img_0007_0484ec55.png",
  team: "guoyan_md_001/assets/img_0008_3c26f3bb.png",
  proof: "guoyan_md_001/assets/img_0009_a7fe64a2.png",
  award: "guoyan_md_001/assets/img_0010_897d31dd.png",
  qr: "guoyan_md_001/assets/img_0011_b5d50229.jpg",
} as const;
