import { AbsoluteFill, useCurrentFrame, Easing, interpolate } from "remotion";
import React from "react";
import { VISUAL_SYSTEM } from "../VisualSystem";
import { MaskedReveal } from "../components/MaskedReveal";

const { COLORS } = VISUAL_SYSTEM;

export const Scene1_Opener: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [1, 1.05], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ margin: 0, display: "flex", alignItems: "center" }}>
        <MaskedReveal
          text="6"
          startFrame={10}
          fontSize={140}
          fontWeight="700"
        />
        <div style={{ width: "20px" }} />
        <MaskedReveal
          text="HarmonyOS"
          startFrame={15}
          fontSize={140}
          fontWeight="700"
          letterSpacing="-0.05em"
          delay={5}
        />
      </div>
    </AbsoluteFill>
  );
};
