import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ImageWindow } from "../components/ImageWindow";
import { WipeMask } from "../components/WipeMask";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { TINTS } from "../design-tokens";
import { ClipReveal } from "../components/ClipReveal";
import { WindowImage } from "../components/WindowImage";
import { EASING } from "../easing";

export type ColorFieldSceneProps = {
  imageSrc: string;
  guideX: number;
  globalFrame: number;
  isFirst: boolean;
  durationInFrames: number;
  enableExit?: boolean;
};

export const ColorFieldScene: React.FC<ColorFieldSceneProps> = ({
  imageSrc,
  guideX,
  globalFrame,
  isFirst,
  durationInFrames,
  enableExit = true,
}) => {
  const frame = useCurrentFrame();
  const safeX = EPSON_WIDE_BANNER.safe.x;
  const safeY = EPSON_WIDE_BANNER.safe.y;
  const contentW = EPSON_WIDE_BANNER.width - safeX * 2;
  const leftRegionW = contentW * EPSON_WIDE_BANNER.layout.leftRatio;
  const contentH = EPSON_WIDE_BANNER.height - safeY * 2;

  const exitStart = Math.max(
    0,
    durationInFrames - EPSON_WIDE_BANNER.transitionDurationInFrames - 10,
  );
  const snap05 = (v: number): number => Math.round(v * 2) / 2;
  const exitP = enableExit
    ? interpolate(frame, [exitStart, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASING.expoInOut,
      })
    : 0;
  const textExitY = snap05(-64 * exitP);

  return (
    <AbsoluteFill>
      <WipeMask
        wipeStyle="slit"
        isFirst={isFirst}
        originX={guideX}
        durationInFrames={durationInFrames}
        enableExit={enableExit}
      >
        {/* 左侧信息区：强层级 + 大留白（避免 PPT 口播页） */}
        <div
          style={
            {
              position: "absolute",
              left: safeX,
              top: safeY,
              width: leftRegionW,
              height: contentH,
            } satisfies React.CSSProperties
          }
        >
          <div
            style={
              {
                position: "absolute",
                inset: 0,
                borderLeft: "1px solid rgba(243,245,255,0.20)",
              } satisfies React.CSSProperties
            }
          />

          <div
            style={
              {
                position: "absolute",
                left: 18,
                top: 10,
                right: 18,
                bottom: 10,
                overflow: "hidden",
              } satisfies React.CSSProperties
            }
          >
            <div
              style={
                {
                  transform: `translate3d(0, ${textExitY}px, 0)`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                } satisfies React.CSSProperties
              }
            >
              <ClipReveal fromFrame={8} durationInFrames={14}>
                <div
                  style={
                    {
                      fontSize: 14,
                      letterSpacing: "0.12em",
                      fontWeight: 650,
                      color: TINTS.mistOnBrand,
                    } satisfies React.CSSProperties
                  }
                >
                  EPSON
                </div>
              </ClipReveal>

              <div style={{ height: 6 }} />

              <ClipReveal fromFrame={14} durationInFrames={16}>
                <div
                  style={
                    {
                      fontSize: 78,
                      lineHeight: 0.92,
                      fontWeight: 760,
                      color: TINTS.paperOnBrand,
                    } satisfies React.CSSProperties
                  }
                >
                  Precision
                </div>
              </ClipReveal>

              <div style={{ height: 8 }} />

              <ClipReveal fromFrame={22} durationInFrames={16}>
                <div
                  style={
                    {
                      fontSize: 18,
                      lineHeight: 1.15,
                      fontWeight: 520,
                      color: TINTS.smokeOnBrand,
                      letterSpacing: "0.02em",
                    } satisfies React.CSSProperties
                  }
                >
                  Imaging that stays calm.
                </div>
              </ClipReveal>
            </div>
          </div>

          {/* 细线框架：跟随导视线微移，形成跨场继承 */}
          <div
            style={
              {
                position: "absolute",
                left: 18,
                top: 118,
                width: Math.max(40, leftRegionW - 36),
                height: 1,
                backgroundColor: "rgba(243,245,255,0.30)",
                opacity: 0.55,
                transform: `translateX(${(guideX - safeX) * 0.05}px)`,
              } satisfies React.CSSProperties
            }
          />
        </div>

        {/* 右侧主视觉窗：主题色必须出现（contain + 克制） */}
        <ImageWindow
          globalFrame={globalFrame}
          intensity={0.55}
          shape="chamfer"
          layoutVariant="hero"
        >
          <WindowImage src={imageSrc} fit="contain" zoom={0.985} />
        </ImageWindow>
      </WipeMask>
    </AbsoluteFill>
  );
};
