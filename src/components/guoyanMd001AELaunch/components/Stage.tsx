import type { FC, ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "../constants";

type StageProps = {
  accent: string;
  children: ReactNode;
};

export const Stage: FC<StageProps> = ({ accent, children }) => {
  const frame = useCurrentFrame();

  const gridShift = interpolate(frame, [0, 180], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cameraScale = interpolate(frame, [0, 120], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `radial-gradient(circle at 16% 16%, ${accent}18, transparent 26%), radial-gradient(circle at 84% 20%, ${BRAND.cyan}18, transparent 24%), linear-gradient(145deg, #ffffff 0%, ${BRAND.bg} 58%, #edf4ff 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translateX(${gridShift}px) scale(${cameraScale})`,
          backgroundImage:
            "linear-gradient(90deg, rgba(9,17,31,0.035) 1px, transparent 1px), linear-gradient(rgba(9,17,31,0.03) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -120,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0) 48%, rgba(9,17,31,0.06) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -140,
          width: 760,
          height: 760,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${accent}24 0%, ${accent}06 50%, transparent 72%)`,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -260,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${BRAND.violet}14 0%, rgba(123, 97, 255, 0.03) 52%, transparent 74%)`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
