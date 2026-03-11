# 🎬 Good Video - Remotion 营销视频制作平台

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

一个专业的 Remotion 视频制作系统，用于生成**电影级商业广告**和营销视频。

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动预览

```bash
npm run dev
```

在 Remotion Studio 中选择要预览的 Composition

### 渲染视频

```bash
npm run build
```

### 升级 Remotion

```bash
npm run upgrade
```

## 📁 项目结构

### 主项目布局

```
src/
├── Root.tsx                    # Remotion主入口（所有Compositions注册）
├── index.ts                    # CLI入口
├── index.css                   # 全局样式
│
└── components/                 # 5个视频组件
    ├── OhYesAIVideo/          # 【视频1】Oh Yes AI Video (90秒)
    ├── HuaweiMate80Promo/     # 【视频2】华为Mate 80宣传片 (30秒)
    ├── RemotionIntroVideo/    # 【视频3】Remotion介绍视频 (30秒)
    ├── HuaweiNova15UltraPromo/# 【视频4】华为Nova 15宣传片 (40秒)
    └── TailwindSQLPromo/      # 【视频5】TailwindSQL宣传片 (60秒)
```

### 单个视频的标准结构

每个视频都遵循以下结构（以 `OhYesAIVideo` 为例）：

```
OhYesAIVideo/
├── README.md                    # 项目说明文档
├── index.tsx                    # 主入口 + 时序配置
│
├── scenes/                      # 镜头库（每个镜头一个文件）
│   ├── HeroSection.tsx
│   ├── ProductShowcase.tsx
│   ├── FeaturesGrid.tsx
│   ├── IndustryShowcase.tsx
│   ├── TechStack.tsx
│   ├── AdvancedTransition.tsx
│   └── CallToAction.tsx
│
├── components/                  # 可复用UI组件（无动画）
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ...
│
├── hooks/                       # 自定义动画Hook
│   ├── useAnimation.ts
│   └── ...
│
├── assets/                      # 静态资源
│   ├── images/
│   ├── fonts/
│   └── videos/
│
├── styles/                      # 样式常量
│   ├── colors.ts
│   ├── typography.ts
│   └── theme.ts
│
├── constants.ts                 # 全局配置（颜色、时序、尺寸）
├── types.ts                     # TypeScript类型定义
└── config.ts                    # 视频全局配置
```

## 📋 文件职责分工

### 1. `index.tsx` - 主入口

- 只负责**场景编排**和**时序配置**
- 使用 `<Sequence>` 或 `<Series>` 组织镜头
- 定义 `TIMINGS` 常量对象

```typescript
export const OhYesAIVideo: React.FC = () => {
  return (
    <div>
      <Sequence from={0} durationInFrames={350}>
        <HeroSection />
      </Sequence>
      <Sequence from={350} durationInFrames={40}>
        <AdvancedTransition type="quantum" />
      </Sequence>
    </div>
  );
};
```

### 2. `scenes/*.tsx` - 镜头组件

- 每个场景**独立一个文件**
- 包含完整的**动画逻辑**
- 使用 `useCurrentFrame()` 读取当前帧
- 使用 `interpolate()` 和 `Easing` 进行动画计算

```typescript
export const HeroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity }}>...</div>;
};
```

### 3. `components/*.tsx` - 可复用组件

- **无动画**的UI组件
- 接收 props 参数
- 高度复用性

### 4. `hooks/*.ts` - 自定义Hook

- 动画逻辑提取
- 可跨镜头复用

### 5. `constants.ts` - 配置中心

- 颜色定义 (COLORS)
- 时序配置 (TIMINGS)
- 尺寸常量 (SIZES)

### 6. `types.ts` - 类型定义

- TypeScript 类型定义
- Props 接口
- 数据结构定义

### 7. `config.ts` - 视频配置

- 视频全局配置
- 预设值

## ✅ 开发规范

### 必须做 ✓

- ✅ 每个镜头**单独一个文件** (scenes/)
- ✅ scenes 下的组件**独立使用** `useCurrentFrame()`
- ✅ 在 `index.tsx` 中**集中管理**时序配置
- ✅ 使用 **TypeScript + 强类型**
- ✅ 清晰命名：`HeroSection`, `ProductShowcase` 等
- ✅ 使用 `interpolate(..., { extrapolateLeft: "clamp" })`

### 禁止做 ✗

- ❌ 把所有镜头逻辑堆在 `index.tsx` 中
- ❌ 在 `components/` 目录放动画相关的组件
- ❌ 混淆 `scenes/` 和 `components/` 的用途
- ❌ 使用简单的 frame 计算（必须用 `interpolate`）
- ❌ 硬编码魔法数字（应在 `constants.ts`）

### 最佳实践 ⚡

