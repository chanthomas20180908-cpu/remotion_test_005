import React from "react";
import { AbsoluteFill } from "remotion";
import { CANVAS, COLORS, SCENE, TYPE, type SceneContent } from "../constants";
import { MaskedLine } from "./MaskedLine";
import { PhotoPanel } from "./PhotoPanel";
import { interpolateExpoInOut, interpolatePower4Out } from "../utils/easings";

export type BannerLayoutProps = {
  localFrame: number;
  content: SceneContent;
  isFirst: boolean;
};

export const BannerLayout: React.FC<BannerLayoutProps> = ({
  localFrame,
  content,
  isFirst,
}) => {
  const contentDelay = SCENE.transitionFrames + 6;

  const titleY = interpolatePower4Out(
    localFrame,
    [contentDelay, contentDelay + 16],
    [36, 0],
  );
  const subY = interpolatePower4Out(
    localFrame,
    [contentDelay + 10, contentDelay + 28],
    [28, 0],
  );
  const kickerY = interpolatePower4Out(
    localFrame,
    [contentDelay + 2, contentDelay + 16],
    [18, 0],
  );

  const textOpacity = isFirst
    ? 1
    : interpolateExpoInOut(
        localFrame,
        [contentDelay - 6, contentDelay + 6],
        [0, 1],
      );

  const hingeBreath = interpolateExpoInOut(
    localFrame,
    [contentDelay + 24, SCENE.duration - 18],
    [0, 1],
  );
  const hingeScale = 1 + 0.02 * hingeBreath;

  return (
    <AbsoluteFill
      style={{
        paddingLeft: CANVAS.safeX,
        paddingRight: CANVAS.safeX,
        paddingTop: CANVAS.safeY,
        paddingBottom: CANVAS.safeY,
        display: "flex",
        flexDirection: "row",
        gap: CANVAS.gap,
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          width: CANVAS.leftW,
          height: CANVAS.contentH,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: TYPE.fontFamily,
          color: COLORS.ink,
          opacity: textOpacity,
        }}
      >
        <MaskedLine localFrame={localFrame} delay={contentDelay + 2}>
          <div
            style={{
              ...TYPE.kicker,
              color: COLORS.muted,
              transform: `translateY(${kickerY}px)`,
            }}
          >
            {content.kicker}
          </div>
        </MaskedLine>

        <MaskedLine localFrame={localFrame} delay={contentDelay}>
          <div
            style={{
              ...TYPE.title,
              transform: `translateY(${titleY}px)`,
            }}
          >
            {content.title}
          </div>
        </MaskedLine>

        <div style={{ height: 10 }} />

        <MaskedLine localFrame={localFrame} delay={contentDelay + 12}>
          <div
            style={{
              ...TYPE.subtitle,
              color: COLORS.body,
              transform: `translateY(${subY}px)`,
            }}
          >
            {content.subtitle}
          </div>
        </MaskedLine>
      </div>

      {/* 母题铰链：固定网格位置跨场继承 */}
      <div
        style={{
          width: 3,
          height: CANVAS.contentH,
          backgroundColor: COLORS.brandBlue,
          transform: `scaleY(${hingeScale})`,
          transformOrigin: "50% 50%",
          opacity: 0.85,
        }}
      />

      <div style={{ width: CANVAS.rightW, height: CANVAS.contentH }}>
        <PhotoPanel
          localFrame={localFrame}
          imageSrc={content.imageSrc}
          kind={content.kind}
        />
      </div>
    </AbsoluteFill>
  );
};
