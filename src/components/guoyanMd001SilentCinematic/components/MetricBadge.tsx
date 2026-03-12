import type { FC } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../constants";

type MetricBadgeProps = {
  index: number;
  label: string;
  value: string;
};

export const MetricBadge: FC<MetricBadgeProps> = ({ index, label, value }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = index * 8;

  const rise = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.9,
    },
  });

  const opacity = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        padding: "28px 30px",
        borderRadius: 28,
        background: BRAND.surfaceStrong,
        border: `1px solid ${BRAND.line}`,
        transform: `translateY(${24 - rise * 24}px) scale(${0.94 + rise * 0.06})`,
        opacity,
        boxShadow: "0 20px 70px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: BRAND.blue,
          letterSpacing: -2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          color: BRAND.muted,
        }}
      >
        {label}
      </div>
    </div>
  );
};
