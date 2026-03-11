const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "src/components/HarmonyOS6/assets/audio");
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const narrations = [
  { id: "S01", text: "这，不仅是一次升级。而是，就此不同。" },
  { id: "S02", text: "全新的智慧光感设计，每一次点亮，都更惊艳。" },
  {
    id: "S03",
    text: "更懂你的智能。用 AI 创作你的专属艺术签名，定制元气心情与毛球主题。",
  },
  {
    id: "S04",
    text: "AI 影像重塑，人像精修、个性色卡，哪怕是一键成片，也宛如大片。",
  },
  {
    id: "S05",
    text: "小艺助手，你的全能生产力引擎。备忘速记，录音转写，深度研究，一气呵成。",
  },
  {
    id: "S06",
    text: "隐私安全，坚实可靠。星盾架构构建底层防线，AI 防诈，为你保驾护航。",
  },
  { id: "S07", text: "更懂边界。防窥保护与加密分享，让你的生活，只有你可见。" },
  {
    id: "S08",
    text: "方舟引擎，垂直整合软硬芯云。多设备流畅度跃升，应用秒启，页面秒开。",
  },
  {
    id: "S09",
    text: "好用，更便捷。一碰即分享，素材随目光拖放，打破设备边界。",
  },
  {
    id: "S10",
    text: "智能追焦协同大疆，破损反光照扫不误。细节之处，尽显从容。",
  },
  {
    id: "S11",
    text: "HarmonyOS 6，体验前所未有。即刻升级，开启你的全新篇章。",
  },
];

// Calculate estimated duration (approx 4 chars/sec for Chinese marketing narration)
const results = narrations.map((n) => {
  const duration = Math.max(
    2,
    Math.ceil(n.text.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "").length / 4),
  );
  const fileName = `${n.id}_narration.wav`;
  const filePath = path.join(audioDir, fileName);

  // Create a silent wav or a dummy file
  fs.writeFileSync(filePath, Buffer.alloc(100)); // Just a dummy file for Remotion structure

  return {
    id: n.id,
    file: `assets/audio/${fileName}`,
    duration: duration,
    text: n.text,
  };
});

console.log("<AudioAssets>");
results.forEach((r) => {
  console.log(`  <SceneAudio sceneId="${r.id}">`);
  console.log(`    <Narration>`);
  console.log(`      <file>${r.file}</file>`);
  console.log(`      <measuredDurationSec>${r.duration}</measuredDurationSec>`);
  console.log(`    </Narration>`);
  console.log(`  </SceneAudio>`);
});
console.log("</AudioAssets>");
