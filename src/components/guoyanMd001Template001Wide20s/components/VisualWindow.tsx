import type { CSSProperties, FC } from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate } from "remotion";
import { expoInOut } from "../easings";

type VisualWindowProps = {
  src: string;
  startFrame: number;
  durationFrames: number;
  style?: CSSProperties;
  rounding?: number;
};

export const VisualWindow: FC<VisualWindowProps> = ({
  src,
  startFrame,
  durationFrames,
  style,
  rounding = 0,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      easing: expoInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const windowScale = interpolate(p, [0, 1], [0.98, 1]);
  const windowY = interpolate(p, [0, 1], [18, 0]);
  const innerScale = interpolate(p, [0, 1], [1.12, 1.02]);
  const innerX = interpolate(p, [0, 1], [-14, 0]);

  return (
    <AbsoluteFill
      style={{
        ...style,
        overflow: "hidden",
        borderRadius: rounding,
        transform: `translate3d(0, ${windowY}px, 0) scale(${windowScale})`,
        willChange: "transform",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate3d(${innerX}px, 0, 0) scale(${innerScale})`,
          willChange: "transform",
        }}
      />
    </AbsoluteFill>
  );
};
