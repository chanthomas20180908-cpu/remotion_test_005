import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { TINTS } from "../design-tokens";

export type ParticleFlowProps = {
  /** 0..1 */
  strength?: number;
};

type Particle = {
  seed: number;
  x01: number;
  y01: number;
  r: number;
  a: number;
  vx: number;
};

const fract = (v: number): number => v - Math.floor(v);

const hash01 = (seed: number): number => {
  return fract(Math.sin(seed) * 43758.5453123);
};

export const ParticleFlow: React.FC<ParticleFlowProps> = ({
  strength = 0.55,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo((): Particle[] => {
    // 低数量 + 低对比：只做“空气流动”，避免廉价粒子雨。
    const count = 68;
    const list: Particle[] = [];
    for (let i = 0; i < count; i += 1) {
      const s = 7000 + i * 19.7;
      const x01 = hash01(s * 1.3);
      const y01 = hash01(s * 2.1);
      const r = 1.2 + hash01(s * 3.7) * 2.8;
      const a = 0.08 + hash01(s * 4.9) * 0.12;
      const vx = 0.25 + hash01(s * 6.1) * 0.6;
      list.push({ seed: s, x01, y01, r, a, vx });
    }
    return list;
  }, []);

  const w = EPSON_WIDE_BANNER.width;
  const h = EPSON_WIDE_BANNER.height;

  return (
    <AbsoluteFill
      style={
        {
          pointerEvents: "none",
          opacity: 0.85 * strength,
        } satisfies React.CSSProperties
      }
    >
      {particles.map((p) => {
        const driftY =
          Math.sin(frame * 0.022 + p.seed) * (3.5 + 4.5 * strength);
        const speed = p.vx * (0.7 + 0.7 * strength);
        const xx = ((p.x01 * w + frame * speed * 7.5) % (w + 120)) - 60;
        const yy = p.y01 * h + driftY;

        return (
          <div
            key={p.seed}
            style={
              {
                position: "absolute",
                left: xx,
                top: yy,
                width: p.r * 2,
                height: p.r * 2,
                borderRadius: 999,
                background: `radial-gradient(circle at 35% 35%, rgba(${TINTS.accentRgb},${p.a}) 0%, rgba(${TINTS.accentRgb},0) 70%)`,
                opacity: 1,
              } satisfies React.CSSProperties
            }
          />
        );
      })}

      {/* 全屏“流线”：持续、低频，增强“背景在动”的可感知性 */}
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, rgba(243,245,255,0) 0px, rgba(243,245,255,0) 62px, rgba(243,245,255,0.12) 63px, rgba(243,245,255,0) 96px)",
            opacity: 0.36 * strength,
            transform: `translateX(${Math.sin(frame * 0.01) * 18}px)`,
          } satisfies React.CSSProperties
        }
      />
    </AbsoluteFill>
  );
};
