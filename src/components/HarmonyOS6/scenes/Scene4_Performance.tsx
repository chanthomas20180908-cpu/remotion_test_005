import { AbsoluteFill, useCurrentFrame, Easing, interpolate } from "remotion";
import React from "react";
import { VISUAL_SYSTEM } from "../VisualSystem";
import { MaskedReveal } from "../components/MaskedReveal";

const { COLORS, TYPOGRAPHY } = VISUAL_SYSTEM;

export const Scene4_Performance: React.FC = () => {
  const frame = useCurrentFrame();

  const pushAndOrbitProgress = interpolate(frame, [0, 90], [0, 1]);

  const scale = interpolate(pushAndOrbitProgress, [0, 0.5, 1], [1.5, 1, 1], {
    easing: Easing.out(Easing.ease),
  });

  const perspective = interpolate(pushAndOrbitProgress, [0, 1], [2000, 1000]);

  const rotateY = interpolate(pushAndOrbitProgress, [0.2, 1], [-15, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
  });

  const opacity = interpolate(pushAndOrbitProgress, [0, 0.3], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        perspective: perspective,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotateY(${rotateY}deg)`,
          opacity: opacity,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <MaskedReveal
          text="15"
          startFrame={10}
          fontSize={TYPOGRAPHY.DISPLAY_TITLE.fontSize * 1.5}
          fontWeight={TYPOGRAPHY.DISPLAY_TITLE.fontWeight as "700"}
        />
        <MaskedReveal
          text="%"
          startFrame={15}
          fontSize={TYPOGRAPHY.SCENE_TITLE.fontSize}
          fontWeight={TYPOGRAPHY.SCENE_TITLE.fontWeight as "700"}
          delay={5}
        />
      </div>
      <div style={{ position: "absolute", bottom: "25%" }}>
        <MaskedReveal
          text="流畅度提升"
          startFrame={25}
          fontSize={TYPOGRAPHY.BODY.fontSize}
          fontWeight={TYPOGRAPHY.BODY.fontWeight as "400"}
          letterSpacing={TYPOGRAPHY.BODY.letterSpacing}
        />
      </div>
    </AbsoluteFill>
  );
};
