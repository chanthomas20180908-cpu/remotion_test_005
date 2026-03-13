import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { BannerScene } from "./scenes/BannerScene";
import { CANVAS, SCENE, type SceneContent } from "./constants";

export const EpsonWideBannerV2Video: React.FC = () => {
  const scenes: SceneContent[] = useMemo((): SceneContent[] => {
    return [
      {
        kind: "brand",
        imageSrc: staticFile("epson/epson主题色.png"),
        kicker: "EPSON",
        title: "EPSON",
        subtitle: "EXCEED YOUR VISION",
      },
      {
        kind: "photo",
        imageSrc: staticFile("epson/20260312-163320.png"),
        kicker: "TEAM",
        title: "ONE TEAM",
        subtitle: "协作 · 专业 · 信任",
      },
      {
        kind: "photo",
        imageSrc: staticFile("epson/20260312-163325.png"),
        kicker: "VALUES",
        title: "TRUST",
        subtitle: "以专业赢得信任",
      },
      {
        kind: "photo",
        imageSrc: staticFile("epson/20260312-163329.png"),
        kicker: "FUTURE",
        title: "TOGETHER",
        subtitle: "面向未来，共同前行",
      },
      {
        kind: "photo",
        imageSrc: staticFile("epson/20260312-163335.png"),
        kicker: "SPIRIT",
        title: "FORWARD",
        subtitle: "一起前行",
      },
    ];
  }, []);

  return (
    <AbsoluteFill style={CANVAS.root}>
      {scenes.map((s, i) => {
        const from = SCENE.starts[i];
        const isFirst = i === 0;
        return (
          <Sequence
            key={`${s.kind}-${i}`}
            from={from}
            durationInFrames={SCENE.duration}
          >
            <BannerScene isFirst={isFirst} from={from} content={s} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
