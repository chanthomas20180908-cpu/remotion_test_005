import type { FC } from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import {
  ASSET_PATHS,
  COLORS,
  SCENE_DURATIONS,
  TRANSITION_DURATION,
} from "./constants";
import { expoInOut } from "./easings";
import { MicroBackground } from "./components/MicroBackground";
import { MotifOverlay } from "./components/MotifOverlay";
import { S01Hook } from "./scenes/S01_Hook";
import { S02YearInOneLook } from "./scenes/S02_YearInOneLook";
import { S03FlagshipProof } from "./scenes/S03_FlagshipProof";
import { S04TeamHonors } from "./scenes/S04_TeamHonors";
import { S05FutureCTA } from "./scenes/S05_FutureCTA";
import { staticFile } from "remotion";

export const GuoyanMd001Template001Wide20sVideo: FC = () => {
  const frame = useCurrentFrame();

  // BGM：轻微淡入淡出（主叙事元素不靠 opacity）
  const bgmFadeIn = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgmFadeOut = interpolate(
    frame,
    [
      SCENE_DURATIONS.S01 +
        SCENE_DURATIONS.S02 +
        SCENE_DURATIONS.S03 +
        SCENE_DURATIONS.S04 +
        SCENE_DURATIONS.S05 -
        4 * TRANSITION_DURATION -
        18,
      SCENE_DURATIONS.S01 +
        SCENE_DURATIONS.S02 +
        SCENE_DURATIONS.S03 +
        SCENE_DURATIONS.S04 +
        SCENE_DURATIONS.S05 -
        4 * TRANSITION_DURATION,
    ],
    [1, 0],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const bgmVolume = 0.14 * bgmFadeIn * bgmFadeOut;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Audio src={staticFile(ASSET_PATHS.bgm)} volume={bgmVolume} />

      <MicroBackground />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S01}>
          <S01Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S02}>
          <S02YearInOneLook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-right" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S03}>
          <S03FlagshipProof />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S04}>
          <S04TeamHonors />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S05}>
          <S05FutureCTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <MotifOverlay />
    </AbsoluteFill>
  );
};
