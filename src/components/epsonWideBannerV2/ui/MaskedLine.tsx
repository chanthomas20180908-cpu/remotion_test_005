import React from "react";
import { interpolate } from "remotion";
import { interpolatePower4Out } from "../utils/easings";

export type MaskedLineProps = {
  localFrame: number;
  delay: number;
  children: React.ReactNode;
};

export const MaskedLine: React.FC<MaskedLineProps> = ({
  localFrame,
  delay,
  children,
}) => {
  const reveal = interpolatePower4Out(localFrame, [delay, delay + 16], [0, 1]);
  const opacity = interpolate(localFrame, [delay, delay + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        overflow: "hidden",
        opacity,
        transform: `translateY(${(1 - reveal) * 6}px)`,
      }}
    >
      {children}
    </div>
  );
};
