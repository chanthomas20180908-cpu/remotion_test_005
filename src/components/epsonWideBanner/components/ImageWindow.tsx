import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { EASING } from "../easing";
import { TINTS } from "../design-tokens";

export type WindowShape = "rect" | "chamfer" | "diagonal";
export type WindowLayoutVariant = "hero" | "stand";

export type ImageWindowProps = {
  /** 用于跨场连续运镜（传入全局 frame） */
  globalFrame: number;
  intensity: number;
  shape: WindowShape;
  layoutVariant: WindowLayoutVariant;
  children: React.ReactNode;
};

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

const pct = (v01: number): string => `${Math.round(clamp01(v01) * 1000) / 10}%`;

const polygonClip = (points: Array<[number, number]>): string => {
  const str = points.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ");
  return `polygon(${str})`;
};

const getShapeClipPath = (shape: WindowShape): string | null => {
  switch (shape) {
    case "rect":
      return null;
    case "chamfer": {
      const cut = 0.07;
      return polygonClip([
        [0, 0],
        [1 - cut, 0],
        [1, cut],
        [1, 1],
        [0, 1],
      ]);
    }
    case "diagonal": {
      const cut = 0.12;
      return polygonClip([
        [0, 0],
        [1, 0],
        [1 - cut, 1],
        [0, 1],
      ]);
    }
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
};

export const ImageWindow: React.FC<ImageWindowProps> = ({
  globalFrame,
  intensity,
  shape,
  layoutVariant,
  children,
}) => {
  const frame = useCurrentFrame();

  // 首屏落座：非常短（避免 PPT 的“进场表演”）。
  const introScale = interpolate(frame, [0, 18], [0.992, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASING.power4Out,
  });

  const introX = interpolate(frame, [0, 18], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASING.power4Out,
  });

  // 超慢 Ken Burns（容器 + 内图反向）：持续运镜。
  const push = interpolate(
    globalFrame,
    [0, Math.max(1, EPSON_WIDE_BANNER.totalDurationInFrames)],
    [1.0, 1.05 + 0.01 * intensity],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASING.expoInOut,
    },
  );

  const containerX = interpolate(
    globalFrame,
    [0, Math.max(1, EPSON_WIDE_BANNER.totalDurationInFrames)],
    [0, -10 * intensity],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASING.expoInOut,
    },
  );
  const containerY = Math.sin(globalFrame * 0.02) * 1.2 * intensity;

  const safeX = EPSON_WIDE_BANNER.safe.x;
  const safeY = EPSON_WIDE_BANNER.safe.y;
  const contentW = EPSON_WIDE_BANNER.width - safeX * 2;
  const contentH = EPSON_WIDE_BANNER.height - safeY * 2;
  const leftRegionW = contentW * EPSON_WIDE_BANNER.layout.leftRatio;
  const rightRegionW = contentW - leftRegionW - EPSON_WIDE_BANNER.layout.gutter;

  const windowW =
    layoutVariant === "stand"
      ? Math.max(420, rightRegionW * 0.78)
      : rightRegionW;
  const windowH = Math.max(124, contentH * 0.92);
  const x = EPSON_WIDE_BANNER.width - safeX - windowW;
  const y = (EPSON_WIDE_BANNER.height - windowH) / 2;

  const clipPath = getShapeClipPath(shape);

  return (
    <div
      style={
        {
          position: "absolute",
          left: x,
          top: y,
          width: windowW,
          height: windowH,
          overflow: "hidden",
          borderRadius: 2,
          transform: `translate3d(${containerX + introX}px, ${containerY}px, 0) scale(${introScale})`,
          backgroundColor: "rgba(26,36,51,0.02)",
          border: "1px solid rgba(11,18,32,0.12)",
          boxShadow: "0 10px 30px rgba(11,18,32,0.12)",
          clipPath: clipPath ?? undefined,
          WebkitClipPath: clipPath ?? undefined,
          willChange: "transform, clip-path",
        } satisfies React.CSSProperties
      }
    >
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            transform: `scale(${push})`,
            transformOrigin: "50% 50%",
          } satisfies React.CSSProperties
        }
      >
        {children}
      </div>

      {/* 极弱“质感边光”（不做 glow，不做 blend mode） */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.13) 48%, rgba(255,255,255,0) 68%)",
            opacity: 0.35,
            transform: `translateX(${((-240 + globalFrame * 3.1) % (windowW + 480)) - 240}px)`,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />

      {/* 内衬：把黑白对比压到“tinted greys” */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            border: `1px solid rgba(255,255,255,0.22)`,
            opacity: 0.35,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />

      {/* 右下角极小标记（避免空洞，也避免像 UI 组件） */}
      <div
        style={
          {
            position: "absolute",
            right: 10,
            bottom: 8,
            width: 26,
            height: 1,
            backgroundColor: TINTS.grey3,
            opacity: 0.35,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />
    </div>
  );
};
