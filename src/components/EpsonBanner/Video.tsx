import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Scene } from "./scenes/Scene";

import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";

const images = [image1, image2, image3, image4];

// --- 从模板中提取的高级缓动曲线 ---
const expoInOut = Easing.bezier(0.87, 0, 0.13, 1);
const power4Out = Easing.bezier(0.16, 1, 0.3, 1);

// --- 几何转场组件 ---
const GeometricTransition: React.FC<{ direction: "left" | "right" }> = ({
  direction,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const progress = interpolate(frame, [0, 30], [0, 1], {
    easing: power4Out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = interpolate(
    progress,
    [0, 1],
    direction === "left" ? [-width, width] : [width, -width],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgb(0, 51, 153)", // Epson 品牌蓝色
        transform: `translateX(${x}px)`,
        zIndex: 10,
      }}
    />
  );
};

export const EpsonBannerVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // --- 镜头动作：开场容器展开 (模拟 expo.inOut) ---
  const expandProgress = interpolate(frame, [0, 45], [0, 1], {
    easing: expoInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerWidth = interpolate(
    expandProgress,
    [0, 1],
    [width * 0.4, width],
  );
  const containerHeight = interpolate(
    expandProgress,
    [0, 1],
    [height * 0.8, height],
  );

  // --- 镜头视差：内部图片逆向收缩 (Parallax) ---
  const internalScale = interpolate(expandProgress, [0, 1], [1.3, 1]);

  // --- 时间轴定义 ---
  const SCENE_DURATION = 90;
  const TRANSITION_DURATION = 30;

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      {/* 场景 1: 带有视差效果的展开 */}
      <Sequence durationInFrames={SCENE_DURATION}>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              width: containerWidth,
              height: containerHeight,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={images[0]}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${internalScale})`,
                willChange: "transform",
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* --- 后续场景与转场 --- */}
      {[1, 2, 3].map((index) => {
        const sceneStart =
          SCENE_DURATION + (index - 1) * (SCENE_DURATION + TRANSITION_DURATION);
        const transitionStart = sceneStart - TRANSITION_DURATION;

        return (
          <React.Fragment key={index}>
            <Sequence
              from={transitionStart}
              durationInFrames={TRANSITION_DURATION}
            >
              <GeometricTransition
                direction={index % 2 === 0 ? "right" : "left"}
              />
            </Sequence>
            <Sequence from={sceneStart} durationInFrames={SCENE_DURATION}>
              <Scene
                imageSrc={images[index]}
                durationInFrames={SCENE_DURATION}
              />
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