- 🔥 `scenes/` 中的组件是"帧感知"的，需要 frame 参数
- 🔥 `components/` 中的组件是"无感知"的，纯展示
- 🔥 在 `hooks/` 中提取重复的 `interpolate` 逻辑
- 🔥 每个场景限制在 **200-300 行**代码

## 🔗 导入路径规范

### Root.tsx 中的导入

```typescript
import { OhYesAIVideo } from "./components/OhYesAIVideo";
import { HuaweiMate80Promo } from "./components/HuaweiMate80Promo";
import { RemotionIntroVideo } from "./components/RemotionIntroVideo";
import { HuaweiNova15UltraPromo } from "./components/HuaweiNova15UltraPromo";
import { TailwindSQLPromo } from "./components/TailwindSQLPromo";
```

### 视频内部导入 (如 `OhYesAIVideo/index.tsx`)

```typescript
import { HeroSection } from "./scenes/HeroSection";
import { COLORS } from "./constants";
import { useAnimation } from "./hooks/useAnimation";
```

## 📊 5个视频项目清单

### 1️⃣ OhYesAIVideo (2700帧 / 90秒)

11个场景：Hero开场 → 转场 → 产品展示 → ... → 结尾CTA

**场景结构**：

```
├─ HeroSection (350帧)
├─ AdvancedTransition:quantum (40帧)
├─ ProductShowcase (360帧)
├─ AdvancedTransition:matrix (40帧)
├─ FeaturesGrid (410帧)
├─ AdvancedTransition:nexus (40帧)
├─ IndustryShowcase (420帧)
├─ AdvancedTransition:warp (40帧)
├─ TechStack (500帧)
├─ AdvancedTransition:quantum (40帧)
└─ CallToAction (460帧)
```

### 2️⃣ HuaweiMate80Promo (900帧 / 30秒)

6个场景：开场 → 屏幕 → 性能 → 摄像头 → AI → 结尾

### 3️⃣ RemotionIntroVideo (900帧 / 30秒)

7个场景：介绍 Remotion 框架的技术教育视频

### 4️⃣ HuaweiNova15UltraPromo (1200帧 / 40秒)

8个场景：星耀架构、影像系统、芯片、AI、充电、卫星通讯等

### 5️⃣ TailwindSQLPromo (1800帧 / 60秒)

7个场景：开场 → 问题 → 解决方案 → 特性 → 代码 → 高潮 → 结尾

**[详细文档]** → `src/components/TailwindSQLPromo/`

## 📚 文档导航

| 文档                      | 位置                                           | 用途               |
| ------------------------- | ---------------------------------------------- | ------------------ |
| **README.md**             | 根目录                                         | 项目总览（本文件） |
| **AGENTS.md**             | 根目录                                         | AI开发代理指南     |
| **各视频README**          | `src/components/VideoName/`                    | 各视频项目说明     |
| **TailwindSQL GUIDE**     | `src/components/TailwindSQLPromo/GUIDE.md`     | 详细制作指南       |
| **TailwindSQL DELIVERY**  | `src/components/TailwindSQLPromo/DELIVERY.md`  | 交付总结           |
| **TailwindSQL CHECKLIST** | `src/components/TailwindSQLPromo/CHECKLIST.md` | 质量检查清单       |

## 🛠️ 维护指南

### 添加新镜头

1. 在 `scenes/` 中创建新的 `.tsx` 文件
2. 在 `index.tsx` 的 `TIMINGS` 中添加时序
3. 在 `index.tsx` 中添加新的 `<Sequence>`

### 修改现有镜头

1. 直接编辑对应的 `scenes/*.tsx` 文件
2. 如果改变时长，需要修改 `TIMINGS` 和 `index.tsx`

### 提取公共组件

- 多个视频需要某个组件？在 `src/components/` 下创建共享目录
- 或在各自视频的 `components/` 中定义（推荐用于视频特定组件）

### 复用代码

- 跨视频的 Hook → 提取到共享目录
- 视频特定的 Hook → 保存在视频的 `hooks/` 目录

## 🎯 质量标准

项目所有视频遵循以下质量等级：

✅ **Apple 发布会级别** - 专业的配色、动效、构图  
✅ **Tesla 宣传片级别** - 强势的品牌传达  
✅ **商业广告片级别** - 高能量、冲击力强  
✅ **电影级片头级别** - 每一帧都精心设计

## 📖 Remotion 文档

- [Remotion 官方文档](https://www.remotion.dev/docs/the-fundamentals)
- [Discord 社区](https://discord.gg/6VzzNDwUwV)
- [GitHub Issues](https://github.com/remotion-dev/remotion/issues/new)

## 📄 License

参考 [Remotion License](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)

---

**制作**：爱坤 (Video Production Engineer)  
**最后更新**：2026-02-03  
**项目质量**：⭐⭐⭐⭐⭐ 电影级营销视频制作平台
