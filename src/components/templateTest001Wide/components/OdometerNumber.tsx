import React, { useMemo } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { easeExpoInOut } from "./easing";

export type OdometerNumberProps = {
  startFrame: number;
  duration: number;
  from: number;
  to: number;
  formatLocale: string;
  style: React.CSSProperties;
};

export const OdometerNumber: React.FC<OdometerNumberProps> = ({
  startFrame,
  duration,
  from,
  to,
  formatLocale,
  style,
}) => {
  const frame = useCurrentFrame();
  const value = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeExpoInOut,
    },
  );

  const formatted = useMemo((): string => {
    const nf = new Intl.NumberFormat(formatLocale);
    return nf.format(Math.floor(value));
  }, [formatLocale, value]);

  return <div style={style}>{formatted}</div>;
};
