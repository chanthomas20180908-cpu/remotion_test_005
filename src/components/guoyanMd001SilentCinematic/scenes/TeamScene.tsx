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
import { BRAND, MEDIA, TEAM_METRICS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const TeamScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imageScale = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 70, mass: 1 },
  });
  const panelOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "88px 96px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 34,
            height: "100%",
          }}
        >
          <GlassCard style={{ padding: 22, overflow: "hidden" }}>
            <Img
              src={MEDIA.teamPhoto}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 26,
                transform: `scale(${0.94 + imageScale * 0.06})`,
              }}
            />
          </GlassCard>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: panelOpacity,
            }}
          >
            <div>
              <div style={{ fontSize: 24, color: BRAND.blue }}>跨界团队</div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 86,
                  lineHeight: 1.02,
                  letterSpacing: -3,
                  fontWeight: 700,
                  color: BRAND.text,
                }}
              >
                研究 × 技术 × 产业，
                <br />
                面向长期价值。
              </div>
              <GlassCard style={{ marginTop: 26, padding: "26px 30px" }}>
                <div
                  style={{ fontSize: 34, lineHeight: 1.3, color: BRAND.muted }}
                >
                  “资深引领 + 新锐攻坚”的人才梯队，
                  为技术攻关、产品迭代与规模化交付提供持续动能。
                </div>
              </GlassCard>
            </div>

            <div style={{ display: "flex", gap: 18 }}>
              {TEAM_METRICS.map((metric, index) => (
                <MetricBadge key={metric.label} index={index} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
