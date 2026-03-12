import type { FC } from "react";
import { BRAND } from "../constants";

type MetricBadgeProps = {
  value: string;
  label: string;
  width?: number;
};

export const MetricBadge: FC<MetricBadgeProps> = ({ value, label, width }) => {
  return (
    <div
      style={{
        width,
        padding: "24px 28px",
        borderRadius: 28,
        background: BRAND.surfaceStrong,
        border: `1px solid ${BRAND.line}`,
        boxShadow: BRAND.shadow,
      }}
    >
      <div
        style={{
          fontSize: 52,
          lineHeight: 1,
          letterSpacing: -2,
          fontWeight: 800,
          color: BRAND.text,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          color: BRAND.muted,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};
