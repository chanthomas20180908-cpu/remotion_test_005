import cctvFeature from "./assets/img_0004_d663462d.png";
import universityMeeting from "./assets/img_0005_f2bdac71.png";
import productScreen from "./assets/img_0007_0484ec55.png";
import teamPhoto from "./assets/img_0008_3c26f3bb.png";
import projectProof from "./assets/img_0009_a7fe64a2.png";
import awardPhoto from "./assets/img_0010_897d31dd.png";
import qrCode from "./assets/img_0011_b5d50229.jpg";

export const VIDEO_META = {
  id: "GuoyanMd001SilentCinematic",
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const BRAND = {
  bg: "#f7f9fc",
  surface: "rgba(255, 255, 255, 0.82)",
  surfaceStrong: "rgba(255, 255, 255, 0.94)",
  text: "#0f172a",
  muted: "#475569",
  blue: "#2f6bff",
  cyan: "#63d3ff",
  gold: "#f6b94f",
  line: "rgba(15, 23, 42, 0.08)",
  shadow: "0 38px 120px rgba(47, 107, 255, 0.14)",
} as const;

export const SCENE_DURATIONS = [150, 150, 150, 180, 150, 150, 210] as const;

export const TOTAL_DURATION_IN_FRAMES = SCENE_DURATIONS.reduce(
  (sum, duration) => sum + duration,
  0,
);

export const MEDIA = {
  cctvFeature,
  universityMeeting,
  productScreen,
  teamPhoto,
  projectProof,
  awardPhoto,
  qrCode,
} as const;

export const HERO_METRICS = [
  { value: "80%", label: "创作效率提升" },
  { value: "300%", label: "4K 生成效率提升" },
  { value: "1000万+", label: "2025 年营收" },
];

export const CAPABILITY_ITEMS = [
  "AIGC 视频创作智能体",
  "数字人内容生产",
  "AI 智能剪辑闭环",
  "超高清画质生成",
];

export const PROJECT_METRICS = [
  { value: "6", label: "核心模块闭环" },
  { value: "92%+", label: "内容识别准确率" },
  { value: "+60%", label: "生产效率提升" },
  { value: "-40%", label: "审核成本降低" },
];

export const TEAM_METRICS = [
  { value: "24", label: "团队规模" },
  { value: "60%+", label: "研发占比" },
  { value: "30%", label: "硕士及以上" },
];

export const FUTURE_LINES = [
  "迭代元婴大模型与 VisionConnect 能力",
  "推进电商与影视场景规模化应用",
  "预计 2026 年营收超 3000 万元",
  "打造全球领先 AI 视听解决方案供应商",
];
