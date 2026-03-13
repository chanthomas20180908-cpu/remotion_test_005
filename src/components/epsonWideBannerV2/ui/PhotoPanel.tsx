import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { CANVAS, COLORS, SCENE, type SceneKind } from "../constants";
import { interpolateExpoInOut, interpolatePower4Out } from "../utils/easings";

export type PhotoPanelProps = {
  localFrame: number;
  imageSrc: string;
  kind: SceneKind;
};

export const PhotoPanel: React.FC<PhotoPanelProps> = ({
  localFrame,
  imageSrc,
  kind,
}) => {
  const contentDelay = SCENE.transitionFrames + 6;

  const frameIn = interpolateExpoInOut(
    localFrame,
    [contentDelay - 8, contentDelay + 14],
    [0, 1],
  );
  const panelX = interpolatePower4Out(
    localFrame,
    [contentDelay, contentDelay + 18],
    [18, 0],
  );
  const innerX = interpolatePower4Out(
    localFrame,
    [contentDelay, contentDelay + 22],
    [-10, 0],
  );
  const borderOpacity = 0.95;

  // “完整展示”优先：前景 contain；环境层在 AmbientLayer 做。
  const fit = kind === "brand" ? "contain" : "contain";

  const panelBreath = interpolateExpoInOut(
    localFrame,
    [contentDelay + 20, SCENE.duration - 18],
    [0, 1],
  );
  const panelScale = 1 + 0.01 * panelBreath;

  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${panelX}px) scale(${panelScale})`,
        transformOrigin: "50% 50%",
        opacity: frameIn,
      }}
    >
      <div
        style={{
          width: "100%",
          height: CANVAS.contentH,
          backgroundColor: COLORS.panel,
          border: `1px solid ${COLORS.hairline}`,
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <AbsoluteFill style={{ padding: 10 }}>
          <Img
            src={imageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: fit,
              transform: `translateX(${innerX}px)`,
              transformOrigin: "50% 50%",
              borderRadius: 1,
              border: `1px solid rgba(215, 220, 235, ${borderOpacity})`,
            }}
          />
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
