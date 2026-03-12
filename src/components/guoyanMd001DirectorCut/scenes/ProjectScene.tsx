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
import { BRAND, MEDIA, PROJECT_RESULTS } from "../constants";

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
    <Backdrop accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "82px 88px" }}>
        <div style={{ position: "relative", zIndex: 2, width: 790 }}>
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
              marginTop: 18,
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            AI + 广电传媒
            <br />
            从方案变成样板
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.34,
              color: BRAND.muted,
            }}
          >
            六大模块闭环交付，秒级调用、可验证指标、
            <br />
            让自研技术真正嵌入广电业务现场。
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 118,
            right: 92,
            width: 930,
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

          {PROJECT_RESULTS.map((metric, index) => {
            const angle = orbit * Math.PI * 0.64 + index * 0.82;
            const centerX = 450 + Math.cos(angle) * 312;
            const centerY = 344 + Math.sin(angle) * 176;

            return (
              <div
                key={metric.label}
                style={{
                  position: "absolute",
                  left: centerX,
                  top: centerY,
                  width: 210,
                  padding: "18px 22px",
                  borderRadius: 24,
                  background: "rgba(8, 16, 29, 0.78)",
                  color: "#ffffff",
                  boxShadow: "0 18px 54px rgba(8,16,29,0.26)",
                }}
              >
                <div
                  style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1.2 }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 20,
                    lineHeight: 1.2,
                    opacity: 0.82,
                  }}
                >
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
