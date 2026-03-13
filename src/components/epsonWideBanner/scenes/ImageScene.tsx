import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ImageWindow } from "../components/ImageWindow";
import { WipeMask, type WipeStyle } from "../components/WipeMask";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { TINTS } from "../design-tokens";
import { ClipReveal } from "../components/ClipReveal";
import { WindowImage } from "../components/WindowImage";
import { WindowImageWipe } from "../components/WindowImageWipe";
import { EASING } from "../easing";

export type ImageSceneProps = {
  imageSrc: string;
  nextImageSrc?: string;
  nextWipeFromFrame?: number;
  nextWipeDurationInFrames?: number;
  guideX: number;
  globalFrame: number;
  wipeStyle: WipeStyle;
  isFirst: boolean;
  durationInFrames: number;
  enableExit?: boolean;
  layoutVariant?: "hero" | "stand";
  windowShape?: "rect" | "chamfer" | "diagonal";
  kicker: string;
  title: string;
  subtitle: string;
  cta?: string;
};

export const ImageScene: React.FC<ImageSceneProps> = ({
  imageSrc,
  nextImageSrc,
  nextWipeFromFrame,
  nextWipeDurationInFrames,
  guideX,
  globalFrame,
  wipeStyle,
  isFirst,
  durationInFrames,
  enableExit = true,
  layoutVariant = "hero",
  windowShape = "rect",
  kicker,
  title,
  subtitle,
  cta,
}) => {
  const frame = useCurrentFrame();
  const safeX = EPSON_WIDE_BANNER.safe.x;
  const safeY = EPSON_WIDE_BANNER.safe.y;
  const contentW = EPSON_WIDE_BANNER.width - safeX * 2;
  const contentH = EPSON_WIDE_BANNER.height - safeY * 2;
  const leftRegionW = contentW * EPSON_WIDE_BANNER.layout.leftRatio;

  // 避免 overlap 时“新旧文字叠在一起”的卡顿感：
  // 进入场的文字必须在转场 clip-path 完成后再开始 reveal。
  const contentStart = isFirst
    ? 0
    : EPSON_WIDE_BANNER.transitionDurationInFrames + 5;
  const at = (base: number): number =>
    isFirst ? base : Math.max(base, contentStart);

  const snap05 = (v: number): number => Math.round(v * 2) / 2;

  // 退出时把旧文字“推走并遮罩掉”，避免 overlap 期间两套文案叠在一起。
  const exitStart = Math.max(
    0,
    durationInFrames - EPSON_WIDE_BANNER.transitionDurationInFrames - 10,
  );
  const exitP = enableExit
    ? interpolate(frame, [exitStart, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASING.expoInOut,
      })
    : 0;
  const textExitY = -64 * exitP;

  // 进入时轻推上来：让上下切换像“连续滚动”，避免停顿。
  const textEnterY = isFirst
    ? 0
    : interpolate(frame, [contentStart, contentStart + 14], [44, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: EASING.power4Out,
      });
  const textY = snap05(textEnterY + textExitY);

  const intensity = 0.75;

  return (
    <AbsoluteFill>
      <WipeMask
        wipeStyle={wipeStyle}
        isFirst={isFirst}
        originX={guideX}
        durationInFrames={durationInFrames}
        enableExit={enableExit}
      >
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

          {/* 细线框架（编辑部感），随导视线轻微平移：形成连续性 */}
          <div
            style={
              {
                position: "absolute",
                left: 0,
                top: 36,
                width: "100%",
                height: 1,
                backgroundColor: "rgba(243,245,255,0.30)",
                opacity: 0.6,
                transform: `translateX(${(guideX - safeX) * 0.04}px)`,
              } satisfies React.CSSProperties
            }
          />
          <div
            style={
              {
                position: "absolute",
                left: 0,
                top: 128,
                width: "100%",
                height: 1,
                backgroundColor: "rgba(243,245,255,0.26)",
                opacity: 0.5,
                transform: `translateX(${-((guideX - safeX) * 0.03)}px)`,
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
                  transform: `translate3d(0, ${textY}px, 0)`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                } satisfies React.CSSProperties
              }
            >
              <ClipReveal fromFrame={at(10)} durationInFrames={14}>
                <div
                  style={
                    {
                      fontSize: 14,
                      letterSpacing: "0.12em",
                      fontWeight: 650,
                      color: TINTS.mistOnBrand,
                      textTransform: "uppercase",
                    } satisfies React.CSSProperties
                  }
                >
                  {kicker}
                </div>
              </ClipReveal>

              <div style={{ height: 6 }} />

              <ClipReveal fromFrame={at(16)} durationInFrames={16}>
                <div
                  style={
                    {
                      fontSize: 72,
                      lineHeight: 0.92,
                      fontWeight: 760,
                      color: TINTS.paperOnBrand,
                    } satisfies React.CSSProperties
                  }
                >
                  {title}
                </div>
              </ClipReveal>

              <div style={{ height: 8 }} />

              <ClipReveal fromFrame={at(24)} durationInFrames={16}>
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
                  {subtitle}
                </div>
              </ClipReveal>

              {cta ? (
                <div style={{ marginTop: 12 }}>
                  <ClipReveal fromFrame={at(34)} durationInFrames={16}>
                    <div
                      style={
                        {
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          height: 28,
                          paddingLeft: 12,
                          paddingRight: 12,
                          borderRadius: 999,
                          border: "1px solid rgba(243,245,255,0.26)",
                          backgroundColor: "rgba(243,245,255,0.12)",
                        } satisfies React.CSSProperties
                      }
                    >
                      <div
                        style={
                          {
                            fontSize: 14,
                            fontWeight: 650,
                            letterSpacing: "0.08em",
                            color: TINTS.paperOnBrand,
                          } satisfies React.CSSProperties
                        }
                      >
                        {cta}
                      </div>
                      <div
                        style={
                          {
                            width: 22,
                            height: 1,
                            backgroundColor: TINTS.accent,
                            opacity: 0.8,
                          } satisfies React.CSSProperties
                        }
                      />
                    </div>
                  </ClipReveal>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ImageWindow
          globalFrame={globalFrame}
          shape={windowShape}
          layoutVariant={layoutVariant}
          intensity={intensity}
        >
          {nextImageSrc &&
          typeof nextWipeFromFrame === "number" &&
          typeof nextWipeDurationInFrames === "number" ? (
            <WindowImageWipe
              fromSrc={imageSrc}
              toSrc={nextImageSrc}
              fromFrame={nextWipeFromFrame}
              durationInFrames={nextWipeDurationInFrames}
              fit="cover"
            />
          ) : (
            <WindowImage src={imageSrc} fit="cover" zoom={1.02} />
          )}
        </ImageWindow>
      </WipeMask>
    </AbsoluteFill>
  );
};
