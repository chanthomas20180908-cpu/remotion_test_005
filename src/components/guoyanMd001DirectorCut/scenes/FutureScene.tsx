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
import { GlassPanel } from "../components/GlassPanel";
import { BRAND, FUTURE_LINES, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const FutureScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelIn = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100, mass: 0.96 },
  });
  const lineGrow = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "82px 88px" }}>
        <div style={{ position: "relative", zIndex: 2, width: 860 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            展望 2026
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 112,
              lineHeight: 0.92,
              letterSpacing: -6,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            下一段路
            <br />
            继续向前推镜头
          </div>
        </div>

        <GlassPanel
          style={{
            position: "absolute",
            left: 88,
            bottom: 86,
            width: 880,
            padding: "30px 34px",
            borderRadius: 36,
            transform: `translateY(${30 - panelIn * 30}px)`,
            opacity: panelIn,
          }}
        >
          {FUTURE_LINES.map((line, index) => {
            const itemIn = spring({
              fps,
              frame: Math.max(0, frame - 10 - index * 6),
              config: { damping: 16, stiffness: 108, mass: 0.92 },
            });

            return (
              <div
                key={line}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginTop: index === 0 ? 0 : 16,
                  opacity: itemIn,
                  transform: `translateX(${28 - itemIn * 28}px)`,
                }}
              >
                <div
                  style={{
                    width: 84 * lineGrow,
                    height: 4,
                    borderRadius: 9999,
                    background: index % 2 === 0 ? BRAND.gold : BRAND.blue,
                  }}
                />
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 650,
                    color: BRAND.text,
                    letterSpacing: -0.6,
                  }}
                >
                  {line}
                </div>
              </div>
            );
          })}
        </GlassPanel>

        <div
          style={{
            position: "absolute",
            top: 120,
            right: 108,
            width: 700,
            height: 710,
            transform: `perspective(2000px) rotateY(-10deg) rotateX(4deg) translateY(${42 - panelIn * 42}px)`,
            transformOrigin: "left center",
            opacity: panelIn,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 440,
              height: 560,
              borderRadius: 38,
              overflow: "hidden",
              border: `1px solid ${BRAND.line}`,
              boxShadow: BRAND.shadow,
            }}
          >
            <Img
              src={MEDIA.awardPhoto}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 290,
              padding: "18px",
              borderRadius: 32,
              background: BRAND.surfaceStrong,
              border: `1px solid ${BRAND.line}`,
              boxShadow: BRAND.shadow,
            }}
          >
            <Img
              src={MEDIA.qrCode}
              style={{ width: "100%", borderRadius: 22 }}
            />
            <div
              style={{
                marginTop: 14,
                fontSize: 24,
                lineHeight: 1.25,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: BRAND.text,
              }}
            >
              国研能汇（北京）技术有限公司
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
