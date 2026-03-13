import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { MVP_SCENE_DURATIONS, MVP_TRANSITION } from "./constants";
import type { SceneSpec } from "./types";
import { validateScenes } from "./validate";
import { renderTemplate } from "./templates/renderTemplate";

// MVP demo：固定 6 镜头，内容只是“填空”
// 后续让 LLM 输出同结构 SceneSpec[] 即可复用。

// 复用你之前已下载的 HarmonyOS6 页面素材（如果缺失，ImageSlot 会自动占位）
import s02 from "../components/harmonyos6SixShots/assets/images/S02_light_sense.jpg";
import s03 from "../components/harmonyos6SixShots/assets/images/S03_office_full.jpg";
import s05 from "../components/harmonyos6SixShots/assets/images/S05_fluent_bg.jpg";
import s06 from "../components/harmonyos6SixShots/assets/images/S06_beta_plan_full.jpg";

const rawScenes: SceneSpec[] = [
  {
    template: "hero",
    theme: "light",
    tag: "HarmonyOS 6",
    title: "HarmonyOS 6\n就此不同",
    subtitle: "新视觉｜更智能｜更便捷",
  },
  {
    template: "split",
    theme: "light",
    tag: "新视觉",
    title: "看它\n满屏都是戏",
    subtitle: "智慧光感，像流光一样自然。",
    bullets: ["界面更灵动", "表达更有趣", "细节更温暖"],
    imageSrc: s02,
  },
  {
    template: "split",
    theme: "light",
    tag: "更智能",
    title: "一句话\n就搞定",
    subtitle: "有事呼叫小艺：拆解任务，后台执行。",
    bullets: ["少切换", "更自动", "更高效"],
    imageSrc: s03,
  },
  {
    template: "dark",
    theme: "dark",
    tag: "隐私安全",
    title: "由你掌控",
    subtitle: "访问只取你所选，用得更安心。",
    bullets: ["防诈提醒", "防窥保护", "加密分享"],
    imageSrc: undefined,
  },
  {
    template: "metrics",
    theme: "light",
    tag: "丝滑流畅",
    title: "快一点\n更稳一点",
    subtitle: "核心体验的升级，能被你感知。",
    metrics: [
      { label: "多设备流畅度", value: "15%", accent: "cyan" },
      { label: "对比更早版本", value: "40%", accent: "teal" },
    ],
    imageSrc: s05,
  },
  {
    template: "cta",
    theme: "light",
    tag: "HarmonyOS 6",
    title: "6 到了\n就等你了",
    subtitle: "MVP 模板生成：稳定、可控、可复用。",
    imageSrc: s06,
  },
];

export const Video: React.FC = () => {
  const scenes = validateScenes(rawScenes);

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {scenes.map((scene, i) => {
          const duration =
            MVP_SCENE_DURATIONS[i] ??
            MVP_SCENE_DURATIONS[MVP_SCENE_DURATIONS.length - 1];
          const key = `${i}-${scene.template}-${scene.title}`;
          return (
            <React.Fragment key={key}>
              <TransitionSeries.Sequence durationInFrames={duration}>
                {renderTemplate(scene)}
              </TransitionSeries.Sequence>
              {i < scenes.length - 1 ? (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: MVP_TRANSITION })}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
