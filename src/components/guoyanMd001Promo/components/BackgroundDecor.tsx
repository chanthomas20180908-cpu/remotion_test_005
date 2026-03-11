import type { CSSProperties, FC } from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { MEDIA } from "../constants";
import { palette } from "../styles/palette";

type BackgroundDecorProps = {
  accent?: "left" | "right";
};

export const BackgroundDecor: FC<BackgroundDecorProps> = ({
  accent = "right",
}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(
    frame,
    [0, 180],
    [0, accent === "right" ? -24 : 24],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const gridStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(31, 111, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(31, 111, 255, 0.07) 1px, transparent 1px)",
    backgroundSize: "120px 120px",
    maskImage: "linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.14))",
    opacity: 0.65,
  };

  return (
    <AbsoluteFill
      style={{ background: palette.background, overflow: "hidden" }}
    >
      <div style={gridStyle} />
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: 9999,
          left: accent === "left" ? -180 + drift : undefined,
          right: accent === "right" ? -180 + drift : undefined,
          top: 60,
          background:
            "radial-gradient(circle, rgba(84,199,255,0.34), rgba(84,199,255,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: 9999,
          left: accent === "left" ? undefined : 180 - drift,
          right: accent === "left" ? 180 - drift : undefined,
          bottom: -110,
          background:
            "radial-gradient(circle, rgba(125,107,255,0.24), rgba(125,107,255,0))",
        }}
      />
      <Img
        src={MEDIA.accentDashed}
        style={{
          position: "absolute",
          width: 420,
          right: 140,
          top: 160,
          opacity: 0.55,
        }}
      />
      <Img
        src={MEDIA.accentBars}
        style={{
          position: "absolute",
          width: 82,
          left: 120,
          bottom: 120,
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
