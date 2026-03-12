import type { FC, ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "../constants";

type BackdropProps = {
  accent: string;
  children: ReactNode;
};

export const Backdrop: FC<BackdropProps> = ({ accent, children }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `radial-gradient(circle at 18% 18%, rgba(122, 216, 255, 0.16) 0%, rgba(122, 216, 255, 0) 36%), radial-gradient(circle at 82% 22%, rgba(127, 109, 255, 0.14) 0%, rgba(127, 109, 255, 0) 34%), linear-gradient(180deg, #fbfdff 0%, ${BRAND.bg} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -220,
          background: `conic-gradient(from ${-40 + drift * 60}deg, rgba(255,255,255,0) 0deg, ${accent}14 75deg, rgba(255,255,255,0) 150deg, rgba(122,216,255,0.14) 210deg, rgba(255,255,255,0) 290deg, rgba(255,255,255,0) 360deg)`,
          filter: "blur(70px)",
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(8,16,29,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8,16,29,0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.18,
          transform: `translate(${drift * 28}px, ${drift * 18}px) scale(1.04)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -200,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: `${accent}18`,
          filter: "blur(18px)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
