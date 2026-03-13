import React from "react";
import { useCurrentFrame, Easing, interpolate } from "remotion";
import { VISUAL_SYSTEM } from "../VisualSystem";

const { FONT_FAMILY, COLORS, TIMING } = VISUAL_SYSTEM;

export const MaskedReveal: React.FC<{
  text: string;
  startFrame: number;
  fontSize: number;
  fontWeight: "400" | "700";
  letterSpacing?: string;
  delay?: number;
}> = ({ text, startFrame, fontSize, fontWeight, letterSpacing, delay = 0 }) => {
  const frame = useCurrentFrame();

  const textAnimation = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + TIMING.TEXT_REVEAL_DURATION],
    [fontSize * 0.8, 0], // Start from a position relative to font size
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.25, 1, 0.5, 1), // power4.out
    },
  );

  const opacity = interpolate(
    frame,
    [startFrame + delay, startFrame + delay + TIMING.TEXT_REVEAL_DURATION / 2],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: `translateY(${textAnimation}px)`,
          opacity: opacity,
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          fontFamily: FONT_FAMILY,
          color: COLORS.PRIMARY_TEXT,
          letterSpacing: letterSpacing,
        }}
      >
        {text}
      </span>
    </div>
  );
};
