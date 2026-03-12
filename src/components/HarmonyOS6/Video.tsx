import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { S1_Genesis } from "./scenes/S1_Genesis";
import { S2_Intelligence } from "./scenes/S2_Intelligence";
import { S3_Security } from "./scenes/S3_Security";
import { S4_Performance } from "./scenes/S4_Performance";
import { S5_Synergy } from "./scenes/S5_Synergy";
import { S6_Outro } from "./scenes/S6_Outro";

export const DURATION_PER_SCENE = 135;
export const OVERLAP = 15;

const SCENES = [
  S1_Genesis,
  S2_Intelligence,
  S3_Security,
  S4_Performance,
  S5_Synergy,
  S6_Outro,
];

export const TOTAL_FRAMES =
  DURATION_PER_SCENE * SCENES.length - OVERLAP * (SCENES.length - 1);

export const HarmonyOS6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {SCENES.map((Scene, i) => {
        const startFrame = i * (DURATION_PER_SCENE - OVERLAP);
        return (
          <Sequence
            key={`scene-${i}`}
            from={startFrame}
            durationInFrames={DURATION_PER_SCENE}
          >
            <Scene />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
