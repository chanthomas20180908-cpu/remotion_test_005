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
import { GlassPanel, MetricPill, SceneShell } from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene03Breakthroughs: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelReveal = (offset: number): number =>
    spring({
      fps,
      frame: Math.max(0, frame - offset),
      config: { damping: 20, stiffness: 180, mass: 1 },
    });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 112,
            color: COLORS.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          BUSINESS BREAKTHROUGHS
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 168,
            width: 860,
            fontSize: 110,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: -5,
            color: COLORS.text,
          }}
        >
          规模与质量
          <br />
          双向提升
        </div>

        <GlassPanel x={108} y={468} width={520} height={330} rotate={-6}>
          <Img
            src={ASSETS.accentSquare}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 24,
              opacity: 0.75,
            }}
          />
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              lineHeight: 1.35,
              color: COLORS.textSoft,
            }}
          >
            新增智能体、数字人、AI剪辑等核心板块，业务范围持续向全国扩展。
          </div>
        </GlassPanel>

        {[0, 1, 2].map((item) => {
          const reveal = panelReveal(item * 14 + 20);
          const specs = [
            {
              x: 710,
              y: 250,
              value: "80%",
              label: "创作效率提升",
              accent: COLORS.accent,
            },
            {
              x: 980,
              y: 450,
              value: "1000万+",
              label: "2025 营收",
              accent: COLORS.emerald,
            },
            {
              x: 1270,
              y: 640,
              value: "全国",
              label: "业务持续拓展",
              accent: COLORS.gold,
            },
          ][item];

          return (
            <div
              key={specs.value}
              style={{
                transform: `translateX(${interpolate(reveal, [0, 1], [220, 0])}px) translateY(${interpolate(
                  reveal,
                  [0, 1],
                  [120, 0],
                )}px) scale(${interpolate(reveal, [0, 1], [0.84, 1])})`,
                opacity: interpolate(reveal, [0, 1], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <MetricPill
                x={specs.x}
                y={specs.y}
                value={specs.value}
                label={specs.label}
                accent={specs.accent}
              />
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            right: 130,
            top: 134,
            width: 540,
            height: 250,
            borderRadius: 34,
            overflow: "hidden",
            boxShadow: "0 28px 70px rgba(45, 76, 125, 0.18)",
            transform: `perspective(1600px) rotateY(-18deg) translateX(${interpolate(
              frame,
              [0, 72],
              [130, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )}px)`,
          }}
        >
          <Img
            src={ASSETS.accentDashed}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
