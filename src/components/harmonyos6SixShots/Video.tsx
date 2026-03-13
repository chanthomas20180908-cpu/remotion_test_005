import React, { type CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { expoInOut } from "./easings";
import { SCENE_DURATIONS, TRANSITION_DURATION } from "./constants";
import { RibbonBridge } from "./components/RibbonBridge";
import { S01Hook } from "./scenes/S01_Hook";
import { S02LightSense } from "./scenes/S02_LightSense";
import { S03OneSentence } from "./scenes/S03_OneSentence";
import { S04Security } from "./scenes/S04_Security";
import { S05Fluent } from "./scenes/S05_Fluent";
import { S06Closer } from "./scenes/S06_Closer";

const containerStyle: CSSProperties = {
  backgroundColor: "#000000",
};

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={containerStyle}>
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
          <S02LightSense />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-right" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S03}>
          <S03OneSentence />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S04}>
          <S04Security />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S05}>
          <S05Fluent />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({
            durationInFrames: TRANSITION_DURATION,
            easing: expoInOut,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.S06}>
          <S06Closer />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* 母题元素越界继承：Ribbon 全片持续存在（避免切页感） */}
      <RibbonBridge />
    </AbsoluteFill>
  );
};
