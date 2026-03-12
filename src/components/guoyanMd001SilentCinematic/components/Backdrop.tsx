import type { FC, ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../constants";

type BackdropProps = {
  accent: string;
  children: ReactNode;
};

export const Backdrop: FC<BackdropProps> = ({ accent, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowScale = spring({
    fps,
    frame,
    config: {
      damping: 18,
      stiffness: 80,
      mass: 0.8,
    },
  });

  const lineShift = interpolate(frame, [0, 180], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 20% 20%, ${accent}22, transparent 34%), radial-gradient(circle at 82% 18%, ${BRAND.cyan}22, transparent 24%), linear-gradient(135deg, #ffffff 0%, ${BRAND.bg} 52%, #eef4ff 100%)`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translateX(${lineShift}px)`,
          opacity: 0.5,
          backgroundImage:
            "linear-gradient(90deg, rgba(15,23,42,0.02) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.02) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -140,
          width: 780,
          height: 780,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${accent}24 0%, ${accent}10 40%, transparent 72%)`,
          transform: `scale(${0.92 + glowScale * 0.12})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -180,
          bottom: -240,
          width: 700,
          height: 700,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${BRAND.cyan}26 0%, ${BRAND.cyan}08 44%, transparent 70%)`,
          transform: `scale(${1.04 - glowScale * 0.08})`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
