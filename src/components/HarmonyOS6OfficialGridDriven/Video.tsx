import type React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { CinematicTypographicSplit } from "./CinematicTypographicSplit";
import type { TypographicSplitProps } from "./schema";

import s01 from "./assets/images/S01_intro_poster.jpg";
import s02 from "./assets/images/S02_ai_office.jpg";
import s03 from "./assets/images/S03_safe_hpic.png";
import s04 from "./assets/images/S04_fluent_fast.jpg";
import s05 from "./assets/images/S05_guard_plan.jpg";

export type HarmonyOS6OfficialGridDrivenScene = TypographicSplitProps;

const OVERLAP_FRAMES = 20;
const FADE_FRAMES = 12;

const THEME: TypographicSplitProps["theme"] = {
  // 参考官网大面积留白的观感：低饱和暖灰，承载“瑞士网格+大标题”的秩序感
  backgroundColor: "#E8E6E1",
  lineColor: "rgba(0,0,0,0.12)",
  textColor: "#111111",
};

// 数据来源：consumer.huawei.com/cn/harmonyos-6/
// 说明：文案严格遵守模板容量（每行尽量短），避免超长句破坏网格秩序。
export const HARMONY_OS6_OFFICIAL_GRID_DRIVEN_SCENES: HarmonyOS6OfficialGridDrivenScene[] =
  [
    {
      theme: THEME,
      leftSection: {
        topLabel: "HARMONYOS 6",
        headlineLines: ["就此", "不同"],
        description: "新视觉｜更智能｜更便捷",
      },
      rightSection: {
        imageSrc: s01,
        topRightLabel: "01/05",
      },
      durationInFrames: 120,
    },
    {
      theme: THEME,
      leftSection: {
        topLabel: "SMART",
        headlineLines: ["满屏", "都是", "戏"],
        description: "一句话就搞定｜小艺更全能",
      },
      rightSection: {
        imageSrc: s02,
        topRightLabel: "02/05",
      },
      durationInFrames: 120,
    },
    {
      theme: THEME,
      leftSection: {
        topLabel: "PRIVACY",
        headlineLines: ["云上", "专属", "空间"],
        description: "HPIC：上云处理也安心",
      },
      rightSection: {
        imageSrc: s03,
        topRightLabel: "03/05",
      },
      durationInFrames: 120,
    },
    {
      theme: THEME,
      leftSection: {
        topLabel: "FLUENCY",
        headlineLines: ["秒启", "秒开", "秒载"],
        description: "应用秒启｜页面秒开｜内容秒加载",
      },
      rightSection: {
        imageSrc: s04,
        topRightLabel: "04/05",
      },
      durationInFrames: 120,
    },
    {
      theme: THEME,
      leftSection: {
        topLabel: "BETA",
        headlineLines: ["首批", "公测", "开启"],
        description: "2025.10.22 起｜升级机型详见官网",
      },
      rightSection: {
        imageSrc: s05,
        topRightLabel: "05/05",
      },
      durationInFrames: 120,
    },
  ];

const getSceneStartFrames = (
  scenes: HarmonyOS6OfficialGridDrivenScene[],
): number[] => {
  const starts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < scenes.length; i++) {
    const start = i === 0 ? 0 : cursor - OVERLAP_FRAMES;
    starts.push(start);
    cursor = start + scenes[i].durationInFrames;
  }
  return starts;
};

export const getHarmonyOS6OfficialGridDrivenTotalDuration = (
  scenes: HarmonyOS6OfficialGridDrivenScene[],
): number => {
  if (scenes.length === 0) return 1;
  const starts = getSceneStartFrames(scenes);
  const lastIndex = scenes.length - 1;
  return starts[lastIndex] + scenes[lastIndex].durationInFrames;
};

export const HarmonyOS6OfficialGridDrivenVideo: React.FC<{
  scenes?: HarmonyOS6OfficialGridDrivenScene[];
}> = ({ scenes = HARMONY_OS6_OFFICIAL_GRID_DRIVEN_SCENES }) => {
  const frame = useCurrentFrame();
  const starts = getSceneStartFrames(scenes);

  return (
    <AbsoluteFill
      className="remotion-reset"
      style={{ backgroundColor: "#000000" }}
    >
      {scenes.map((scene, index) => {
        const startFrame = starts[index];
        const duration = scene.durationInFrames;
        const localFrame = frame - startFrame;

        const fadeWindow = Math.min(FADE_FRAMES, OVERLAP_FRAMES);
        const fadeIn = interpolate(localFrame, [0, fadeWindow], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(
          localFrame,
          [duration - fadeWindow, duration],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        // 顶层统筹级微弱转场：仅用于 Scene 之间的连贯性，模板内部动效保持不变。
        const opacity = Math.min(fadeIn, fadeOut);

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={duration}
            name={`HarmonyOS6OfficialGridDriven_S${index + 1}`}
          >
            <AbsoluteFill style={{ opacity }}>
              <CinematicTypographicSplit {...scene} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
