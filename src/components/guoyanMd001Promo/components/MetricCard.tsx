import type { FC } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "../styles/palette";

type MetricCardProps = {
  value: string;
  label: string;
  index?: number;
  compact?: boolean;
};

export const MetricCard: FC<MetricCardProps> = ({
  value,
  label,
  index = 0,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const offset = index * 5;
  const y = interpolate(frame, [offset, offset + 22], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [offset, offset + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: compact ? undefined : 1,
        minWidth: compact ? 220 : 0,
        padding: compact ? "24px 24px 22px" : "28px 28px 26px",
        borderRadius: 28,
        background: "rgba(255,255,255,0.76)",
        border: palette.cardBorder,
        boxShadow: palette.cardShadow,
        transform: `translateY(${y}px)`,
        opacity,
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          fontSize: compact ? 42 : 56,
          fontWeight: 900,
          lineHeight: 1,
          background: palette.highlight,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: 14,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: compact ? 22 : 24,
          lineHeight: 1.5,
          color: palette.textSecondary,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
};
