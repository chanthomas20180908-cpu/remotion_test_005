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
import { BRAND, CAPABILITY_STACK, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const CapabilityScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const panelIn = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const flowShift = interpolate(frame, [0, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.violet}>
      <AbsoluteFill style={{ padding: "82px 90px" }}>
        <div style={{ position: "relative", zIndex: 3, width: 760 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            核心业务突破
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 104,
              lineHeight: 0.94,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            技术堆栈
            <br />
            长成生产线
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 126,
            right: 88,
            width: 948,
            height: 750,
          }}
        >
          {[MEDIA.neuralFlow, MEDIA.productScreen, MEDIA.ambientFlow].map(
            (src, index) => {
              const cardIn = spring({
                fps,
                frame: Math.max(0, frame - index * 6),
                config: { damping: 15, stiffness: 96, mass: 1 },
              });

              return (
                <div
                  key={src}
                  style={{
                    position: "absolute",
                    top: 44 + index * 88,
                    left: 120 + index * 96,
                    width: 620,
                    height: 360,
                    borderRadius: 38,
                    overflow: "hidden",
                    border: `1px solid ${BRAND.line}`,
                    boxShadow: BRAND.shadow,
                    transform: `perspective(1800px) rotateY(${index === 1 ? -6 : -14 + index * 6}deg) rotateX(${5 - index}deg) translateX(${50 - cardIn * 50}px) translateY(${24 - cardIn * 24}px)`,
                    opacity: cardIn,
                  }}
                >
                  <Img
                    src={src}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${1.08 - index * 0.03 + flowShift * 0.04}) translateX(${flowShift * (index === 0 ? -18 : 12)}px)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(145deg, rgba(8,16,29,0.26) 0%, rgba(8,16,29,0.02) 38%, rgba(255,255,255,0.24) 100%)",
                    }}
                  />
                </div>
              );
            },
          )}
        </div>

        <GlassPanel
          style={{
            position: "absolute",
            left: 88,
            bottom: 84,
            width: 720,
            padding: "28px 34px",
            borderRadius: 34,
            opacity: panelIn,
            transform: `translateY(${24 - panelIn * 24}px)`,
          }}
        >
          {CAPABILITY_STACK.map((item, index) => {
            const itemIn = spring({
              fps,
              frame: Math.max(0, frame - 14 - index * 5),
              config: { damping: 16, stiffness: 112, mass: 0.92 },
            });

            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginTop: index === 0 ? 0 : 16,
                  transform: `translateX(${32 - itemIn * 32}px)`,
                  opacity: itemIn,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: index % 2 === 0 ? BRAND.blue : BRAND.violet,
                    boxShadow: `0 0 28px ${index % 2 === 0 ? BRAND.blue : BRAND.violet}`,
                  }}
                />
                <div
                  style={{
                    fontSize: 34,
                    lineHeight: 1.18,
                    fontWeight: 650,
                    color: BRAND.text,
                    letterSpacing: -0.8,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </GlassPanel>
      </AbsoluteFill>
    </Backdrop>
  );
};
