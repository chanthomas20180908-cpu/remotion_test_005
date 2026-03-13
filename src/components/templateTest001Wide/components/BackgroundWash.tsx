import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./tokens";
import { easeExpoInOut } from "./easing";

export type BackgroundWashProps = {
  startFrame: number;
  durationInFrames: number;
};

export const BackgroundWash: React.FC<BackgroundWashProps> = ({
  startFrame,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - startFrame;

  const p = interpolate(local, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpoInOut,
  });

  // 极慢 Ken Burns：永远在动，但几乎不可察。
  const scale = interpolate(p, [0, 1], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(p, [0, 1], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(p, [0, 1], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: -80,
        width: width + 160,
        height: height + 160,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        backgroundColor: COLORS.bg,
        // 非夸张的层次：极轻的冷灰径向提亮。
        backgroundImage: `radial-gradient(1200px 700px at 12% 18%, ${COLORS.bg2} 0%, ${COLORS.bg} 62%)`,
      }}
    />
  );
};
