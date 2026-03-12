import type { FC, ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type SceneShellProps = {
  children: ReactNode;
  accent: string;
  theme: "light" | "dark";
};

export const SceneShell: FC<SceneShellProps> = ({
  children,
  accent,
  theme,
}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: theme === "dark" ? "#f4f8ff" : "#0d1730",
        fontFamily:
          '"SF Pro Display", "PingFang SC", "Hiragino Sans GB", sans-serif',
        background:
          theme === "dark"
            ? "linear-gradient(180deg, #07111f 0%, #09162b 54%, #06101f 100%)"
            : "linear-gradient(180deg, #f7f9ff 0%, #eef4ff 60%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -200,
          background: `radial-gradient(circle at ${24 + drift * 8}% ${18 + drift * 4}%, ${accent}30, transparent 32%), radial-gradient(circle at ${84 - drift * 7}% ${84 - drift * 5}%, ${accent}22, transparent 24%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: theme === "dark" ? 0.2 : 0.35,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
