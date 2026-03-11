---
name: visual-assets
description: 视觉资产与图片/图标能力：分辨率红线、图标优先级、素材匹配与本地化规则。
metadata:
  tags: images, icons, assets, quality, resolution
---

# Visual Assets（视觉资产）

## Purpose
把 `<Storyboard>` 里的 VisualAssets 需求，转化为可落地的素材清单与筛选规则，确保画面“高清、匹配、可工程化引用”。

## When to use
- 阶段二：资产准备与调度（Orchestration）。

## Core rules（强制）
- 分辨率最低标准：
  - 主视觉：宽或高 ≥ 1920px
  - 局部素材：任一边 ≥ 1280px
- 严禁：缩略图、带明显压缩参数的 URL、拉伸小图当主视觉。
- 图标优先级：项目已有库 > 主流图标库（Lucide 等）> 搜索 >（最后兜底）emoji。
- 图文匹配：素材必须与当前 Scene 文案/旁白语义一致，禁止“随机配图”。
- 本地化：所有外部资源必须落在当前视频目录 `assets/`，禁止运行时远程 URL。

## Output（阶段二交付物）
输出“素材清单 + 校验结果”，不要写 Remotion 代码：

<VisualAssets>
  <SceneAssets sceneId="S01">
    - {file: assets/images/S01_hero.png, type: image, resolution: 2560x1440, status: ok}
    - {file: assets/icons/arrow-right.svg, type: icon, status: ok}
  </SceneAssets>
  ...
</VisualAssets>

## Quality gates
- 每个 Scene 至少有 1 个明确的主视觉或明确的图标/图形方案
- 所有素材都能在本地路径找到
- 分辨率与语义匹配检查通过（不通过必须替换素材或调整分镜）
