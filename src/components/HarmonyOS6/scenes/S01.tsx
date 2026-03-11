import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { PremiumBackground } from "../components/PremiumBackground";

export const S01: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 90], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <PremiumBackground>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "120px",
            fontWeight: 800,
            background: "linear-gradient(to right, #fff, #a0d8ef)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            textShadow: "0px 0px 40px rgba(160, 216, 239, 0.4)",
          }}
        >
          HarmonyOS 6
        </h1>
        <p
          style={{
            fontSize: "48px",
            fontWeight: 300,
            marginTop: "20px",
            letterSpacing: "10px",
          }}
        >
          就此不同
        </p>
      </div>
    </PremiumBackground>
  );
};
