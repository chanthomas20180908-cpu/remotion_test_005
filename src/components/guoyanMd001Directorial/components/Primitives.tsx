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
import { COLORS, TRANSITION_DURATION } from "../constants";

type SceneShellProps = {
  readonly durationInFrames: number;
  readonly children: React.ReactNode;
  readonly palette?: "light" | "dark";
};

export const SceneShell: React.FC<SceneShellProps> = ({
  durationInFrames,
  children,
  palette = "light",
}) => {
  const frame = useCurrentFrame();

  const enter = spring({
    fps: 30,
    frame: Math.max(0, frame - 1),
    config: {
      damping: 24,
      stiffness: 260,
      mass: 0.9,
    },
  });

  const exitStart = durationInFrames - TRANSITION_DURATION;
  const exit = interpolate(frame, [exitStart, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const bg =
    palette === "light"
      ? `radial-gradient(circle at 18% 18%, rgba(127, 208, 255, 0.35), transparent 28%), radial-gradient(circle at 82% 12%, rgba(45, 107, 255, 0.18), transparent 24%), linear-gradient(135deg, ${COLORS.paper} 0%, ${COLORS.paperWarm} 44%, #ffffff 100%)`
      : `radial-gradient(circle at 14% 18%, rgba(45, 107, 255, 0.32), transparent 24%), radial-gradient(circle at 78% 18%, rgba(127, 208, 255, 0.16), transparent 20%), linear-gradient(135deg, ${COLORS.ink} 0%, ${COLORS.inkSoft} 100%)`;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: bg,
        opacity: interpolate(exit, [0, 1], [1, 0.9], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        transform: `perspective(2200px) translateX(${interpolate(exit, [0, 1], [0, -80])}px) translateY(${interpolate(
          exit,
          [0, 1],
          [0, -14],
        )}px) scale(${interpolate(exit, [0, 1], [1, 0.965])}) rotateY(${interpolate(
          exit,
          [0, 1],
          [0, -4],
        )}deg) translateZ(0)`,
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translateY(${interpolate(enter, [0, 1], [42, 0])}px) scale(${interpolate(
            enter,
            [0, 1],
            [1.04, 1],
          )}) rotateX(${interpolate(enter, [0, 1], [4, 0])}deg)`,
          opacity: interpolate(enter, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 35, 61, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 35, 61, 0.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: palette === "light" ? 0.38 : 0.14,
          mixBlendMode: palette === "light" ? "multiply" : "screen",
        }}
      />
    </AbsoluteFill>
  );
};

type KineticTitleProps = {
  readonly lines: readonly string[];
  readonly accent?: string;
  readonly align?: "left" | "center";
  readonly top?: number;
  readonly width?: number;
};

export const KineticTitle: React.FC<KineticTitleProps> = ({
  lines,
  accent = COLORS.accent,
  align = "left",
  top = 120,
  width = 1260,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: align === "center" ? 0 : 110,
        right: align === "center" ? 0 : undefined,
        width: align === "center" ? "100%" : width,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 14,
      }}
    >
      {lines.map((line, index) => {
        const delay = index * 8;
        const progress = spring({
          fps,
          frame: Math.max(0, frame - delay),
          config: {
            damping: 28,
            stiffness: 400,
            mass: 0.9,
          },
        });

        const accentWidth = interpolate(progress, [0, 1], [90, 280], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={line}
            style={{
              position: "relative",
              transform: `translateX(${interpolate(progress, [0, 1], [160, 0])}px) translateY(${interpolate(
                progress,
                [0, 1],
                [44, 0],
              )}px) rotateX(${interpolate(progress, [0, 1], [-56, 0])}deg)`,
              opacity: interpolate(progress, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -24,
                top: 34,
                height: 24,
                width: accentWidth,
                background: accent,
                borderRadius: 999,
                opacity: 0.16,
                filter: "blur(6px)",
              }}
            />
            <div
              style={{
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: -5,
                fontWeight: 800,
                color: COLORS.text,
                textAlign: align,
                textShadow: `0 16px 34px rgba(18, 42, 72, ${0.08 + Math.sin((frame + index * 5) / 18) * 0.03})`,
              }}
            >
              {line}
            </div>
          </div>
        );
      })}
    </div>
  );
};

type PanelProps = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly rotate?: number;
  readonly children: React.ReactNode;
  readonly dark?: boolean;
};

export const GlassPanel: React.FC<PanelProps> = ({
  x,
  y,
  width,
  height,
  rotate = 0,
  children,
  dark = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 34,
        padding: 28,
        boxSizing: "border-box",
        background: dark
          ? "linear-gradient(180deg, rgba(7, 17, 31, 0.92) 0%, rgba(12, 29, 51, 0.86) 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.84) 0%, rgba(242, 247, 255, 0.74) 100%)",
        border: `1.5px solid ${dark ? "rgba(127, 208, 255, 0.28)" : "rgba(109, 140, 187, 0.22)"}`,
        boxShadow: dark
          ? "0 28px 70px rgba(0, 0, 0, 0.28)"
          : "0 30px 80px rgba(91, 122, 169, 0.18)",
        backdropFilter: "blur(18px)",
        transform: `perspective(1600px) rotateX(1deg) rotateY(${rotate}deg)`,
      }}
    >
      {children}
    </div>
  );
};

type MediaPlaneProps = {
  readonly src: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly radius?: number;
  readonly rotateY?: number;
  readonly rotateX?: number;
  readonly shadow?: string;
};

export const MediaPlane: React.FC<MediaPlaneProps> = ({
  src,
  x,
  y,
  width,
  height,
  radius = 32,
  rotateY = 0,
  rotateX = 0,
  shadow = "0 32px 90px rgba(20, 49, 83, 0.2)",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: shadow,
        border: "1.5px solid rgba(255, 255, 255, 0.7)",
        transform: `perspective(1800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      }}
    >
      <Img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(12, 25, 43, 0.12) 100%)",
        }}
      />
    </div>
  );
};

