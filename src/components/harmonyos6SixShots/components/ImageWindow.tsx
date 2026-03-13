import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { power4Out } from "../easings";
import { COLORS } from "../constants";

export type ImageWindowProps = {
  src: string;
  start: number;
  duration: number;
  direction?: "from-right" | "from-left" | "from-top" | "from-bottom";
  borderRadius?: number;
  borderOpacity?: number;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
};

export const ImageWindow: React.FC<ImageWindowProps> = ({
  src,
  start,
  duration,
  direction = "from-right",
  borderRadius = 0,
  borderOpacity = 0.85,
  style,
  imageStyle,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const clip = (() => {
    const inv = 1 - p;
    if (direction === "from-right") {
      return `inset(0 ${Math.round(inv * 100)}% 0 0)`;
    }
    if (direction === "from-left") {
      return `inset(0 0 0 ${Math.round(inv * 100)}%)`;
    }
    if (direction === "from-top") {
      return `inset(${Math.round(inv * 100)}% 0 0 0)`;
    }
    return `inset(0 0 ${Math.round(inv * 100)}% 0)`;
  })();

  const wrap: CSSProperties = {
    position: "relative",
    borderRadius,
    overflow: "hidden",
    clipPath: clip,
    backgroundColor: "rgba(255,255,255,0.02)",
    border: `1.5px solid rgba(215,224,236,${borderOpacity})`,
    ...style,
  };

  const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "saturate(1.02)",
    ...imageStyle,
  };

  const scrim: CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(11,18,32,0.18), rgba(11,18,32,0) 55%, rgba(11,18,32,0.10))",
    mixBlendMode: "multiply",
    pointerEvents: "none",
  };

  return (
    <div style={wrap}>
      <Img src={src} style={imgStyle} />
      <div style={scrim} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.04)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export const GlassStroke: React.FC<{
  variant: "light" | "dark";
  style?: CSSProperties;
}> = ({ variant, style }) => {
  const stroke = variant === "dark" ? COLORS.dark.stroke : COLORS.light.stroke;
  return (
    <div
      style={{
        border: `1.5px solid ${stroke}`,
        backgroundColor:
          variant === "dark"
            ? "rgba(255,255,255,0.03)"
            : "rgba(255,255,255,0.70)",
        ...style,
      }}
    />
  );
};
