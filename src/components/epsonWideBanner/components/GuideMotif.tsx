import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { TINTS } from "../design-tokens";

export type GuideMotifProps = {
  guideX: number;
};

export const GuideMotif: React.FC<GuideMotifProps> = ({ guideX }) => {
  const frame = useCurrentFrame();

  const lineOpacity = interpolate(
    frame,
    [
      0,
      14,
      EPSON_WIDE_BANNER.totalDurationInFrames - 30,
      EPSON_WIDE_BANNER.totalDurationInFrames,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const lineY = useMemo((): number => {
    const center = EPSON_WIDE_BANNER.height * 0.5;
    const drift = Math.sin(frame * 0.02) * 10;
    return center + drift;
  }, [frame]);

  const leftRegionWidth =
    (EPSON_WIDE_BANNER.width - EPSON_WIDE_BANNER.safe.x * 2) *
    EPSON_WIDE_BANNER.layout.leftRatio;
  const regionX = EPSON_WIDE_BANNER.safe.x;
  const regionY = EPSON_WIDE_BANNER.safe.y;
  const regionH = EPSON_WIDE_BANNER.height - EPSON_WIDE_BANNER.safe.y * 2;

  return (
    <AbsoluteFill>
      {/* 导视线：极细、克制，跨场存在 */}
      <div
        style={
          {
            position: "absolute",
            left: guideX,
            top: regionY,
            width: 2,
            height: regionH,
            backgroundColor: TINTS.accent,
            opacity: lineOpacity * 0.72,
          } satisfies React.CSSProperties
        }
      />

      {/* 线的“呼吸光扫”（很弱，避免 glow 味） */}
      <div
        style={
          {
            position: "absolute",
            left: guideX - 10,
            top: lineY - 120,
            width: 22,
            height: 240,
            background: `linear-gradient(180deg, rgba(${TINTS.accentRgb},0) 0%, rgba(${TINTS.accentRgb},0.18) 50%, rgba(${TINTS.accentRgb},0) 100%)`,
            opacity: lineOpacity * 0.75,
          } satisfies React.CSSProperties
        }
      />

      {/* 留白区的极淡纹理：只为“活着”，不抢主体 */}
      <div
        style={
          {
            position: "absolute",
            left: regionX,
            top: regionY,
            width: leftRegionWidth,
            height: regionH,
            background:
              "repeating-linear-gradient(135deg, rgba(11,18,32,0.022) 0px, rgba(11,18,32,0.022) 1px, rgba(11,18,32,0) 7px)",
            opacity: 0.55,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />
    </AbsoluteFill>
  );
};
