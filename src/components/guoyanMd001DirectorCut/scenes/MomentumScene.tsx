import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { MetricBadge } from "../components/MetricBadge";
import { BRAND, IMPACT_METRICS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const MomentumScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tiltIn = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 96, mass: 1 },
  });
  const graphGrow = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.cyan}>
      <AbsoluteFill style={{ padding: "84px 90px" }}>
        <div style={{ position: "relative", zIndex: 2, width: 720 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            年度核心成果
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 112,
              lineHeight: 0.92,
              fontWeight: 800,
              letterSpacing: -5,
              color: BRAND.text,
            }}
          >
            数据
            <br />
            开始有冲击力
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.34,
              color: BRAND.muted,
            }}
          >
            把效率提升、技术提速、营收跃升，
            <br />
            做成镜头中的空间运动，而不是静态表格。
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 148,
            right: 78,
            width: 960,
            height: 720,
            transform: `perspective(2100px) rotateY(-16deg) rotateX(7deg) translateY(${42 - tiltIn * 42}px)`,
            transformOrigin: "left center",
            opacity: tiltIn,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 44,
              background: "rgba(255,255,255,0.46)",
              border: `1px solid ${BRAND.line}`,
              boxShadow: BRAND.shadow,
            }}
          />

          <svg
            width="960"
            height="720"
            viewBox="0 0 960 720"
            style={{ position: "absolute", inset: 0 }}
          >
            <defs>
              <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7ad8ff" />
                <stop offset="100%" stopColor="#2864ff" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((index) => (
              <line
                key={index}
                x1="96"
                y1={160 + index * 128}
                x2="864"
                y2={160 + index * 128}
                stroke="rgba(8,16,29,0.08)"
                strokeWidth="2"
              />
            ))}
            <path
              d="M96 592 C 220 520, 300 450, 382 404 S 560 290, 640 248 S 760 180, 864 128"
              fill="none"
              stroke="url(#growthLine)"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset={1200 - graphGrow * 1200}
            />
          </svg>

          {IMPACT_METRICS.map((metric, index) => {
            const badgeIn = spring({
              fps,
              frame: Math.max(0, frame - index * 8),
              config: { damping: 15, stiffness: 110, mass: 0.94 },
            });

            return (
              <div
                key={metric.label}
                style={{
                  position: "absolute",
                  left: 90 + index * 248,
                  top: 420 - index * 92,
                  transform: `translateY(${34 - badgeIn * 34}px) scale(${0.92 + badgeIn * 0.08})`,
                  opacity: badgeIn,
                }}
              >
                <MetricBadge
                  value={metric.value}
                  label={metric.label}
                  width={240}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
