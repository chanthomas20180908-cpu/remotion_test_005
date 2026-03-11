import accentBars from "./assets/img_0001_97b99e67.gif";
import accentDashed from "./assets/img_0002_1d36845f.gif";
import accentSquare from "./assets/img_0003_09b31eda.png";
import cctvFeature from "./assets/img_0004_d663462d.png";
import universityMeeting from "./assets/img_0005_f2bdac71.png";
import productScreen from "./assets/img_0007_0484ec55.png";
import teamPhoto from "./assets/img_0008_3c26f3bb.png";
import projectProof from "./assets/img_0009_a7fe64a2.png";
import awardPhoto from "./assets/img_0010_897d31dd.png";
import qrCode from "./assets/img_0011_b5d50229.jpg";
import bgmCorporateAmbient from "./assets/audio/bgm_corporate_ambient.wav";
import scene01Voice from "./assets/audio/scene01.wav";
import scene02Voice from "./assets/audio/scene02.wav";
import scene03Voice from "./assets/audio/scene03.wav";
import scene04Voice from "./assets/audio/scene04.wav";
import scene05Voice from "./assets/audio/scene05.wav";
import scene06Voice from "./assets/audio/scene06.wav";
import scene07Voice from "./assets/audio/scene07.wav";
import scene08Voice from "./assets/audio/scene08.wav";

