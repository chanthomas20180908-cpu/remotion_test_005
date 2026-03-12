import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ASSETS, COLORS } from "../constants";
import { KineticTitle, SceneShell } from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene01Hook: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const push = interpolate(frame, [0, durationInFrames], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const badge = spring({
    fps,
    frame: Math.max(0, frame - 64),
    config: {
      damping: 20,
      stiffness: 180,
      mass: 1,
    },
  });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            inset: -80,
            transform: `scale(${push}) rotate(-7deg)`,
            opacity: 0.36,
          }}
        >
          <Img
            src={ASSETS.accentBars}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {[0, 1, 2, 3].map((item) => {
          const local = Math.max(0, frame - item * 4);
          const reveal = spring({
            fps,
            frame: local,
            config: {
              damping: 28,
              stiffness: 400,
              mass: 0.85,
            },
          });

          return (
            <div
              key={item}
              style={{
                position: "absolute",
                left: 120 + item * 190,
                top: 112 + item * 26,
                width: 240,
                height: 20,
                background:
                  item % 2 === 0 ? COLORS.accent : COLORS.accentBright,
                borderRadius: 999,
                opacity: 0.16,
                transform: `translateX(${interpolate(reveal, [0, 1], [-220, 0])}px) rotate(${item % 2 === 0 ? -22 : 16}deg)`,
              }}
            />
          );
        })}

        <KineticTitle lines={["以AI赋能创作", "共赴新征程"]} width={1500} />

        <div
          style={{
            position: "absolute",
            left: 112,
            top: 398,
            width: 980,
            fontSize: 30,
            lineHeight: 1.45,
            color: COLORS.textSoft,
            opacity: interpolate(frame, [40, 76], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          不是总结页，而是一个从行业拐点推入品牌势能的导演化开场。
        </div>

        <div
          style={{
            position: "absolute",
            right: 110,
            top: 98,
            width: 700,
            height: 760,
            borderRadius: 42,
            overflow: "hidden",
            boxShadow: "0 40px 90px rgba(24, 59, 103, 0.2)",
            border: "1.5px solid rgba(255,255,255,0.75)",
            transform: `perspective(1800px) rotateY(-13deg) rotateX(4deg) translateY(${interpolate(
              frame,
              [0, 90],
              [70, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )}px)`,
          }}
        >
          <Img
            src={ASSETS.accentDashed}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(15, 32, 55, 0.08) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 212,
            bottom: 124,
            padding: "20px 28px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.72)",
            border: "1.5px solid rgba(45, 107, 255, 0.16)",
            boxShadow: "0 24px 60px rgba(77, 113, 160, 0.16)",
            transform: `scale(${interpolate(badge, [0, 1], [0.7, 1])}) translateY(${interpolate(
              badge,
              [0, 1],
              [40, 0],
            )}px)`,
            opacity: interpolate(badge, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{ fontSize: 22, color: COLORS.textSoft, letterSpacing: 3 }}
          >
            DIRECTORIAL DEMO
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
