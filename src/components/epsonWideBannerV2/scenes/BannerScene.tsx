import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BannerLayout } from "../ui/BannerLayout";
import { GeometricWipeMask } from "../ui/GeometricWipeMask";
import { AmbientLayer } from "../ui/AmbientLayer";
import { SCENE, type SceneContent } from "../constants";
import { clampToSceneFrame } from "../utils/clampToSceneFrame";

export type BannerSceneProps = {
  isFirst: boolean;
  from: number;
  content: SceneContent;
};

export const BannerScene: React.FC<BannerSceneProps> = ({
  isFirst,
  from,
  content,
}) => {
  const frame = useCurrentFrame();
  const local = clampToSceneFrame(frame - from, SCENE.duration);
  const hasWipe = !isFirst;

  return (
    <AbsoluteFill>
      {hasWipe ? (
        <GeometricWipeMask localFrame={local}>
          <AmbientLayer localFrame={local} imageSrc={content.imageSrc} />
          <BannerLayout
            localFrame={local}
            content={content}
            isFirst={isFirst}
          />
        </GeometricWipeMask>
      ) : (
        <>
          <AmbientLayer localFrame={local} imageSrc={content.imageSrc} />
          <BannerLayout
            localFrame={local}
            content={content}
            isFirst={isFirst}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
