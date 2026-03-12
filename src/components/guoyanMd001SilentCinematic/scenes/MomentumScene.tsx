import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GlassCard } from "../components/GlassCard";
import { BRAND, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const MomentumScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineScale = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 120, mass: 0.9 },
  });

  return (
    <Backdrop accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "88px 96px" }}>
        <div style={{ display: "flex", height: "100%", gap: 42 }}>
          <div style={{ width: 500, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 70,
                top: 80,
                bottom: 90,
                width: 3,
                background: `linear-gradient(180deg, ${BRAND.gold}, ${BRAND.blue})`,
                transformOrigin: "top center",
                transform: `scaleY(${lineScale})`,
              }}
            />
            {[
              ["2025", "AIGC 爆发式增长"],
              ["协同", "研究、咨询、平台、传播形成闭环"],
              ["链接", "服务决策，连接产业升级"],
            ].map(([year, text], index) => {
              const delay = index * 10;
              const opacity = interpolate(
                frame,
                [delay + 6, delay + 26],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              const y = interpolate(frame, [delay, delay + 20], [28, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={year}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 80 + index * 220,
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    opacity,
                    transform: `translateY(${y}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 142,
                      height: 142,
                      borderRadius: 71,
                      background: BRAND.surfaceStrong,
                      border: `1px solid ${BRAND.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      fontWeight: 700,
                      color: BRAND.text,
                      boxShadow: BRAND.shadow,
                    }}
                  >
                    {year}
                  </div>
                  <div
                    style={{
                      maxWidth: 280,
                      fontSize: 30,
                      lineHeight: 1.35,
                      color: BRAND.muted,
                    }}
                  >
                    {text}
                  </div>
                </div>
              );
            })}
          </div>

          <GlassCard style={{ flex: 1, padding: 22, position: "relative" }}>
            <Img
              src={MEDIA.cctvFeature}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 28,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 40,
                top: 42,
                width: 500,
                padding: "26px 30px",
                borderRadius: 28,
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 24, color: BRAND.blue }}>
                国家高端智库
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 56,
                  lineHeight: 1.08,
                  letterSpacing: -2,
                  fontWeight: 700,
                  color: BRAND.text,
                }}
              >
                服务决策，
                <br />
                链接产业。
              </div>
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
