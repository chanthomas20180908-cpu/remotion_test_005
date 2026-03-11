import type { FC } from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { AUDIO, STORYBOARD } from "./constants";
import { BusinessScene } from "./scenes/BusinessScene";
import { ContextScene } from "./scenes/ContextScene";
import { FlagshipProjectScene } from "./scenes/FlagshipProjectScene";
import { FutureScene } from "./scenes/FutureScene";
import { HeroScene } from "./scenes/HeroScene";
import { InnovationScene } from "./scenes/InnovationScene";
import { ResponsibilityScene } from "./scenes/ResponsibilityScene";
import { TeamScene } from "./scenes/TeamScene";

export const GuoyanMd001PromoVideo: FC = () => {
  const sceneDurations = STORYBOARD.map(
    (scene) => scene.estimatedDurationFrames,
  );
  const sceneStarts = sceneDurations.reduce<number[]>(
    (acc, duration, index) => {
      if (index === 0) {
        return [0];
      }

      return [...acc, acc[index - 1] + sceneDurations[index - 1]];
    },
    [],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#f4f9ff" }}>
      <Audio src={AUDIO.bgm} volume={0.12} />
      <Sequence from={sceneStarts[0]} durationInFrames={sceneDurations[0]}>
        <Audio src={AUDIO.voiceovers.S1} volume={1} />
        <HeroScene durationInFrames={sceneDurations[0]} />
      </Sequence>
      <Sequence from={sceneStarts[1]} durationInFrames={sceneDurations[1]}>
        <Audio src={AUDIO.voiceovers.S2} volume={1} />
        <ContextScene durationInFrames={sceneDurations[1]} />
      </Sequence>
      <Sequence from={sceneStarts[2]} durationInFrames={sceneDurations[2]}>
        <Audio src={AUDIO.voiceovers.S3} volume={1} />
        <BusinessScene durationInFrames={sceneDurations[2]} />
      </Sequence>
      <Sequence from={sceneStarts[3]} durationInFrames={sceneDurations[3]}>
        <Audio src={AUDIO.voiceovers.S4} volume={1} />
        <InnovationScene durationInFrames={sceneDurations[3]} />
      </Sequence>
      <Sequence from={sceneStarts[4]} durationInFrames={sceneDurations[4]}>
        <Audio src={AUDIO.voiceovers.S5} volume={1} />
        <FlagshipProjectScene durationInFrames={sceneDurations[4]} />
      </Sequence>
      <Sequence from={sceneStarts[5]} durationInFrames={sceneDurations[5]}>
        <Audio src={AUDIO.voiceovers.S6} volume={1} />
        <ResponsibilityScene durationInFrames={sceneDurations[5]} />
      </Sequence>
      <Sequence from={sceneStarts[6]} durationInFrames={sceneDurations[6]}>
        <Audio src={AUDIO.voiceovers.S7} volume={1} />
        <TeamScene durationInFrames={sceneDurations[6]} />
      </Sequence>
      <Sequence from={sceneStarts[7]} durationInFrames={sceneDurations[7]}>
        <Audio src={AUDIO.voiceovers.S8} volume={1} />
        <FutureScene durationInFrames={sceneDurations[7]} />
      </Sequence>
    </AbsoluteFill>
  );
};