type MetricPillProps = {
  readonly value: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly accent?: string;
  readonly dark?: boolean;
};

export const MetricPill: React.FC<MetricPillProps> = ({
  value,
  label,
  x,
  y,
  accent = COLORS.accent,
  dark = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        minWidth: 240,
        padding: "20px 28px",
        borderRadius: 999,
        background: dark
          ? "rgba(255, 255, 255, 0.08)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(232, 241, 255, 0.8) 100%)",
        border: `1.5px solid ${dark ? "rgba(127, 208, 255, 0.26)" : "rgba(45, 107, 255, 0.16)"}`,
        boxShadow: dark
          ? "0 24px 60px rgba(0, 0, 0, 0.2)"
          : "0 20px 54px rgba(70, 103, 147, 0.18)",
      }}
    >
      <div
        style={{ fontSize: 48, fontWeight: 800, color: accent, lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 24,
          lineHeight: 1.2,
          color: dark ? "rgba(255,255,255,0.82)" : COLORS.textSoft,
        }}
      >
        {label}
      </div>
    </div>
  );
};

type OrbitLabelProps = {
  readonly text: string;
  readonly angle: number;
  readonly radiusX: number;
  readonly radiusY: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly accent?: string;
};

export const OrbitLabel: React.FC<OrbitLabelProps> = ({
  text,
  angle,
  radiusX,
  radiusY,
  centerX,
  centerY,
  accent = COLORS.accent,
}) => {
  const frame = useCurrentFrame();
  const radians = ((angle + frame * 0.65) / 180) * Math.PI;
  const x = centerX + Math.cos(radians) * radiusX;
  const y = centerY + Math.sin(radians) * radiusY;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        padding: "14px 22px",
        borderRadius: 999,
        background: "rgba(255, 255, 255, 0.84)",
        border: "1.5px solid rgba(45, 107, 255, 0.12)",
        boxShadow: "0 20px 50px rgba(47, 84, 132, 0.14)",
        color: COLORS.text,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 0.4,
      }}
    >
      <span style={{ color: accent }}>{text}</span>
    </div>
  );
};

export const HorizonGlow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: -100,
          right: -100,
          bottom: 86,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, rgba(45, 107, 255, ${0.4 + Math.sin(frame / 22) * 0.08}) 30%, rgba(127, 208, 255, 0.95) 50%, rgba(45, 107, 255, 0.4) 70%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 320,
          right: 320,
          bottom: 20,
          height: 220,
          borderRadius: "50% 50% 0 0",
          background:
            "radial-gradient(circle at 50% 100%, rgba(127, 208, 255, 0.46) 0%, rgba(45, 107, 255, 0.2) 32%, transparent 72%)",
          filter: "blur(18px)",
        }}
      />
    </>
  );
};
