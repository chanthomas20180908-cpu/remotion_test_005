import type { CSSProperties, FC, ReactNode } from "react";
import { BRAND } from "../constants";

type GlassCardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export const GlassCard: FC<GlassCardProps> = ({ children, style }) => {
  return (
    <div
      style={{
        borderRadius: 36,
        background: BRAND.surface,
        border: `1px solid ${BRAND.line}`,
        boxShadow: BRAND.shadow,
        backdropFilter: "blur(24px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
