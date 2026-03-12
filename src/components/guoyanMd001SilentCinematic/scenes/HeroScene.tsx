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
import { MetricBadge } from "../components/MetricBadge";
import { BRAND, HERO_METRICS, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const HeroScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 90, mass: 1 },
  });
  const imageIn = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 15, stiffness: 80, mass: 1 },
  });
  const labelOpacity = interpolate(frame, [6, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.blue}>
      <AbsoluteFill style={{ padding: "88px 96px 72px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.06fr 0.94fr",
            gap: 40,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform: `translateY(${36 - titleIn * 36}px)`,
              opacity: titleIn,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  padding: "14px 24px",
                  borderRadius: 9999,
                  fontSize: 24,
                  color: BRAND.blue,
                  background: "rgba(47, 107, 255, 0.10)",
                  opacity: labelOpacity,
                }}
              >
                国家级智库基因 × AI 视频创作
              </div>
              <div
                style={{
                  marginTop: 26,
                  fontSize: 116,
                  lineHeight: 1,
                  letterSpacing: -5,
                  fontWeight: 700,
                  color: BRAND.text,
                }}
              >
                国研数智
              </div>
              <div
                style={{
                  marginTop: 22,
                  maxWidth: 860,
                  fontSize: 40,
                  lineHeight: 1.35,
                  color: BRAND.muted,
                }}
              >
                以研究力驱动产业升级，
                <br />用 AI 重构视频创作的新范式。
              </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              {HERO_METRICS.map((metric, index) => (
                <MetricBadge key={metric.label} index={index} {...metric} />
              ))}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              transform: `translateY(${42 - imageIn * 42}px) scale(${0.92 + imageIn * 0.08})`,
              opacity: imageIn,
            }}
          >
            <GlassCard style={{ position: "absolute", inset: 0, padding: 22 }}>
              <Img
                src={MEDIA.productScreen}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 28,
                }}
              />
            </GlassCard>
            <GlassCard
              style={{
                position: "absolute",
                left: -24,
                bottom: 46,
                padding: "24px 28px",
                width: 300,
              }}
            >
              <div style={{ fontSize: 20, color: BRAND.muted }}>核心命题</div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 40,
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: BRAND.text,
                }}
              >
                从洞察
                <br />
                到可量化增长
              </div>
            </GlassCard>
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
