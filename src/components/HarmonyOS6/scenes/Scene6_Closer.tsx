import { AbsoluteFill, useCurrentFrame, Easing, interpolate } from "remotion";
import React from "react";
import { VISUAL_SYSTEM } from "../VisualSystem";
import { MaskedReveal } from "../components/MaskedReveal";

const { COLORS, TYPOGRAPHY } = VISUAL_SYSTEM;

// A simple placeholder for the Huawei Logo
const HuaweiLogo: React.FC = () => {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#D84F45",
        fontWeight: "bold",
        fontSize: 14,
      }}
    >
      LOGO
    </div>
  );
};

export const Scene6_Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        opacity: opacity,
      }}
    >
      <HuaweiLogo />
      <div style={{ height: 40 }} />
      <MaskedReveal
        text="HarmonyOS"
        startFrame={20}
        fontSize={TYPOGRAPHY.SCENE_TITLE.fontSize}
        fontWeight={TYPOGRAPHY.SCENE_TITLE.fontWeight as "700"}
        letterSpacing="-0.02em"
      />
    </AbsoluteFill>
  );
};
