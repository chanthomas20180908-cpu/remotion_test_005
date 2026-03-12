import React from "react";
import {
  AbsoluteFill,
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

export const Scene04TechProof: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ring = spring({
    fps,
    frame: Math.max(0, frame - 48),
    config: { damping: 26, stiffness: 320, mass: 1 },
  });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 112,
            color: COLORS.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          TECH & CCTV PROOF
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 170,
            width: 920,
            fontSize: 104,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: -5,
            color: COLORS.text,
          }}
        >
          硬核技术，
          <br />
          权威背书
        </div>

        <GlassPanel x={112} y={470} width={610} height={360} dark>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 22,
              letterSpacing: 4,
            }}
          >
            R&amp;D OUTPUT
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 74,
              lineHeight: 0.95,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            4项专利
            <br />
            3项软著
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            10分钟 4K 视频生成由 2 小时压缩至 30 分钟，效率提升 300%。
          </div>
        </GlassPanel>

        <div
          style={{
            position: "absolute",
            left: 810,
            top: 462,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "1.5px solid rgba(45, 107, 255, 0.22)",
            transform: `scale(${interpolate(ring, [0, 1], [0.4, 1])})`,
            opacity: interpolate(ring, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 770,
            top: 422,
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "1px solid rgba(127, 208, 255, 0.26)",
            transform: `scale(${interpolate(ring, [0, 1], [0.65, 1])})`,
            opacity: interpolate(ring, [0, 1], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        <MediaPlane
          src={ASSETS.cctvFeature}
          x={1088}
          y={106}
          width={684}
          height={788}
          rotateY={-10}
          rotateX={2}
        />
        <MetricPill
          x={956}
          y={768}
          value="300%"
          label="4K 生成提速"
          accent={COLORS.gold}
        />

        <div
          style={{
            position: "absolute",
            left: 1152,
            top: 136,
            padding: "16px 24px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.86)",
            color: COLORS.text,
            fontSize: 22,
            fontWeight: 700,
            boxShadow: "0 20px 50px rgba(53, 90, 138, 0.15)",
          }}
        >
          CCTV2《赢在AI+》
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