export const VIDEO_META = {
  id: "GuoyanMd001Promo",
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export type SceneBlueprint = {
  id: string;
  title: string;
  estimatedDurationFrames: number;
  narration: string;
  voiceoverScript: string;
  layout: string;
  motion: string;
};

export const STORYBOARD: SceneBlueprint[] = [
  {
    id: "S1",
    title: "品牌开场",
    estimatedDurationFrames: 207,
    narration:
      "情绪：激励 / 语速：中快。以 AI 赋能创作，共赴新征程，点明国研能汇以 AI 重构视频创作的使命。",
    voiceoverScript:
      "以AI赋能创作，共赴新征程。国研能汇，正以新一代智能视频能力，重构内容生产。",
    layout:
      "左侧大标题与价值宣言，右侧产品主视觉与三枚能力标签，底部加入品牌数据速览。",
    motion:
      "标题纵深推近，主视觉卡片抬升入场，信息标签错峰滑入，背景光斑持续流动。",
  },
  {
    id: "S2",
    title: "年度背景与主线",
    estimatedDurationFrames: 312,
    narration:
      "情绪：叙事 / 语速：中速。回顾 2025 年 AIGC 爆发式增长，强调公司围绕用 AI 重构视频创作稳步推进。",
    voiceoverScript:
      "二零二五年，AIGC全面爆发。面向行业变革，国研能汇围绕，用AI重构视频创作，加速形成技术、产品与服务的协同突破。",
    layout: "上方主题标题，下方双栏：左栏年度判断，右栏合作与业务拓展摘要。",
    motion: "标题先行放大聚焦，双栏面板从左右展开，重点句逐条高亮。",
  },
  {
    id: "S3",
    title: "核心业务突破",
    estimatedDurationFrames: 311,
    narration:
      "情绪：专业 / 语速：中快。展示业务版图扩展、效率提升 80%、营收超千万元等关键成果。",
    voiceoverScript:
      "这一年，公司新增AIGC视频创作智能体、数字人和AI智能剪辑等核心业务。用户创作效率提升百分之八十，年度营收突破千万元。",
    layout: "左侧三张核心指标卡，右侧放置平台界面图和合作名单。",
    motion: "指标数字弹性放大，右侧界面从透视角度推近，合作项按节奏依次显现。",
  },
  {
    id: "S4",
    title: "技术创新亮点",
    estimatedDurationFrames: 356,
    narration:
      "情绪：坚定 / 语速：中速。突出 4 项专利、3 项软著、4K 生成提速 300%，以及央视节目亮相。",
    voiceoverScript:
      "技术创新，持续夯实底座。全年新增四项专利、三项软著。十分钟四K视频生成时间，从两小时缩短至三十分钟，效率提升三倍。",
    layout: "左侧技术成果卡组，右侧央视画面与技术解读纵向排布。",
    motion: "成果卡逐层翻起，央视画面柔和推进，数据条在底部扫光。",
  },
  {
    id: "S5",
    title: "标杆项目复盘",
    estimatedDurationFrames: 353,
    narration:
      "情绪：专业 / 语速：中速。复盘北京市 AI+广电传媒 标杆项目，呈现六大模块、92% 识别准确率与显著业务成效。",
    voiceoverScript:
      "在北京市，AI加广电传媒标杆项目中，国研能汇完成六大核心模块闭环交付。内容识别准确率超过百分之九十二，生产效率提升百分之六十。",
    layout: "左侧项目定位与成效指标，右侧上下双图：入选证明与系统界面。",
    motion:
      "项目标题先锁定焦点，右侧双图交错入场，四个成效指标形成节奏式连击。",
  },
  {
    id: "S6",
    title: "社会责任与产学研",
    estimatedDurationFrames: 277,
    narration:
      "情绪：温暖 / 语速：中速。传达公司支持高校专业建设、培养行业后备人才的长期价值。",
    voiceoverScript:
      "我们也坚持，把技术价值延伸到人才培养。通过与高校开展产学研协同，持续为行业输送面向未来的创新力量。",
    layout: "左侧会议照片，右侧责任主张与三条协同成果。",
    motion: "照片缓慢推近，责任关键词从下向上汇聚，文字卡片柔性淡入。",
  },
  {
    id: "S7",
    title: "团队建设与荣誉认可",
    estimatedDurationFrames: 293,
    narration:
      "情绪：昂扬 / 语速：中快。展示 24 人团队结构、研发占比与荣誉奖项，强化人才与口碑双轮驱动。",
    voiceoverScript:
      "一支二十四人的复合型团队，构成持续创新的引擎。研发人员占比超过百分之六十，并赢得多项国家级、市级荣誉认可。",
    layout: "左侧团队合影与组织信息，右侧奖项照片和荣誉摘要。",
    motion: "人物图层轻微漂浮，奖项模块上升揭示，数字标签脉冲高亮。",
  },
  {
    id: "S8",
    title: "未来展望与行动召唤",
    estimatedDurationFrames: 339,
    narration:
      "情绪：激励 / 语速：中慢。面向 2026 年营收、融资与生态建设目标，邀请伙伴共同开启智能内容创作新征程。",
    voiceoverScript:
      "面向二零二六，国研能汇将继续迭代元婴大模型与视界通能力，拓展更多行业场景。期待与更多伙伴携手，开启智能内容创作的新征程。",
    layout: "左侧未来路线图与目标，右侧二维码与品牌收束，底部以使命宣言收尾。",
    motion: "路线图节点顺序点亮，二维码卡片悬浮收束，结尾口号缓慢放大定格。",
  },
];

export const TOTAL_DURATION_IN_FRAMES = STORYBOARD.reduce(
  (sum, scene) => sum + scene.estimatedDurationFrames,
  0,
);

export const BRAND_COLORS = {
  ink: "#081426",
  navy: "#11284f",
  blue: "#1f6fff",
  cyan: "#54c7ff",
  violet: "#7d6bff",
  gold: "#ffbf5a",
  mist: "#edf4ff",
  line: "rgba(31, 111, 255, 0.12)",
  panel: "rgba(255, 255, 255, 0.78)",
  panelStrong: "rgba(255, 255, 255, 0.92)",
  shadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
} as const;

export const MEDIA = {
  accentBars,
  accentDashed,
  accentSquare,
  cctvFeature,
  universityMeeting,
  productScreen,
  teamPhoto,
  projectProof,
  awardPhoto,
  qrCode,
} as const;

export const AUDIO = {
  bgm: bgmCorporateAmbient,
  voiceovers: {
    S1: scene01Voice,
    S2: scene02Voice,
    S3: scene03Voice,
    S4: scene04Voice,
    S5: scene05Voice,
    S6: scene06Voice,
    S7: scene07Voice,
    S8: scene08Voice,
  },
} as const;

export const HERO_METRICS = [
  { value: "千万+", label: "2025 年营收规模" },
  { value: "80%", label: "用户创作效率提升" },
  { value: "300%", label: "4K 生成效率提升" },
];

export const BUSINESS_POINTS = [
  "新增 AIGC 视频创作智能体、数字人、AI 智能剪辑等核心业务板块",
  "服务覆盖全国多个省市，与广西广播电视台、智谱、潞晨科技等头部伙伴深度合作",
  "实现视频理解、剪辑、调色、字幕生成全流程自动化",
];

export const TECH_POINTS = [
  "2025 年新增 4 项专利、3 项软著",
  "10 分钟 4K 视频生成时间由 2 小时缩短至 30 分钟",
  "元婴大模型登上 CCTV2《赢在 AI+》，彰显技术影响力",
];

export const PROJECT_METRICS = [
  { value: "6", label: "大核心模块" },
  { value: "92%+", label: "内容识别准确率" },
  { value: "+60%", label: "内容生产效率提升" },
  { value: "-40%", label: "审核成本降低" },
  { value: "+75%", label: "媒资复用率提高" },
];

export const RESPONSIBILITY_POINTS = [
  "支持北方工业大学人工智能相关专业建设",
  "企业专家担任校外导师，链接实践与教学",
  "推动优秀毕业生参与企业实习与行业培养",
];

export const TEAM_METRICS = [
  { value: "24", label: "团队规模" },
  { value: "60%+", label: "研发人员占比" },
  { value: "30%", label: "硕士及以上占比" },
];

export const HONOR_POINTS = [
  "广播电视和网络视听人工智能应用创新大赛三等奖",
  "创客中国创新创业大赛视觉智能方向二等奖",
  "国家科技型中小企业认证与园区重点文化企业表彰",
];

export const FUTURE_ROADMAP = [
  "持续迭代元婴大模型与 VisionConnect（视界通）能力",
  "推动电商虚拟试穿、影视制作等场景规模化应用",
  "预计 2026 年营收超 3000 万元并推进 A 轮融资",
  "构建技术-场景-生态协同模式，打造全球领先 AI 视听解决方案供应商",
];
