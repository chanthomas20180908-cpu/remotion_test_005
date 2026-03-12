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
import { BRAND, FUTURE_LINES, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const FutureScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  return (
    <Backdrop accent={BRAND.gold}>
      <AbsoluteFill style={{ padding: "88px 96px" }}>
        <div style={{ fontSize: 24, color: BRAND.blue }}>未来愿景</div>
        <div
          style={{
            marginTop: 16,
            fontSize: 110,
            lineHeight: 0.96,
            letterSpacing: -4,
            fontWeight: 700,
            color: BRAND.text,
            transform: `translateY(${26 - headline * 26}px)`,
            opacity: headline,
          }}
        >
          从研究走向行动，
          <br />
          从洞察走向增长。
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.08fr 0.92fr",
            gap: 24,
            marginTop: 40,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FUTURE_LINES.map((line, index) => {
              const delay = index * 10;
              const opacity = interpolate(
                frame,
                [delay + 20, delay + 36],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              return (
                <GlassCard
                  key={line}
                  style={{
                    padding: "22px 28px",
                    opacity,
                    transform: `translateX(${30 - opacity * 30}px)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 34,
                      lineHeight: 1.25,
                      color: BRAND.text,
                      fontWeight: 700,
                    }}
                  >
                    {line}
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div style={{ position: "relative" }}>
            <GlassCard style={{ position: "absolute", inset: 0, padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  height: "100%",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    borderRadius: 26,
                    background:
                      "linear-gradient(160deg, rgba(47,107,255,0.16), rgba(246,185,79,0.10))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    lineHeight: 1.2,
                    fontWeight: 700,
                    color: BRAND.text,
                    textAlign: "center",
                  }}
                >
                  打造全球领先
                  <br />
                  AI 视听解决方案供应商
                </div>
                <div style={{ display: "flex", gap: 18 }}>
                  <Img
                    src={MEDIA.qrCode}
                    style={{
                      width: 208,
                      height: 208,
                      objectFit: "cover",
                      borderRadius: 20,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontSize: 24, color: BRAND.muted }}>
                      国研能汇（北京）技术有限公司
                    </div>
                    <div
                      style={{
                        fontSize: 40,
                        lineHeight: 1.2,
                        fontWeight: 700,
                        color: BRAND.text,
                      }}
                    >
                      与客户伙伴、行业同仁携手，
                      <br />
                      开启智能内容创作新征程。
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
