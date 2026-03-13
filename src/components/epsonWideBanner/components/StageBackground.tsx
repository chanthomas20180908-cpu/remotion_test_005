import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { TINTS } from "../design-tokens";
import { ParticleFlow } from "./ParticleFlow";
import { RippleField } from "./RippleField";

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

/**
 * “无序但高级”的平滑扰动：用多频正弦叠加避免逐帧 hash 的抖动。
 * 输出范围：0..1（连续、可预测、不会闪烁成噪点）。
 */
const drift01 = (t: number, p1: number, p2: number, p3: number): number => {
  const v =
    Math.sin(t * 0.0107 + p1) +
    0.62 * Math.sin(t * 0.0249 + p2) +
    0.33 * Math.sin(t * 0.057 + p3);
  return clamp01(0.5 + 0.5 * (v / 1.95));
};

export type StageBackgroundProps = {
  /** 0..1; subtle modulation per scene */
  accentStrength?: number;
};

export const StageBackground: React.FC<StageBackgroundProps> = ({
  accentStrength = 0.4,
}) => {
  const frame = useCurrentFrame();

  // 背景必须“永远在运动”：超慢横向漂移 + 轻呼吸。
  const drift = interpolate(
    frame,
    [0, EPSON_WIDE_BANNER.totalDurationInFrames],
    [-28, 28],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // 主题色“闪烁”：必须克制（更像呼吸/闪光片段，不像 disco）。
  const breathe = 0.5 + Math.sin(frame * 0.02) * 0.5;
  const flicker =
    0.65 + 0.25 * Math.sin(frame * 0.11) + 0.1 * Math.sin(frame * 0.37 + 1.2);

  const w = EPSON_WIDE_BANNER.width;
  const h = EPSON_WIDE_BANNER.height;

  // “无序”色洗：多个漂移光斑，位置/强度都在缓慢漂移。
  const blob1x = w * (0.12 + 0.76 * drift01(frame, 1.2, 2.7, 5.1));
  const blob1y = h * (0.18 + 0.64 * drift01(frame, 3.4, 1.1, 4.2));
  const blob2x = w * (0.08 + 0.84 * drift01(frame, 6.3, 2.1, 0.7));
  const blob2y = h * (0.12 + 0.72 * drift01(frame, 2.2, 5.7, 1.9));
  const blob3x = w * (0.18 + 0.7 * drift01(frame, 4.8, 6.0, 2.6));
  const blob3y = h * (0.1 + 0.78 * drift01(frame, 0.4, 3.9, 6.2));

  const blobA = (0.12 + 0.1 * breathe) * (0.35 + 0.65 * accentStrength);
  const blobB = (0.09 + 0.07 * flicker) * (0.35 + 0.65 * accentStrength);
  const blobC = (0.075 + 0.06 * breathe) * (0.35 + 0.65 * accentStrength);

  const filmOpacity = (0.14 + 0.12 * flicker) * (0.35 + 0.65 * accentStrength);
  const grainOpacity = (0.09 + 0.07 * breathe) * (0.35 + 0.65 * accentStrength);

  return (
    <AbsoluteFill
      style={
        {
          // 背景底色必须为主题色（用户要求）：避免白底 + 让动效更可见。
          backgroundColor: TINTS.brand,
        } satisfies React.CSSProperties
      }
    >
      {/* ① 动态色洗（最底层环境） */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            transform: `translateX(${drift}px)`,
            background: `radial-gradient(620px 360px at ${blob1x}px ${blob1y}px, rgba(${TINTS.accentRgb},${blobA}) 0%, rgba(${TINTS.accentRgb},0) 72%), radial-gradient(540px 320px at ${blob2x}px ${blob2y}px, rgba(${TINTS.accentRgb},${blobB}) 0%, rgba(${TINTS.accentRgb},0) 70%), radial-gradient(520px 300px at ${blob3x}px ${blob3y}px, rgba(${TINTS.accentRgb},${blobC}) 0%, rgba(${TINTS.accentRgb},0) 70%), radial-gradient(500px 280px at 22% 70%, rgba(${TINTS.brandRgb},0.22) 0%, rgba(${TINTS.brandRgb},0) 70%)`,
          } satisfies React.CSSProperties
        }
      />

      {/* ② 全屏持续闪烁膜（显著但不刺眼） */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            background: `radial-gradient(720px 420px at 50% 50%, rgba(${TINTS.accentRgb},0.16) 0%, rgba(${TINTS.accentRgb},0) 70%), linear-gradient(0deg, rgba(${TINTS.accentRgb},0.10) 0%, rgba(${TINTS.accentRgb},0.0) 55%, rgba(${TINTS.accentRgb},0.08) 100%)`,
            opacity: filmOpacity,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />

      {/* ③ 波纹（全屏持续） */}
      <RippleField strength={0.78 * accentStrength + 0.32} />

      {/* ④ 粒子流（全屏持续） */}
      <ParticleFlow strength={0.85 * accentStrength + 0.22} />

      {/* ⑤ 颗粒/纹理（全屏持续） */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            opacity: grainOpacity,
            background:
              "repeating-linear-gradient(135deg, rgba(243,245,255,0.0) 0px, rgba(243,245,255,0.0) 6px, rgba(243,245,255,0.18) 7px, rgba(243,245,255,0.0) 11px)",
            transform: `translate3d(${Math.sin(frame * 0.013) * 10}px, ${Math.sin(frame * 0.017 + 1.8) * 6}px, 0)`,
            pointerEvents: "none",
          } satisfies React.CSSProperties
        }
      />
    </AbsoluteFill>
  );
};
