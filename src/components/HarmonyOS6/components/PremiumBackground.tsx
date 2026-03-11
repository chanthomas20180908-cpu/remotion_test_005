import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const PremiumBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(frame, [0, 60, 120], [0.3, 0.5, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Dynamic Glow */}
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          background:
            "radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          opacity: glowOpacity,
          transform: `translate(${Math.sin(frame / 50) * 50}px, ${Math.cos(frame / 50) * 50}px)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
