import type { CSSProperties, FC, ReactNode } from "react";
import { BRAND } from "../constants";

type GlassPanelProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export const GlassPanel: FC<GlassPanelProps> = ({ children, style }) => {
  return (
    <div
      style={{
        background: BRAND.surface,
        backdropFilter: "blur(24px)",
        border: `1px solid ${BRAND.line}`,
        boxShadow: BRAND.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
