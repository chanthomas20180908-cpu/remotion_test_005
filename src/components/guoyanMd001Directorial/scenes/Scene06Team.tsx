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
import {
  GlassPanel,
  MediaPlane,
  MetricPill,
  SceneShell,
} from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene06Team: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardReveal = spring({
    fps,
    frame: Math.max(0, frame - 54),
    config: { damping: 24, stiffness: 260, mass: 1 },
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
          TEAM & HONORS
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 168,
            width: 860,
            fontSize: 102,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: -5,
            color: COLORS.text,
          }}
        >
          凝聚人心，
          <br />
          共筑辉煌
        </div>

        <MediaPlane
          src={ASSETS.teamPhoto}
          x={112}
          y={446}
          width={740}
          height={430}
          rotateY={8}
          rotateX={-1}
        />
        <MediaPlane
          src={ASSETS.projectProof}
          x={1190}
          y={134}
          width={586}
          height={328}
          rotateY={-8}
          rotateX={2}
          radius={30}
        />

        <GlassPanel x={910} y={470} width={820} height={404} rotate={-8}>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <Img
              src={ASSETS.awardPhoto}
              style={{
                width: 220,
                height: 220,
                objectFit: "cover",
                borderRadius: 26,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 24,
                  letterSpacing: 3,
                  color: COLORS.accent,
                  fontWeight: 700,
                }}
              >
                HONOR STACK
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 40,
                  lineHeight: 1.15,
                  fontWeight: 800,
                  color: COLORS.text,
                }}
              >
                国家级 / 市级奖项与重点文化企业认可
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 26,
                  lineHeight: 1.45,
                  color: COLORS.textSoft,
                }}
              >
                团队核心成员获算法卓越人才称号，企业与个人价值同步提升。
              </div>
            </div>
          </div>
        </GlassPanel>

        <div
          style={{
            transform: `translateY(${interpolate(cardReveal, [0, 1], [70, 0])}px) scale(${interpolate(cardReveal, [0, 1], [0.84, 1])})`,
            opacity: interpolate(cardReveal, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <MetricPill
            x={178}
            y={836}
            value="24人"
            label="团队规模"
            accent={COLORS.accent}
          />
          <MetricPill
            x={470}
            y={836}
            value="60%+"
            label="研发占比"
            accent={COLORS.emerald}
          />
          <MetricPill
            x={778}
            y={836}
            value="30%+"
            label="硕士及以上"
            accent={COLORS.gold}
          />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
