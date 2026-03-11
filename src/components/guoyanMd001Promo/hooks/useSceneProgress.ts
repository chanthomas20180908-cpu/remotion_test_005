import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useSceneProgress = (
  durationInFrames: number,
): {
  opacity: number;
  translateY: number;
  progress: number;
  cardScale: number;
} => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    fps,
    frame,
    durationInFrames: 28,
    config: {
      damping: 200,
      stiffness: 140,
      mass: 0.9,
    },
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity = Math.min(1, enter) * exit;
  const translateY = interpolate(opacity, [0, 1], [56, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(progress, [0, 1], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    opacity,
    translateY,
    progress,
    cardScale,
  };
};
