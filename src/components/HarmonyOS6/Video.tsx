import type { FC } from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { HARMONY_SCENES } from "./constants";
import { SceneRenderer } from "./scenes/SceneRenderer";
import bgm from "./assets/audio/bgm.wav";

export const HarmonyOS6Video: FC = () => {
  const sceneStarts = HARMONY_SCENES.reduce<number[]>((acc, scene, index) => {
    if (index === 0) {
      return [0];
    }

    return [
      ...acc,
      acc[index - 1] + HARMONY_SCENES[index - 1].durationInFrames,
    ];
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#eef3ff" }}>
      <Audio src={bgm} volume={0.3} />
      {HARMONY_SCENES.map((scene, index) => (
        <Sequence
          key={scene.id}
          from={sceneStarts[index]}
          durationInFrames={scene.durationInFrames}
        >
          <SceneRenderer scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
