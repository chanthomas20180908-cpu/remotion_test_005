import { BRAND_COLORS } from "../constants";

export const palette = {
  background:
    "radial-gradient(circle at 15% 18%, rgba(84, 199, 255, 0.22), transparent 28%), radial-gradient(circle at 82% 20%, rgba(125, 107, 255, 0.18), transparent 26%), linear-gradient(135deg, #f8fbff 0%, #edf4ff 42%, #f9fbff 100%)",
  cardBorder: `1px solid ${BRAND_COLORS.line}`,
  cardShadow: BRAND_COLORS.shadow,
  textPrimary: BRAND_COLORS.ink,
  textSecondary: "rgba(8, 20, 38, 0.72)",
  textMuted: "rgba(8, 20, 38, 0.5)",
  highlight:
    "linear-gradient(135deg, rgba(31, 111, 255, 0.96), rgba(84, 199, 255, 0.92))",
  glow: "0 0 0 1px rgba(255,255,255,0.5) inset, 0 18px 60px rgba(31, 111, 255, 0.14)",
} as const;
