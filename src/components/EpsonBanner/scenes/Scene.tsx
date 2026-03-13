import React from "react";
import { Img, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

interface SceneProps {
  imageSrc: string;
  durationInFrames: number;
}

// 该组件负责展示单个场景的图片，并应用 'Ken Burns' 缓慢推镜效果
export const Scene: React.FC<SceneProps> = ({ imageSrc, durationInFrames }) => {
  const frame = useCurrentFrame();

  // 在整个场景持续时间内，画面从 1.0 缓慢放大到 1.05
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={imageSrc}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      />
    </AbsoluteFill>
  );
};
