---
name: motion-animation-redlines
description: 动画与特效实现红线：元素级交错、实现优先级、禁止项（如 CSS keyframes）。
metadata:
  tags: animation, motion, remotion, sequencing
---

# Motion & Animation Redlines（动效红线）

## Purpose
确保每个 Scene 的动画是“视频原生”的元素级节奏，而不是网页/PPT 式整体淡入淡出。

## When to use
- 阶段三：工程代码执行（Execution）时，设计/实现每个 Scene 的入场、强调、转场。

## Core rules（强制）
- 元素级交错动画：
  - 严禁只对整个 Scene 容器做单一 fade-in/slide-up
  - 必须对子元素做 stagger（背景→标题→图片→数据/列表 逐个）
- 实现手段优先级：
  1) 复用项目现有 skills/组件
  2) Remotion 官方：`Sequence`, `spring`, `interpolate`, `delayRender`/`continueRender`（若需要）
  3) 纯数学动画（少量）
- 禁止项：CSS `@keyframes`、show/hide hack 代替时间轴、靠 frame if 切场景。

## Output
这是约束性能力单元，不单独产出文件；其要求必须体现在 Remotion 代码的时间轴结构与子元素动画里。

## Quality gates
- 每个 Scene 至少包含 2 个独立动画层次（例如：标题+图像/数据分别有动画）
- 动画不被切场景截断
- 时间轴结构清晰（每个 Scene 独立 `<Sequence from durationInFrames>`）
