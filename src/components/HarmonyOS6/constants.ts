import aiMood from "./assets/images/ai_mood.png";
import aiSign from "./assets/images/ai_sign.png";
import apps from "./assets/images/apps.png";
import fluentCompare from "./assets/images/fluent_compare.png";
import guardChildren from "./assets/images/guard_children.jpg";
import guardElder from "./assets/images/guard_elder.jpg";
import safeCover from "./assets/images/safe_cover.png";

export const VIDEO_META = {
  id: "harmonyos6-cinematic-launch",
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export type SceneLayout =
  | "hero"
  | "spotlight"
  | "triptych"
  | "command"
  | "grid"
  | "security"
  | "split"
  | "orbit"
  | "metrics"
  | "connectivity"
  | "closing";

export type HarmonyScene = {
  id: string;
  durationInFrames: number;
  layout: SceneLayout;
  kicker: string;
  title: string;
  description: string;
  accent: string;
  theme: "light" | "dark";
  labels?: string[];
  metrics?: Array<{ label: string; value: string }>;
  images?: string[];
};

export const HARMONY_SCENES: HarmonyScene[] = [
  {
    id: "S01",
    durationInFrames: 120,
    layout: "hero",
    kicker: "HarmonyOS 6",
    title: "就此不同",
    description: "从视觉、智能、隐私到多设备协同，一次完整的旗舰级系统焕新。",
    accent: "#6f7cff",
    theme: "light",
    labels: ["新视觉", "更智能", "更便捷", "更安全"],
  },
  {
    id: "S02",
    durationInFrames: 120,
    layout: "spotlight",
    kicker: "新视觉",
    title: "看它，满屏都是戏",
    description: "智慧光感像流光一样穿过界面，让每次亮屏都更灵动、更自然。",
    accent: "#6f7cff",
    theme: "light",
    labels: ["智慧光感", "温暖流动", "界面呼吸感"],
    images: [aiMood, aiSign],
  },
  {
    id: "S03",
    durationInFrames: 150,
    layout: "triptych",
    kicker: "AIGC 个性表达",
    title: "把风格写进系统",
    description:
      "专属签名、合体字、情绪主题和趣味毛球主题，让个性成为系统级能力。",
    accent: "#ff6f91",
    theme: "light",
    labels: ["艺术签名", "合体字", "元气心情"],
    images: [aiSign, aiMood, apps],
  },
  {
    id: "S07",
    durationInFrames: 120,
    layout: "security",
    kicker: "隐私安全",
    title: "由你掌控",
    description: "星盾安全架构升级，把安全从权限提醒推进到底层内核和主动防护。",
    accent: "#5ec8ff",
    theme: "dark",
    labels: ["星盾安全架构", "主动防护", "可信访问"],
    images: [safeCover],
  },
  {
    id: "S10",
    durationInFrames: 120,
    layout: "metrics",
    kicker: "丝滑流畅，玩得真 6",
    title: "多设备流畅度提升 15%",
    description: "方舟引擎垂直整合软硬芯云，让流畅度、性能与续航同时向前。",
    accent: "#10a7ff",
    theme: "light",
    metrics: [
      { label: "HarmonyOS 6 vs 5", value: "+15%" },
      { label: "HarmonyOS 6 vs 4", value: "+40%" },
      { label: "续航提升", value: "35-51 分钟" },
    ],
    images: [fluentCompare],
  },
  {
    id: "S13",
    durationInFrames: 150,
    layout: "closing",
    kicker: "科技有温度",
    title: "6 到了，就等你了",
    description:
      "从儿童健康用机到老人远程守护，HarmonyOS 6 让科技不仅更强，也更会照顾人。",
    accent: "#ff8a6b",
    theme: "light",
    labels: ["儿童健康用机", "老人远程守护", "鸿蒙应用越用越爱用"],
    images: [guardChildren, guardElder],
  },
];

export const TOTAL_DURATION_IN_FRAMES = HARMONY_SCENES.reduce(
  (sum, scene) => sum + scene.durationInFrames,
  0,
);
