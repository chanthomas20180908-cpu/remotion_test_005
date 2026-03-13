import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASING } from "../easing";

export type ClipRevealProps = {
  /** local frames (within the Scene Sequence) */
  fromFrame: number;
  durationInFrames: number;
  children: React.ReactNode;
};

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

const pct = (v01: number): string => {
  const v = clamp01(v01);
  return `${Math.round(v * 1000) / 10}%`;
};

/**
 * 纯裁切揭示（不做内容位移），避免与外层“上下切换”产生双重位移导致卡顿。
 * 从底部向上揭示：top boundary 向上移动，bottom 固定。
 */
export const ClipReveal: React.FC<ClipRevealProps> = ({
  fromFrame,
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();

  const p = clamp01(
    interpolate(frame, [fromFrame, fromFrame + durationInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASING.power4Out,
    }),
  );

  const yTop = 1 - p;
  const clipPath = `polygon(0 ${pct(yTop)}, 100% ${pct(yTop)}, 100% 100%, 0 100%)`;

  return (
    <div
      style={
        {
          clipPath,
          WebkitClipPath: clipPath,
          willChange: "clip-path",
        } satisfies React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
