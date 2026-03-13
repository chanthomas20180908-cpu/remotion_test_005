import React from "react";
import { AbsoluteFill } from "remotion";
import { useCurrentFrame, interpolate } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { EASING } from "../easing";
import { TINTS } from "../design-tokens";

export type RippleFieldProps = {
  /** 0..1 */
  strength?: number;
};

type Ripple = {
  x01: number;
  y01: number;
  period: number;
  offset: number;
  baseR: number;
};

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

export const RippleField: React.FC<RippleFieldProps> = ({ strength = 0.5 }) => {
  const frame = useCurrentFrame();

  // 全屏持续波纹：必须“明显但克制”，避免像特效模板。
  const ripples: Ripple[] = [
    { x01: 0.22, y01: 0.34, period: 200, offset: 0, baseR: 58 },
    { x01: 0.36, y01: 0.68, period: 230, offset: 44, baseR: 66 },
    { x01: 0.52, y01: 0.46, period: 260, offset: 92, baseR: 74 },
    { x01: 0.68, y01: 0.24, period: 210, offset: 138, baseR: 62 },
    { x01: 0.78, y01: 0.62, period: 240, offset: 176, baseR: 82 },
    { x01: 0.88, y01: 0.42, period: 280, offset: 210, baseR: 92 },
  ];

  const w = EPSON_WIDE_BANNER.width;
  const h = EPSON_WIDE_BANNER.height;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {ripples.map((r) => {
        const local = (frame + r.offset) % r.period;
        const t = local / r.period;
        const p = clamp01(
          interpolate(t, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASING.expoInOut,
          }),
        );

        const scale = 0.35 + p * 1.25;
        const a = (1 - p) * (0.22 + 0.08 * strength);
        const size = r.baseR * 2;

        return (
          <div
            key={`${r.x01}-${r.y01}-${r.period}-${r.offset}`}
            style={
              {
                position: "absolute",
                left: r.x01 * w - size,
                top: r.y01 * h - size,
                width: size * 2,
                height: size * 2,
                borderRadius: 999,
                border: `1.5px solid rgba(${TINTS.accentRgb},${a})`,
                transform: `scale(${scale})`,
                transformOrigin: "50% 50%",
                willChange: "transform, opacity",
              } satisfies React.CSSProperties
            }
          />
        );
      })}

      {/* 第二层：全屏“水面纹理”，持续存在（不靠一闪而过） */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            background: `repeating-radial-gradient(circle at 50% 50%, rgba(${TINTS.accentRgb},0) 0px, rgba(${TINTS.accentRgb},0.08) 1px, rgba(${TINTS.accentRgb},0) 18px), radial-gradient(560px 320px at 18% 40%, rgba(${TINTS.accentRgb},0.10) 0%, rgba(${TINTS.accentRgb},0) 70%), radial-gradient(620px 360px at 82% 62%, rgba(${TINTS.accentRgb},0.08) 0%, rgba(${TINTS.accentRgb},0) 70%)`,
            opacity: 0.34 * strength,
            transform: `translate3d(${Math.sin(frame * 0.011) * 14}px, ${Math.sin(frame * 0.016 + 1.1) * 9}px, 0) scale(${1.0 + Math.sin(frame * 0.007) * 0.02})`,
            transformOrigin: "50% 50%",
          } satisfies React.CSSProperties
        }
      />
    </AbsoluteFill>
  );
};
