import type { CSSProperties, FC, ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  style?: CSSProperties;
  dark?: boolean;
};

export const GlassPanel: FC<GlassPanelProps> = ({ children, style, dark }) => {
  return (
    <div
      style={{
        borderRadius: 32,
        padding: 28,
        background: dark
          ? "linear-gradient(180deg, rgba(10, 20, 45, 0.84), rgba(10, 20, 45, 0.54))"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(246, 249, 255, 0.7))",
        border: dark
          ? "1px solid rgba(120, 200, 255, 0.18)"
          : "1px solid rgba(111, 124, 255, 0.12)",
        boxShadow: dark
          ? "0 28px 60px rgba(0, 0, 0, 0.34)"
          : "0 28px 60px rgba(111, 124, 255, 0.14)",
        backdropFilter: "blur(18px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
