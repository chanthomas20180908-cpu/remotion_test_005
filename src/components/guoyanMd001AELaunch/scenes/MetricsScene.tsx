import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MetricPill } from "../components/MetricPill";
import { Stage } from "../components/Stage";
import { BRAND, KEY_METRICS, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const MetricsScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardIn = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const numberDrift = interpolate(frame, [0, 135], [0, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage accent={BRAND.violet}>
      <AbsoluteFill style={{ padding: "76px 88px" }}>
        <div
          style={{
            position: "absolute",
            inset: "120px 88px 96px 860px",
            borderRadius: 42,
            overflow: "hidden",
            boxShadow: BRAND.shadow,
            transform: `translateX(${54 - cardIn * 54}px) rotate(-4deg) scale(${0.9 + cardIn * 0.1})`,
            opacity: cardIn,
          }}
        >
          <Img
            src={MEDIA.cctvFeature}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(9,17,31,0.06) 0%, rgba(9,17,31,0.42) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            top: 120 + numberDrift,
            fontSize: 260,
            lineHeight: 0.84,
            letterSpacing: -12,
            fontWeight: 800,
            color: "rgba(47, 107, 255, 0.08)",
          }}
        >
          80
          <br />
          300
        </div>

        <div style={{ position: "relative", zIndex: 2, width: 920 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            数据先开口
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 108,
              lineHeight: 0.96,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            增长不是描述
            <br />
            是镜头里的证据
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              lineHeight: 1.35,
              color: BRAND.muted,
              maxWidth: 800,
            }}
          >
            用更像 AE 的推拉、叠景与节奏，
            <br />
            让成果先于解释抵达观众。
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
              marginTop: 42,
            }}
          >
            {KEY_METRICS.map((metric, index) => (
              <MetricPill key={metric.label} index={index} {...metric} />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
