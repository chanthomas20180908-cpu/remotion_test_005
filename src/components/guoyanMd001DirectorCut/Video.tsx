import type { FC } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { BRAND, SCENE_DURATIONS } from "./constants";
import { CapabilityScene } from "./scenes/CapabilityScene";
import { FutureScene } from "./scenes/FutureScene";
import { HeroScene } from "./scenes/HeroScene";
import { MomentumScene } from "./scenes/MomentumScene";
import { ProjectScene } from "./scenes/ProjectScene";
import { TeamScene } from "./scenes/TeamScene";

const SCENES: Array<FC<{ durationInFrames: number }>> = [
  HeroScene,
  MomentumScene,
  CapabilityScene,
  ProjectScene,
  TeamScene,
  FutureScene,
];

export const GuoyanMd001DirectorCutVideo: FC = () => {
  const sceneStarts = SCENE_DURATIONS.reduce<number[]>(
    (acc, duration, index) => {
      if (index === 0) {
        return [0];
      }

      return [...acc, acc[index - 1] + SCENE_DURATIONS[index - 1]];
    },
    [],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg }}>
      {SCENES.map((SceneComponent, index) => {
        const durationInFrames = SCENE_DURATIONS[index];

        return (
          <Sequence
            key={`${index}-${durationInFrames}`}
            from={sceneStarts[index]}
            durationInFrames={durationInFrames}
          >
            <SceneComponent durationInFrames={durationInFrames} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
