import type { CSSProperties } from "react";

export type SceneKind = "brand" | "photo";

export type SceneContent = {
  kind: SceneKind;
  imageSrc: string;
  kicker: string;
  title: string;
  subtitle: string;
};

export const SCENE = {
  fps: 30,
  duration: 120,
  transitionFrames: 18,
  starts: [0, 102, 204, 306, 408],
  total: 528,
} as const;

export const COLORS = {
  brandBlue: "#3A469A",
  brandBlueSoft: "#525EA6",
  ink: "#141A2B",
  body: "#2A324A",
  muted: "#55607A",
  hairline: "#D7DCEB",
  canvas: "#F3F5FA",
  panel: "#FFFFFF",
} as const;

export const CANVAS = {
  w: 1200,
  h: 200,
  safeX: 120,
  safeY: 24,
  contentW: 960,
  contentH: 152,
  leftW: 384,
  rightW: 576,
  gap: 36,
  root: {
    backgroundColor: COLORS.canvas,
  } satisfies CSSProperties,
} as const;

export const TYPE = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  kicker: {
    fontSize: 12,
    letterSpacing: "0.16em",
    fontWeight: 700,
  } satisfies CSSProperties,
  title: {
    fontSize: 96,
    fontWeight: 800,
    lineHeight: 0.9,
    letterSpacing: "-0.02em",
  } satisfies CSSProperties,
  subtitle: {
    fontSize: 18,
    letterSpacing: "0.12em",
    fontWeight: 600,
  } satisfies CSSProperties,
} as const;

// Skill usage report (embedded, per requirements):
// - visual-hierarchy-refactoring: large safe zones + tinted greys + strong whitespace
// - typography-system: extreme size contrast (96px title vs 12–18px small text)
// - motion-graphic-director: motif inheritance (blue hinge line) + focus handoff + always-moving background
// - design-motion-principles: Jakub-polish + Emil-restraint; no fades as primary transitions; masked text only
