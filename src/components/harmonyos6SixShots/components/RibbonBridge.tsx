import React, { type CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  COLORS,
  TOTAL_DURATION_IN_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";
import { power4InOut, power4Out } from "../easings";

type Knot = {
  f: number;
  // 二次贝塞尔：P0 -> P1 -> P2
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  a: number; // opacity
};

const knots: Knot[] = [
  {
    f: 0,
    p0: [0.52, 0.62],
    p1: [0.76, 0.42],
    p2: [0.92, 0.46],
    a: 0.0,
  },
  {
    f: 8,
    p0: [0.52, 0.62],
    p1: [0.76, 0.42],
    p2: [0.92, 0.46],
    a: 1.0,
  },
  {
    f: 122,
    p0: [0.46, 0.64],
    p1: [0.7, 0.44],
    p2: [0.92, 0.56],
    a: 1.0,
  },
  {
    f: 236,
    p0: [0.44, 0.58],
    p1: [0.68, 0.52],
    p2: [0.93, 0.5],
    a: 0.95,
  },
  {
    f: 346,
    p0: [0.46, 0.48],
    p1: [0.72, 0.46],
    p2: [0.92, 0.58],
    a: 0.85,
  },
  {
    f: 468,
    p0: [0.42, 0.55],
    p1: [0.74, 0.38],
    p2: [0.92, 0.46],
    a: 0.95,
  },
  {
    f: 580,
    p0: [0.4, 0.58],
    p1: [0.66, 0.64],
    p2: [0.92, 0.52],
    a: 0.9,
  },
  {
    f: TOTAL_DURATION_IN_FRAMES - 1,
    p0: [0.4, 0.58],
    p1: [0.66, 0.64],
    p2: [0.92, 0.52],
    a: 0.0,
  },
] as const;

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const sample = (
  frame: number,
): {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  a: number;
} => {
  const clamped = Math.max(0, Math.min(TOTAL_DURATION_IN_FRAMES - 1, frame));
  const i = Math.max(
    0,
    knots.findIndex(
      (k, idx) =>
        idx < knots.length - 1 && clamped >= k.f && clamped < knots[idx + 1].f,
    ),
  );
  const aK = knots[i];
  const bK = knots[Math.min(knots.length - 1, i + 1)];
  const span = Math.max(1, bK.f - aK.f);
  const t = (clamped - aK.f) / span;
  const eased = power4InOut(t);

  const p0: [number, number] = [
    lerp(aK.p0[0], bK.p0[0], eased),
    lerp(aK.p0[1], bK.p0[1], eased),
  ];
  const p1: [number, number] = [
    lerp(aK.p1[0], bK.p1[0], eased),
    lerp(aK.p1[1], bK.p1[1], eased),
  ];
  const p2: [number, number] = [
    lerp(aK.p2[0], bK.p2[0], eased),
    lerp(aK.p2[1], bK.p2[1], eased),
  ];
  const a = lerp(aK.a, bK.a, eased);
  return { p0, p1, p2, a };
};

export const RibbonBridge: React.FC = () => {
  const frame = useCurrentFrame();

  const { p0, p1, p2, a } = sample(frame);

  // 轻微“流动”：不靠 glow，而靠位移与线宽微变
  const breathe = interpolate(frame, [0, 45, 90], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const sw = 2.0 + 0.7 * breathe;
  const ox = 2.5 * breathe;

  const toAbs = (p: [number, number]): [number, number] => [
    p[0] * VIDEO_WIDTH + ox,
    p[1] * VIDEO_HEIGHT,
  ];
  const P0 = toAbs(p0);
  const P1 = toAbs(p1);
  const P2 = toAbs(p2);
  const d = `M ${P0[0].toFixed(1)} ${P0[1].toFixed(1)} Q ${P1[0].toFixed(1)} ${P1[1].toFixed(1)} ${P2[0].toFixed(1)} ${P2[1].toFixed(1)}`;

  const layer: CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: a,
    mixBlendMode: "screen",
  };

  return (
    <div style={layer}>
      <svg
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        viewBox={`0 0 ${VIDEO_WIDTH} ${VIDEO_HEIGHT}`}
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor={COLORS.accent.teal}
              stopOpacity={0.65}
            />
            <stop
              offset="55%"
              stopColor={COLORS.accent.cyan}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={COLORS.accent.teal}
              stopOpacity={0.55}
            />
          </linearGradient>
        </defs>
        <path
          d={d}
          fill="none"
          stroke="url(#ribbonGrad)"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
