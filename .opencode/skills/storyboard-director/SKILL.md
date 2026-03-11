---
name: storyboard-director
description: 将输入材料转化为可执行的结构化 <Storyboard> 蓝图（先蓝图，后资产，最后写代码）。
metadata:
  tags: storyboard, directing, script, scenes, planning
---

# Storyboard Director（分镜结构化导演）

## Purpose
把“输入材料（网站/文档/要点/产品信息）”转化为全片唯一蓝图 `<Storyboard>`，用于后续资产准备与 Remotion 工程实现。

## When to use
- 任何“制作视频/生成 Remotion 视频”的任务开始时（阶段一）。

## When NOT to use
- 仅做代码修复/已有 Scene 微调（且用户明确不需要重做分镜）。

## Inputs（最少需要的信息）
- 主题/产品是什么
- 目标受众是谁
- 视频目标（介绍/带货/科普/内训/投放）
- 时长（或目标 Scene 数量范围）
- 画幅（16:9 / 9:16 / 1:1）
- 用户提供的材料（文本/链接/要点/截图说明）

信息缺失时：必须先提问补齐（最多 3 个关键问题），再输出蓝图。

## Core rules（强制）
- 先输出 `<Storyboard>`，禁止直接写 Remotion 代码。
- 视听分离：
  - 旁白可以长；屏幕文案必须极短、可大字号展示。
- 构图多样：相邻场景构图不得重复（禁止全片 PPT 双栏模板）。
- 素材指向明确：每个 Scene 的“视觉素材”要可落地（具体到类型/内容/来源优先级），禁止“随便找一张”。

## Output format（必须严格遵守）
输出必须是一个 `<Storyboard>` 块，不要夹杂解释文字。

<Storyboard>
  <Spec>
    Audience: ...
    Goal: ...
    Duration: ... (sec)
    AspectRatio: 16:9 | 9:16 | 1:1
    Tone: fast | calm | cinematic | professional | warm
    Language: zh-CN | en | ...
  </Spec>

  <Scenes>
    <Scene id="S01">
      Mission: 开场Hook | 问题抛出 | 数据证明 | 案例展示 | 方案讲解 | 对比 | 收尾CTA
      Voiceover: ...（可包含情绪与语速标记）
      OnScreenText: ["关键词/短句", "核心数据"]  # 3-5 条以内，越短越好
      Composition: 构图描述（如：中心超大字 / 满屏图+悬浮框 / 非对称拼贴 / 动态列表 ...）
      VisualAssets: [
        {type: "image|icon|screenshot|chart|video", subject: "具体内容", source: "用户素材优先/需外部搜索", must_have: true}
      ]
      Transition: cut | fade | slide | zoom | match-cut ...
      Notes: 可实现性提示（例如：需要测量文字宽度/需要 Sequence 交错等）
    </Scene>
    ...
  </Scenes>

  <Validation>
    TotalScenes: N
    AdjacentLayoutRepeat: pass|fail（若 fail 必须改）
    A/VSeparation: pass|fail
    AssetSpecificity: pass|fail
  </Validation>
</Storyboard>

## Quality gates（自检）
- Scene 数量与内容体量匹配（默认不少于 6）
- 每个 Scene 只有 1 个核心信息点
- 屏幕文案可大字号，单屏可快速读完
- 相邻构图不重复
- 每个 Scene 的素材需求明确且可获得
