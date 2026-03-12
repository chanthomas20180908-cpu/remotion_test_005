import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ASSETS, COLORS } from "../constants";
import { HorizonGlow, MetricPill, SceneShell } from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene07Future: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const brandReveal = spring({
    fps,
    frame: Math.max(0, frame - 80),
    config: { damping: 28, stiffness: 400, mass: 0.95 },
  });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <HorizonGlow />
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 118,
            color: COLORS.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          FUTURE VISION CTA
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 174,
            width: 980,
            fontSize: 100,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: -5,
            color: COLORS.text,
          }}
        >
          面向 2026，
          <br />
          继续把 AI 视听能力推向前线
        </div>

        <MetricPill
          x={114}
          y={456}
          value="3000万+"
          label="2026 营收目标"
          accent={COLORS.accent}
        />
        <MetricPill
          x={412}
          y={456}
          value="A轮"
          label="计划完成融资"
          accent={COLORS.gold}
        />
        <MetricPill
          x={680}
          y={456}
          value="全球领先"
          label="AI视听方案供应商"
          accent={COLORS.emerald}
        />

        <div
          style={{
            position: "absolute",
            right: 90,
            top: 130,
            width: 720,
            height: 540,
            borderRadius: 40,
            overflow: "hidden",
            boxShadow: "0 36px 100px rgba(49, 85, 131, 0.18)",
          }}
        >
          <Img
            src={ASSETS.qrCode}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(17,34,57,0.08) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: 112,
            right: 112,
            bottom: 86,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            transform: `translateY(${interpolate(brandReveal, [0, 1], [70, 0])}px) scale(${interpolate(
              brandReveal,
              [0, 1],
              [0.92, 1],
            )})`,
            opacity: interpolate(brandReveal, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: -2,
                color: COLORS.text,
              }}
            >
              国研能汇（北京）技术有限公司
            </div>
            <div
              style={{ marginTop: 10, fontSize: 28, color: COLORS.textSoft }}
            >
              以 AI 重构视频创作
            </div>
          </div>
          <div
            style={{
              width: 320,
              fontSize: 24,
              lineHeight: 1.45,
              color: COLORS.textSoft,
              textAlign: "right",
            }}
          >
            导演化示例 · 无配音 / 无 BGM · 更强镜头语言
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
