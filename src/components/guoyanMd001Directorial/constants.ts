import accentBars from "./assets/img_0001_97b99e67.gif";
import accentDashed from "./assets/img_0002_1d36845f.gif";
import accentSquare from "./assets/img_0003_09b31eda.png";
import cctvFeature from "./assets/img_0004_d663462d.png";
import universityMeeting from "./assets/img_0005_f2bdac71.png";
import ambientFlow from "./assets/img_0006_b1f729bb.gif";
import productScreen from "./assets/img_0007_0484ec55.png";
import teamPhoto from "./assets/img_0008_3c26f3bb.png";
import projectProof from "./assets/img_0009_a7fe64a2.png";
import awardPhoto from "./assets/img_0010_897d31dd.png";
import qrCode from "./assets/img_0011_b5d50229.jpg";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION_DURATION = 15;

export const COLORS = {
  ink: "#07111f",
  inkSoft: "#0e1d33",
  paper: "#f3f6fb",
  paperWarm: "#eef2f7",
  line: "#c8d6ea",
  accent: "#2d6bff",
  accentBright: "#7fd0ff",
  accentSoft: "#d8ebff",
  gold: "#ffcc73",
  emerald: "#34d399",
  rose: "#ff7a9e",
  text: "#10233d",
  textSoft: "#59718f",
  white: "#ffffff",
} as const;

export const SCENES = [
  { id: "S01", duration: 120, from: 0 },
  { id: "S02", duration: 150, from: 105 },
  { id: "S03", duration: 180, from: 240 },
  { id: "S04", duration: 165, from: 405 },
  { id: "S05", duration: 210, from: 555 },
  { id: "S06", duration: 165, from: 750 },
  { id: "S07", duration: 150, from: 900 },
] as const;

export const TOTAL_DURATION = 1050;

export const ASSETS = {
  accentBars,
  accentDashed,
  accentSquare,
  cctvFeature,
  universityMeeting,
  ambientFlow,
  productScreen,
  teamPhoto,
  projectProof,
  awardPhoto,
  qrCode,
} as const;
