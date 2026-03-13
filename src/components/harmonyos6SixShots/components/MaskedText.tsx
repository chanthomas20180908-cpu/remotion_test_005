import React, { type CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { power4Out } from "../easings";

export type MaskedLineProps = {
  text: string;
  start: number;
  duration: number;
  offsetY?: number;
  style: CSSProperties;
};

export const MaskedLine: React.FC<MaskedLineProps> = ({
  text,
  start,
  duration,
  offsetY = 44,
  style,
}) => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [start, start + duration], [offsetY, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const wrap: CSSProperties = {
    overflow: "hidden",
    paddingBottom: 2,
  };

  const inner: CSSProperties = {
    transform: `translate3d(0, ${y}px, 0)`,
    willChange: "transform",
  };

  return (
    <div style={wrap}>
      <div style={inner}>
        <div style={style}>{text}</div>
      </div>
    </div>
  );
};

export type MaskedLinesProps = {
  lines: string[];
  start: number;
  lineDuration: number;
  lineStagger: number;
  offsetY?: number;
  style: CSSProperties;
};

export const MaskedLines: React.FC<MaskedLinesProps> = ({
  lines,
  start,
  lineDuration,
  lineStagger,
  offsetY,
  style,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {lines.map((l, i) => (
        <MaskedLine
          key={`${i}-${l}`}
          text={l}
          start={start + i * lineStagger}
          duration={lineDuration}
          offsetY={offsetY}
          style={style}
        />
      ))}
    </div>
  );
};
