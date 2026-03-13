import type { CSSProperties, FC } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { power4Out } from "../easings";

type MaskedTextProps = {
  text: string;
  startFrame: number;
  durationFrames: number;
  style: CSSProperties;
};

export const MaskedText: FC<MaskedTextProps> = ({
  text,
  startFrame,
  durationFrames,
  style,
}) => {
  const frame = useCurrentFrame();

  // 仅 transform：避免 clip-path 逐帧合成卡顿
  const y = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [58, 0],
    {
      easing: power4Out,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          ...style,
          transform: `translate3d(0, ${y}px, 0)`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {text}
      </div>
    </div>
  );
};
