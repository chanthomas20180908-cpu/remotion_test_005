export const MVP_FPS = 30;
export const MVP_WIDTH = 1920;
export const MVP_HEIGHT = 1080;

// SAFE 模式：统一固定节奏，减少波动
export const MVP_TRANSITION = 12;
export const MVP_ENTRY_BUFFER = 12;

export const MVP_SCENE_DURATIONS = [120, 120, 120, 120, 120, 120] as const;

export const MVP_TOTAL_DURATION_IN_FRAMES =
  MVP_SCENE_DURATIONS[0] +
  MVP_SCENE_DURATIONS[1] +
  MVP_SCENE_DURATIONS[2] +
  MVP_SCENE_DURATIONS[3] +
  MVP_SCENE_DURATIONS[4] +
  MVP_SCENE_DURATIONS[5] -
  5 * MVP_TRANSITION;

export const SAFE_X = Math.round(MVP_WIDTH * 0.1);
export const SAFE_Y = Math.round(MVP_HEIGHT * 0.1);

export const COLORS = {
  light: {
    bg: "#F6F8FC",
    surface: "#FFFFFF",
    text: "#0B1220",
    text2: "#334155",
    text3: "#64748B",
    stroke: "#D7E0EC",
  },
  dark: {
    bg: "#060A12",
    surface: "#0A1020",
    text: "#E8EEF8",
    text2: "#9AA7BD",
    text3: "#6B7C99",
    stroke: "#1B2A46",
  },
  accent: {
    cyan: "#3AB7FF",
    teal: "#55E6D5",
    red: "#E60012",
  },
} as const;

export const TYPE = {
  // 低美感但稳定：字号寄存器固定
  hero: {
    fontSize: 120,
    fontWeight: 850,
    lineHeight: 1.0 as const,
    letterSpacing: "-0.02em",
  },
  title: {
    fontSize: 92,
    fontWeight: 850,
    lineHeight: 1.05 as const,
    letterSpacing: "-0.02em",
  },
  body: {
    fontSize: 26,
    fontWeight: 550,
    lineHeight: 1.45 as const,
    letterSpacing: "0.02em",
  },
  small: {
    fontSize: 18,
    fontWeight: 650,
    lineHeight: 1.5 as const,
    letterSpacing: "0.12em",
  },
  metric: {
    fontSize: 160,
    fontWeight: 900,
    lineHeight: 0.95 as const,
    letterSpacing: "-0.03em",
  },
} as const;
