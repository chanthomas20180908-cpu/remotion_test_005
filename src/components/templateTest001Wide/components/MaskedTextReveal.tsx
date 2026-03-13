import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easePower4Out } from "./easing";

export type MaskedTextRevealProps = {
  startFrame: number;
  duration: number;
  yFrom: number;
  style: React.CSSProperties;
  children: React.ReactNode;
};

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  startFrame,
  duration,
  yFrom,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easePower4Out,
  });

  const y = interpolate(p, [0, 1], [yFrom, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ ...style, transform: `translateY(${y}px)` }}>
        {children}
      </div>
    </div>
  );
};
