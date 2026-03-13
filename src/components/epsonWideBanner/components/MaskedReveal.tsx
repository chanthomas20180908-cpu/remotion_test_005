import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASING } from "../easing";

export type MaskedRevealProps = {
  /** local frames (within the Scene Sequence) */
  fromFrame: number;
  durationInFrames: number;
  yPx?: number;
  children: React.ReactNode;
};

export const MaskedReveal: React.FC<MaskedRevealProps> = ({
  fromFrame,
  durationInFrames,
  yPx = 38,
  children,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(
    frame,
    [fromFrame, fromFrame + durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASING.power4Out,
    },
  );

  const y = (1 - p) * yPx;
  // 子像素抖动会被误读为“卡顿”：强制落到 0.5px 网格。
  const ySnap = Math.round(y * 2) / 2;

  return (
    <div
      style={
        {
          overflow: "hidden",
        } satisfies React.CSSProperties
      }
    >
      <div
        style={
          {
            transform: `translate3d(0, ${ySnap}px, 0)`,
            willChange: "transform",
          } satisfies React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};
