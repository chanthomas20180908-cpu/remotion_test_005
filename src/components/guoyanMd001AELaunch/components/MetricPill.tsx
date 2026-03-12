import type { FC } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND } from "../constants";

type MetricPillProps = {
  index: number;
  value: string;
  label: string;
};

export const MetricPill: FC<MetricPillProps> = ({ index, value, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    fps,
    frame: Math.max(0, frame - index * 6),
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });

  const glowOpacity = interpolate(frame, [index * 8, index * 8 + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        padding: "22px 28px 20px",
        borderRadius: 28,
        background: BRAND.panelStrong,
        border: `1px solid ${BRAND.line}`,
        boxShadow: BRAND.shadow,
        transform: `translateY(${30 - entrance * 30}px) scale(${0.9 + entrance * 0.1})`,
        opacity: entrance,
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 28,
          background:
            "linear-gradient(135deg, rgba(47,107,255,0.14) 0%, rgba(113,215,255,0.08) 100%)",
          opacity: glowOpacity,
        }}
      />
      <div
        style={{
          position: "relative",
          fontSize: 48,
          fontWeight: 700,
          color: BRAND.text,
        }}
      >
        {value}
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 8,
          fontSize: 22,
          color: BRAND.muted,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};
