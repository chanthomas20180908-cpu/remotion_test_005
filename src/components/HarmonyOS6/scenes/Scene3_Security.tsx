import { AbsoluteFill, useCurrentFrame, Easing, interpolate } from "remotion";
import React from "react";
import { VISUAL_SYSTEM } from "../VisualSystem";
import { MaskedReveal } from "../components/MaskedReveal";

const { COLORS, TYPOGRAPHY, GRID } = VISUAL_SYSTEM;

const textContainerWidth = (100 / GRID.TOTAL_COLUMNS) * GRID.TEXT_BLOCK_COLUMNS;
const visualContainerWidth =
  (100 / GRID.TOTAL_COLUMNS) * GRID.VISUAL_BLOCK_COLUMNS;
const safetyMargin = `${GRID.SAFETY_MARGIN_PERCENT}%`;

export const Scene3_Security: React.FC = () => {
  const frame = useCurrentFrame();

  const pullMotion = interpolate(frame, [0, 120], [1.05, 1], {
    easing: Easing.inOut(Easing.ease),
  });

  // Placeholder for the visual element on the left
  const VisualPlaceholder: React.FC = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: COLORS.TINTED_GREY,
          fontSize: 30,
        }}
      >
        [Shield Icon Placeholder]
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BACKGROUND,
        flexDirection: "row",
        padding: `0 ${safetyMargin}`,
        transform: `scale(${pullMotion})`,
      }}
    >
      {/* Left side: Visual */}
      <div
        style={{
          width: `${visualContainerWidth}%`,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "5%",
        }}
      >
        <VisualPlaceholder />
      </div>

      {/* Right side: Text */}
      <div
        style={{
          width: `${textContainerWidth}%`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <MaskedReveal
          text="更安全"
          startFrame={10}
          fontSize={TYPOGRAPHY.SCENE_TITLE.fontSize}
          fontWeight={TYPOGRAPHY.SCENE_TITLE.fontWeight as "700"}
        />
        <MaskedReveal
          text="星盾架构，主动安全"
          startFrame={20}
          fontSize={TYPOGRAPHY.BODY.fontSize}
          fontWeight={TYPOGRAPHY.BODY.fontWeight as "400"}
          letterSpacing={TYPOGRAPHY.BODY.letterSpacing}
          delay={5}
        />
      </div>
    </AbsoluteFill>
  );
};
