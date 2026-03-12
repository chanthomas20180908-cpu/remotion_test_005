import cctvFeature from "./assets/img_0004_d663462d.png";
import universityMeeting from "./assets/img_0005_f2bdac71.png";
import ambientFlow from "./assets/img_0006_b1f729bb.gif";
import productScreen from "./assets/img_0007_0484ec55.png";
import teamPhoto from "./assets/img_0008_3c26f3bb.png";
import projectProof from "./assets/img_0009_a7fe64a2.png";
import awardPhoto from "./assets/img_0010_897d31dd.png";
import qrCode from "./assets/img_0011_b5d50229.jpg";
import neuralFlow from "./assets/img_0002_1d36845f.gif";

export const VIDEO_META = {
  id: "GuoyanMd001DirectorCut",
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const BRAND = {
  bg: "#f4f7fc",
  surface: "rgba(255, 255, 255, 0.78)",
  surfaceStrong: "rgba(255, 255, 255, 0.94)",
  text: "#08101d",
  muted: "#5b687e",
  blue: "#2864ff",
  cyan: "#7ad8ff",
  violet: "#7f6dff",
  gold: "#ffbf5f",
  line: "rgba(8, 16, 29, 0.08)",
  shadow: "0 42px 140px rgba(40, 100, 255, 0.16)",
} as const;

export const SCENE_DURATIONS = [120, 120, 135, 150, 135, 150] as const;

export const TOTAL_DURATION_IN_FRAMES = SCENE_DURATIONS.reduce(
  (sum, duration) => sum + duration,
  0,
);

export const MEDIA = {
  cctvFeature,
  universityMeeting,
  ambientFlow,
  productScreen,
  teamPhoto,
  projectProof,
  awardPhoto,
  qrCode,
  neuralFlow,
} as const;

export const HERO_LINES = ["以 AI", "重写影像生产"] as const;

export const IMPACT_METRICS = [
  { value: "80%", label: "创作效率提升" },
  { value: "300%", label: "4K 生成提速" },
  { value: "1000万+", label: "2025 营收" },
] as const;

export const CAPABILITY_STACK = [
  "AIGC 视频创作智能体",
  "数字人内容生成",
  "AI 智能剪辑闭环",
  "多场景适配与超高清生成",
] as const;

export const PROJECT_RESULTS = [
  { value: "+60%", label: "内容生产效率" },
  { value: "-40%", label: "审核成本" },
  { value: "+75%", label: "媒资复用率" },
  { value: "92%+", label: "内容识别准确率" },
] as const;

export const TEAM_METRICS = [
  { value: "24", label: "团队规模" },
  { value: "60%+", label: "研发占比" },
  { value: "30%", label: "硕士及以上" },
] as const;

export const FUTURE_LINES = [
  "元婴大模型持续迭代",
  "VisionConnect 能力扩张",
  "2026 目标营收 3000 万+",
  "打造全球领先 AI 视听方案供应商",
] as const;
