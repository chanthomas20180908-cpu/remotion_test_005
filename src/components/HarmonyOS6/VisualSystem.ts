export const VISUAL_SYSTEM = {
  FONT_FAMILY: `"Helvetica Neue", "Arial", sans-serif`,
  COLORS: {
    BACKGROUND: "#1C1C1E",
    PRIMARY_TEXT: "#F2F2F7",
    ACCENT: "#D84F45",
    TINTED_GREY: "#A0A0A5",
  },
  GRID: {
    SAFETY_MARGIN_PERCENT: 10,
    TEXT_BLOCK_COLUMNS: 4,
    VISUAL_BLOCK_COLUMNS: 7,
    TOTAL_COLUMNS: 12,
  },
  TYPOGRAPHY: {
    DISPLAY_TITLE: {
      fontSize: 140,
      fontWeight: "700",
    },
    SCENE_TITLE: {
      fontSize: 96,
      fontWeight: "700",
    },
    BODY: {
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: "0.08em",
    },
  },
  TIMING: {
    TEXT_REVEAL_DURATION: 30, // in frames
    STAGGER_DELAY: 5, // in frames
  },
  EASING: {
    POWER4_OUT: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
} as const;
