import React from "react";
import { Series } from "remotion";
import { S01 } from "./scenes/S01";
import { S02 } from "./scenes/S02";
import { S03 } from "./scenes/S03";
import { S04 } from "./scenes/S04";
import { S05 } from "./scenes/S05";
import { S06 } from "./scenes/S06";
import { S07 } from "./scenes/S07";
import { S08 } from "./scenes/S08";
import { S09 } from "./scenes/S09";
import { S10 } from "./scenes/S10";
import { S11 } from "./scenes/S11";

export const HarmonyOS6Video: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <S01 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <S02 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240}>
        <S03 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <S04 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240}>
        <S05 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <S06 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <S07 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <S08 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <S09 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180}>
        <S10 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <S11 />
      </Series.Sequence>
    </Series>
  );
};
