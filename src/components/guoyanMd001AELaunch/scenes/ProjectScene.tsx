import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "../components/Stage";
import { BRAND, MEDIA, PROJECT_METRICS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const ProjectScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const boardIn = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 95, mass: 1 },
  });
  const orbit = interpolate(frame, [0, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "82px 88px" }}>
        <div style={{ position: "relative", zIndex: 2, width: 820 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            标杆项目复盘
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            AI + 广电传媒
            <br />
            成为可验证样板
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 34,
              lineHeight: 1.34,
              color: BRAND.muted,
              maxWidth: 760,
            }}
          >
            六大模块闭环交付，秒级素材调用，
            <br />
            让技术指标直接长成业务结果。
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 118,
            right: 92,
            width: 940,
            height: 760,
            transform: `perspective(1800px) rotateY(-12deg) rotateX(4deg) translateY(${40 - boardIn * 40}px)`,
            transformOrigin: "left center",
            opacity: boardIn,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 44,
              overflow: "hidden",
              boxShadow: BRAND.shadow,
              border: `1px solid ${BRAND.line}`,
            }}
          >
            <Img
              src={MEDIA.projectProof}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {PROJECT_METRICS.map((metric, index) => {
            const angle = orbit * Math.PI * 0.6 + index * 0.86;
            const centerX = 460 + Math.cos(angle) * 320;
            const centerY = 350 + Math.sin(angle) * 180;

            return (
              <div
                key={metric}
                style={{
                  position: "absolute",
                  left: centerX,
                  top: centerY,
                  padding: "18px 24px",
                  borderRadius: 22,
                  background: "rgba(9, 17, 31, 0.76)",
                  color: "#ffffff",
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: -0.4,
                  boxShadow: "0 18px 54px rgba(9,17,31,0.22)",
                }}
              >
                {metric}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
