import type { FC } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, SAFE } from "../constants";

export const MotifOverlay: FC = () => {
  const frame = useCurrentFrame();

  const breathe = interpolate(frame % 90, [0, 45, 90], [0.28, 0.34, 0.28], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const left = SAFE.x;
  const right = 1920 - SAFE.x;
  const top = SAFE.y;
  const bottom = 1080 - SAFE.y;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Crosshair（母题越界继承） */}
      <div
        style={{
          position: "absolute",
          left,
          right: 1920 - right,
          top,
          bottom: 1080 - bottom,
          opacity: breathe,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "40%",
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: COLORS.hairline,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: 1,
            backgroundColor: COLORS.hairline,
          }}
        />
      </div>

      {/* 右侧视觉窗框（跨场持续存在，避免切页感） */}
      <div
        style={{
          position: "absolute",
          left: 200 + Math.round((1520 / 12) * 5) + 24,
          top: SAFE.y + 40,
          width: Math.round((1520 / 12) * 7) - 24,
          height: 1080 - SAFE.y * 2 - 80,
          border: `1px solid rgba(36, 48, 66, 0.72)`,
          opacity: 0.85,
        }}
      />
    </AbsoluteFill>
  );
};
