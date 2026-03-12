import type { FC } from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GlassCard } from "../components/GlassCard";
import { MetricBadge } from "../components/MetricBadge";
import { BRAND, MEDIA, PROJECT_METRICS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const ProjectScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const imageShift = interpolate(frame, [0, 180], [0, -90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.blue}>
      <AbsoluteFill style={{ padding: "80px 86px" }}>
        <div style={{ fontSize: 24, color: BRAND.blue }}>
          标杆项目 / AI+广电传媒
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 82,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -3,
            color: BRAND.text,
          }}
        >
          全模块闭环交付，
          <br />
          让落地结果直接可见。
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.08fr 0.92fr",
            gap: 28,
            marginTop: 34,
            flex: 1,
          }}
        >
          <div style={{ position: "relative" }}>
            <GlassCard
              style={{
                position: "absolute",
                inset: 0,
                padding: 18,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 0.8fr",
                  gap: 18,
                  height: "100%",
                  transform: `translateX(${imageShift}px)`,
                }}
              >
                <Img
                  src={MEDIA.projectProof}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 26,
                  }}
                />
                <Img
                  src={MEDIA.productScreen}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 26,
                  }}
                />
              </div>
            </GlassCard>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <GlassCard style={{ padding: "28px 32px" }}>
              <div style={{ fontSize: 22, color: BRAND.muted }}>项目价值</div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 38,
                  lineHeight: 1.25,
                  color: BRAND.text,
                  fontWeight: 700,
                }}
              >
                精准对接北京“人工智能+广电传媒”战略需求，
                以自研技术完成从理解、检索到生成的智能化革新。
              </div>
            </GlassCard>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {PROJECT_METRICS.map((metric, index) => (
                <MetricBadge key={metric.label} index={index} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
