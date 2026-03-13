import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { CANVAS, COLORS } from "../constants";
import { interpolateExpoInOut } from "../utils/easings";

export type SubtleRippleProps = {
  localFrame: number;
};

export const SubtleRipple: React.FC<SubtleRippleProps> = ({ localFrame }) => {
  const start = 22;
  const end = 104;
  const p = interpolateExpoInOut(localFrame, [start, end], [0, 1]);
  const s = 0.85 + 0.55 * p;
  const opacity = interpolate(localFrame, [start, end], [0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: CANVAS.w * 0.68,
          top: CANVAS.h * 0.52,
          width: 140,
          height: 140,
          marginLeft: -70,
          marginTop: -70,
          borderRadius: 999,
          border: `1px solid ${COLORS.brandBlueSoft}`,
          opacity,
          transform: `scale(${s})`,
          transformOrigin: "50% 50%",
        }}
      />
    </AbsoluteFill>
  );
};
