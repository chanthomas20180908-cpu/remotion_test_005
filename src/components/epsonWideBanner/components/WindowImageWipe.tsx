import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASING } from "../easing";
import { WindowImage } from "./WindowImage";

export type WindowImageWipeProps = {
  fromSrc: string;
  toSrc: string;
  /** local frames inside the scene */
  fromFrame: number;
  durationInFrames: number;
  fit: "cover" | "contain";
};

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

const pct = (v01: number): string => `${Math.round(clamp01(v01) * 1000) / 10}%`;

const polygonClip = (points: Array<[number, number]>): string => {
  const str = points.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ");
  return `polygon(${str})`;
};

export const WindowImageWipe: React.FC<WindowImageWipeProps> = ({
  fromSrc,
  toSrc,
  fromFrame,
  durationInFrames,
  fit,
}) => {
  const frame = useCurrentFrame();

  const p = clamp01(
    interpolate(frame, [fromFrame, fromFrame + durationInFrames], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASING.expoInOut,
    }),
  );

  // 几何切入：斜刀（避免 crossfade）。
  const skew = 0.16;
  const x = -skew + p * (1 + skew);
  const clipPath =
    p <= 0.001
      ? polygonClip([
          [0, 0],
          [0, 0],
          [0, 1],
          [0, 1],
        ])
      : p >= 0.999
        ? null
        : polygonClip([
            [0, 0],
            [x, 0],
            [x - skew, 1],
            [0, 1],
          ]);

  return (
    <div
      style={
        {
          position: "absolute",
          inset: 0,
        } satisfies React.CSSProperties
      }
    >
      <WindowImage src={fromSrc} fit={fit} zoom={1.02} />
      <div
        style={
          {
            position: "absolute",
            inset: 0,
            clipPath: clipPath ?? undefined,
            WebkitClipPath: clipPath ?? undefined,
            willChange: "clip-path",
          } satisfies React.CSSProperties
        }
      >
        <WindowImage src={toSrc} fit={fit} zoom={1.02} />
      </div>
    </div>
  );
};
