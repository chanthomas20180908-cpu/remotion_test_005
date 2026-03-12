import cctvFeature from "./assets/img_0004_d663462d.png";
import universityMeeting from "./assets/img_0005_f2bdac71.png";
import productScreen from "./assets/img_0007_0484ec55.png";
import teamPhoto from "./assets/img_0008_3c26f3bb.png";
import projectProof from "./assets/img_0009_a7fe64a2.png";
import awardPhoto from "./assets/img_0010_897d31dd.png";
import qrCode from "./assets/img_0011_b5d50229.jpg";

export const VIDEO_META = {
  id: "GuoyanMd001AELaunch",
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const BRAND = {
  bg: "#f4f7fb",
  panel: "rgba(255, 255, 255, 0.72)",
  panelStrong: "rgba(255, 255, 255, 0.9)",
  text: "#09111f",
  muted: "#4a5872",
  blue: "#2f6bff",
  cyan: "#71d7ff",
  violet: "#7b61ff",
  gold: "#f4b44f",
  line: "rgba(9, 17, 31, 0.08)",
  shadow: "0 32px 120px rgba(47, 107, 255, 0.16)",
} as const;

export const SCENE_DURATIONS = [120, 135, 120, 150, 135, 150] as const;

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

export const HERO_LINES = ["以 AI", "赋能创作"] as const;

export const KEY_METRICS = [
  { value: "80%", label: "创作效率提升" },
  { value: "300%", label: "4K 生成提速" },
  { value: "1000万+", label: "2025 年营收" },
] as const;

export const CAPABILITIES = [
  "AIGC 智能体",
  "数字人生产",
  "AI 智能剪辑",
  "超高清生成",
] as const;

export const PROJECT_METRICS = [
  "+60% 生产效率",
  "-40% 审核成本",
  "+75% 媒资复用",
] as const;

export const FUTURE_LINES = [
  "元婴大模型持续迭代",
  "VisionConnect 能力扩展",
  "2026 目标营收 3000 万+",
] as const;
