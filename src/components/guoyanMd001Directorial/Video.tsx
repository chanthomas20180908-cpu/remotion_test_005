import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./constants";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Momentum } from "./scenes/Scene02Momentum";
import { Scene03Breakthroughs } from "./scenes/Scene03Breakthroughs";
import { Scene04TechProof } from "./scenes/Scene04TechProof";
import { Scene05Flagship } from "./scenes/Scene05Flagship";
import { Scene06Team } from "./scenes/Scene06Team";
import { Scene07Future } from "./scenes/Scene07Future";

export const GuoyanMd001DirectorialVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f7fb" }}>
      <Sequence from={SCENES[0].from} durationInFrames={SCENES[0].duration}>
        <Scene01Hook durationInFrames={SCENES[0].duration} />
      </Sequence>
      <Sequence from={SCENES[1].from} durationInFrames={SCENES[1].duration}>
        <Scene02Momentum durationInFrames={SCENES[1].duration} />
      </Sequence>
      <Sequence from={SCENES[2].from} durationInFrames={SCENES[2].duration}>
        <Scene03Breakthroughs durationInFrames={SCENES[2].duration} />
      </Sequence>
      <Sequence from={SCENES[3].from} durationInFrames={SCENES[3].duration}>
        <Scene04TechProof durationInFrames={SCENES[3].duration} />
      </Sequence>
      <Sequence from={SCENES[4].from} durationInFrames={SCENES[4].duration}>
        <Scene05Flagship durationInFrames={SCENES[4].duration} />
      </Sequence>
      <Sequence from={SCENES[5].from} durationInFrames={SCENES[5].duration}>
        <Scene06Team durationInFrames={SCENES[5].duration} />
      </Sequence>
      <Sequence from={SCENES[6].from} durationInFrames={SCENES[6].duration}>
        <Scene07Future durationInFrames={SCENES[6].duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
