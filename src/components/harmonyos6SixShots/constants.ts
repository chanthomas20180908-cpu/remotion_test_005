export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// 安全区：四边 10%（强制大留白，反 PPT）
export const SAFE_X = Math.round(VIDEO_WIDTH * 0.1); // 192
export const SAFE_Y = Math.round(VIDEO_HEIGHT * 0.1); // 108

export const GRID_COLUMNS = 12;

export const TRANSITION_DURATION = 18;
export const ENTRY_BUFFER = TRANSITION_DURATION;

export const SCENE_DURATIONS = {
  S01: 140,
  S02: 132,
  S03: 128,
  S04: 140,
  S05: 130,
  S06: 140,
} as const;

export const TOTAL_DURATION_IN_FRAMES =
  SCENE_DURATIONS.S01 +
  SCENE_DURATIONS.S02 +
  SCENE_DURATIONS.S03 +
  SCENE_DURATIONS.S04 +
  SCENE_DURATIONS.S05 +
  SCENE_DURATIONS.S06 -
  5 * TRANSITION_DURATION;

// tinted greys（禁止 #000000 / #808080 作为主体文字色）
export const COLORS = {
  light: {
    bg: "#F6F8FC",
    surface: "#FFFFFF",
    textPrimary: "#0B1220",
    textSecondary: "#334155",
    textTertiary: "#64748B",
    stroke: "#D7E0EC",
  },
  dark: {
    bg: "#060A12",
    surface: "#0A1020",
    textPrimary: "#E8EEF8",
    textSecondary: "#9AA7BD",
    textTertiary: "#6B7C99",
    stroke: "#1B2A46",
  },
  accent: {
    cyan: "#3AB7FF",
    teal: "#55E6D5",
    red: "#E60012",
  },
} as const;

export const TYPE = {
  display: {
    fontSize: 132,
    fontWeight: 800,
    lineHeight: 1.0,
  },
  title: {
    fontSize: 96,
    fontWeight: 800,
    lineHeight: 1.05,
  },
  sub: {
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.10em",
  },
  metric: {
    fontSize: 168,
    fontWeight: 850,
    lineHeight: 0.95,
  },
} as const;
