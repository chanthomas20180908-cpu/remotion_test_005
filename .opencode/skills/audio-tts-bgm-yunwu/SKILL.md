---
name: audio-tts-bgm-yunwu
description: 语音与音频资产能力（TTS 配音 + BGM），包含情绪参数、接口选择、本地化与时长精算规则。
metadata:
  tags: tts, bgm, audio, narration, duration
---

# Audio (TTS & BGM)

## Purpose
在 `<Storyboard>` 已确定的前提下，为每个 Scene 生成/准备配音与背景音乐，并确保“真实音频时长 = Scene 时长”。

## When to use
- 阶段二：资产准备与调度（Orchestration）。

## Inputs
- 来自 `<Storyboard>` 的逐 Scene：Voiceover 文本、情绪/语速要求、Scene 时长目标（若已给）
- 可用鉴权环境变量（按你系统配置）：
  - `$YUNWU_API_KEY`（yunwu.ai）

## Core rules（强制）
- 语音必须有情绪参数：情绪类型、强度（1-5）、语速（慢/中/快），关键短语必须强调。
- 音频红线：
  - 必须下载到当前视频目录的 `assets/` 作为本地文件
  - 禁止占位/示例音频
  - 禁止运行时播放远程 URL
  - 项目中只保留最终音频文件（不要把生成脚本长期留在工程里）
- 时长精算：必须获取真实语音时长，反推 `durationInFrames`，保证“语音与 Scene 严格等长”。

## Endpoint reference（作为能力说明，不要在此处泄露 key）
- TTS：
  - `https://yunwu.ai/v1/chat/completions` (gemini-2.5-flash-preview-tts / gemini-2.5-pro-preview-tts)
  - `https://yunwu.ai/ent/v2/audio-tts` (vidu-tts)
  - `https://yunwu.ai/v1/audio/speech` (gpt-4o-mini-tts / tts-1* 系列)
- BGM：
  - `https://yunwu.ai/suno/submit/music` (suno_music)

## Output（阶段二交付物）
输出一个结构化的“音频资产清单”，用于后续工程实现，不要写 Remotion 代码：

<AudioAssets>
  <SceneAudio sceneId="S01">
    Narration:
      file: assets/audio/S01_narration.wav
      emotion: professional
      intensity: 4
      speed: medium
      expectedDurationSec: ...
      measuredDurationSec: ...
    BGM:
      file: assets/audio/bgm_main.mp3
      mode: loop|trim
      mix: narration_over_bgm
  </SceneAudio>
  ...
</AudioAssets>

## Quality gates
- 所有音频路径必须为本地相对路径（可复制目录后仍可运行）
- measuredDurationSec 不得空缺
- narration 与 Scene 时长必须可对齐（不对齐必须重生成或重写旁白）
