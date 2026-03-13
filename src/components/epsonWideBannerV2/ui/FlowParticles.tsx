import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { CANVAS, COLORS } from "../constants";
import { mod } from "../utils/mod";

type Particle = {
  x0: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
};

export type FlowParticlesProps = {
  localFrame: number;
};

export const FlowParticles: React.FC<FlowParticlesProps> = ({ localFrame }) => {
  const particles = useMemo((): Particle[] => {
    // 手工定值，保证稳定（避免随机导致“AI 味”与不可控）
    return [
      { x0: 40, y: 34, r: 2, speed: 0.9, alpha: 0.08 },
      { x0: 220, y: 64, r: 1.5, speed: 0.7, alpha: 0.06 },
      { x0: 420, y: 52, r: 2, speed: 1.1, alpha: 0.07 },
      { x0: 680, y: 84, r: 1.5, speed: 0.8, alpha: 0.05 },
      { x0: 860, y: 44, r: 2, speed: 0.6, alpha: 0.06 },
      { x0: 1040, y: 72, r: 1.5, speed: 0.95, alpha: 0.05 },
    ];
  }, []);

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      {particles.map((p, i) => {
        const x = mod(p.x0 + localFrame * p.speed, CANVAS.w + 80) - 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: p.y,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: 999,
              backgroundColor: COLORS.brandBlueSoft,
              opacity: p.alpha,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
