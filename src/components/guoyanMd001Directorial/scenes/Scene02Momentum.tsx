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
import { GlassPanel, SceneShell } from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene02Momentum: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const yearReveal = spring({
    fps,
    frame: Math.max(0, frame - 15),
    config: { damping: 28, stiffness: 400, mass: 0.9 },
  });

  const phraseReveal = spring({
    fps,
    frame: Math.max(0, frame - 52),
    config: { damping: 24, stiffness: 260, mass: 1 },
  });

  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: -140,
            top: 180,
            fontSize: 420,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: -20,
            color: "rgba(45, 107, 255, 0.08)",
            transform: `translateX(${interpolate(yearReveal, [0, 1], [180, 0])}px) scale(${interpolate(
              yearReveal,
              [0, 1],
              [1.12, 1],
            )})`,
          }}
        >
          2025
        </div>

        <div
          style={{
            position: "absolute",
            left: 110,
            top: 116,
            color: COLORS.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          MOMENTUM GRID
        </div>

        <div
          style={{
            position: "absolute",
            left: 108,
            top: 170,
            width: 780,
            fontSize: 112,
            lineHeight: 0.95,
            letterSpacing: -5,
            fontWeight: 800,
            color: COLORS.text,
            transform: `translateY(${interpolate(phraseReveal, [0, 1], [90, 0])}px)`,
            opacity: interpolate(phraseReveal, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          AIGC爆发，
          <br />
          重构视频创作
        </div>

        <div
          style={{
            position: "absolute",
            left: 110,
            top: 452,
            width: 720,
            fontSize: 30,
            lineHeight: 1.45,
            color: COLORS.textSoft,
          }}
        >
          用空间纵深、流动网格和信息压近感，把“行业浪潮”拍成镜头，而不是排版。
        </div>

        <GlassPanel x={1040} y={90} width={720} height={860} rotate={-10}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 34,
              overflow: "hidden",
            }}
          >
            <Img
              src={ASSETS.accentDashed}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.35,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 42,
              right: 42,
              top: 46,
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(45,107,255,0.4) 18%, rgba(127,208,255,0.85) 50%, rgba(45,107,255,0.4) 82%, transparent 100%)",
            }}
          />
          {[0, 1, 2, 3, 4].map((item) => {
            const drift = interpolate(
              frame + item * 6,
              [0, durationInFrames],
              [-80, 120],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.inOut(Easing.cubic),
              },
            );

            return (
              <div
                key={item}
                style={{
                  position: "absolute",
                  left: 48,
                  right: 48,
                  top: 120 + item * 130,
                  height: 92,
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.62)",
                  border: "1.5px solid rgba(45,107,255,0.12)",
                  transform: `translateX(${drift}px)`,
                }}
              />
            );
          })}
        </GlassPanel>
      </AbsoluteFill>
    </SceneShell>
  );
};
