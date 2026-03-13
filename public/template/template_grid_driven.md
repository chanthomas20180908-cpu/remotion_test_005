### 🔬 第一部分：视觉与运镜手术级拆解 (Visual & Motion Analysis)

**1. 网格与布局 (Grid & Layout)**
*   **物理分割线**：画面被一条清晰的 1px 垂直线严谨地一分为二（50/50 或 45/55 分配）。这不是简单的边距留白，而是将屏幕视为“画布网格（Canvas Grid）”，赋予了极强的秩序感。
*   **绝对对齐**：左侧信息的上边缘与右侧图片的下边缘或标签高度强对齐，遵循严苛的基线（Baseline）对齐法则。

**2. 视觉层级与负空间 (Hierarchy & Negative Space)**
*   **第一眼（视觉锤）**：左侧极其巨大的主标题（Headline），采用无衬线大写粗体，字间距（Letter-spacing）极度收紧，压迫感极强。
*   **第二眼（情绪落点）**：右侧的画面/图片。图片不是铺满的，而是被限制在网格区域内。
*   **第三眼（信息补充）**：极其微小的标签（如左上角的“CASE STUDIES”、右侧的正文描述），与主标题形成几十倍的夸张大小反差。留白（Negative Space）本身成为了设计的核心元素。

**3. 动效逻辑与物理学 (Motion & Physics)**
*   **无透明度淡入（Zero-Fade Policy）**：全片摒弃了廉价的 `opacity: 0 -> 1`。
*   **文字阶梯上升（Staggered Line Reveal）**：主标题被切割为多行，每一行被包裹在一个 `overflow: hidden` 的隐形遮罩中，文字从下往上 `translateY(100% -> 0)` 猛烈升起，带有微小的延迟错位（Stagger），物理曲线类似 `power4.out`（起步极速，落点极缓）。
*   **图片视差裁切（Parallax Masking）**：图片的入场不是简单出现，而是外部容器（Mask）的高度从 0 展开到 100%，同时图片自身从 `scale(1.15)` 缓慢缩放至 `scale(1.0)`，形成空间推拉视差。

---

### 📋 第二部分：组件数据契约 (Data Schema Definition)

为了让大模型或 API 可以无缝调用该组件进行批量渲染，我为其定义了严格的参数化契约。

```typescript
// types/schema.ts
export interface TypographicSplitProps {
  theme: {
    backgroundColor: string; // 推荐低饱和度大地色或极简灰白，如 "#E8E6E1"
    lineColor: string;       // 网格分割线颜色，如 "rgba(0,0,0,0.1)"
    textColor: string;       // 文字主色调，如 "#111111"
  };
  leftSection: {
    topLabel: string;        // 极小字号的分类标签，例如 "CASE STUDIES"
    headlineLines: string[]; // 巨大的主标题（拆分为数组以实现逐行遮罩动画），例如["100 YEARS OF", "PARTNERSHIPS", "FOR PARENTS"]
    description?: string;    // 副文本（可选）
  };
  rightSection: {
    imageSrc: string;        // 核心配图
    topRightLabel?: string;  // 右上角微小标签，例如 "1/5" 或 "VIEW ALL"
  };
  durationInFrames: number;  // 该场景的持续总帧数
}
```

---

### 💻 第三部分：Remotion 生产级代码 (Component Code)

以下是严格遵守红线要求编写的单文件 Remotion 组件。它完美复刻了指数级阻尼曲线、绝对网格与遮罩阶梯动效。

```tsx
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
} from 'remotion';

// 高级指数级阻尼曲线 (起步极猛，落位极度拖延丝滑，拒绝线性 PPT 感)
const power4Out = Easing.bezier(0.16, 1, 0.3, 1);
const expoInOut = Easing.bezier(0.87, 0, 0.13, 1);

export const CinematicTypographicSplit: React.FC<TypographicSplitProps> = ({
  theme,
  leftSection,
  rightSection,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 统一入场动画起始点（预留前 10 帧空白作为蓄力段）
  const enterStart = 10; 
  
  // --- 1. 左侧：文字阶梯遮罩动画计算 ---
  const labelY = interpolate(frame,[enterStart, enterStart + 25], [20, 0], { easing: power4Out, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const labelOpacity = interpolate(frame,[enterStart, enterStart + 15], [0, 1], { extrapolateRight: 'clamp' }); // 仅微小辅助标签允许极短淡入

  // --- 2. 右侧：图像视差遮罩动画计算 ---
  // 图像外层遮罩展开（从底向上揭开或从中心展开）
  const imageMaskProgress = interpolate(frame, [enterStart + 15, enterStart + 55],[100, 0], {
    easing: expoInOut, // 极具戏剧性的张力曲线
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  
  // 图像内部持续极缓收缩（Ken Burns 视差错觉）
  const imageScale = interpolate(frame,[enterStart + 15, enterStart + 150],[1.15, 1.0], {
    easing: power4Out,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.backgroundColor }}>
      {/* 核心网格系统容器 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '5%', // 创造巨大的外围负空间
      }}>
        
        {/* ================= 左侧：排版视区 ================= */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: `1px solid ${theme.lineColor}`, // 经典的瑞士风网格线
          paddingRight: '6%',
          position: 'relative'
        }}>
          {/* 左上角极小标签 */}
          <div style={{
            position: 'absolute',
            top: 0,
            textTransform: 'uppercase',
            fontSize: '18px',
            letterSpacing: '0.1em',
            color: theme.textColor,
            transform: `translateY(${labelY}px)`,
            opacity: labelOpacity,
          }}>
            {leftSection.topLabel}
          </div>

          {/* 巨大的阶梯式主标题 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {leftSection.headlineLines.map((line, index) => {
              // 逐行延迟 (Stagger)，每行比上一行晚 4 帧入场
              const lineStart = enterStart + 5 + index * 4;
              const translateY = interpolate(frame, [lineStart, lineStart + 35],[100, 0], {
                easing: power4Out,
                extrapolateRight: 'clamp',
                extrapolateLeft: 'clamp',
              });

              return (
                <div key={index} style={{ overflow: 'hidden', paddingBottom: '10px' /* 防止下沉字母如 g,p 被裁切 */ }}>
                  <div style={{
                    fontSize: '110px',      // 夸张的主视觉字号
                    fontWeight: 500,        // 根据需求可改为 700 或 900
                    lineHeight: '0.9',      // 极度收紧行高
                    letterSpacing: '-0.04em', // 收紧字距
                    color: theme.textColor,
                    textTransform: 'uppercase',
                    transform: `translateY(${translateY}%)`, // Y轴位移实现遮罩揭示
                    willChange: 'transform',
                  }}>
                    {line}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 辅助副文案 (如果有) */}
          {leftSection.description && (
            <div style={{
              marginTop: '40px',
              fontSize: '26px',
              lineHeight: '1.4',
              maxWidth: '80%',
              color: theme.textColor,
              opacity: interpolate(frame, [enterStart + 30, enterStart + 50], [0, 1], { extrapolateRight: 'clamp' })
            }}>
              {leftSection.description}
            </div>
          )}
        </div>

        {/* ================= 右侧：图像视差区 ================= */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '6%',
          position: 'relative'
        }}>
          {/* 右上角极小标签 */}
          {rightSection.topRightLabel && (
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '18px',
              color: theme.textColor,
            }}>
              {rightSection.topRightLabel}
            </div>
          )}

          {/* 图像遮罩容器 (Clip-Path Wipe Reveal) */}
          <div style={{
            width: '100%',
            aspectRatio: '4 / 5', // 强制控制画面比例，避免图片填满显得廉价
            overflow: 'hidden',
            clipPath: `inset(${imageMaskProgress}% 0 0 0)`, // 类似刀片从下往上刮开的揭示感
            willChange: 'clip-path'
          }}>
            <Img
              src={rightSection.imageSrc}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${imageScale})`, // 视差缓缩
                transformOrigin: 'center center',
                willChange: 'transform'
              }}
            />
          </div>
        </div>
        
      </div>
    </AbsoluteFill>
  );
};
```

### 🎯 架构师点评（为什么它完美契合您的需求？）
1. **彻底根除了大模型的“排版随机性”**：通过 `flex: 1` 和强硬的 `borderRight`，在这个组件内，大模型再怎么丢数据，也无法破坏 50/50 的黄金网格骨架。
2. **纯前端魔法级视差**：右侧图片的 `clipPath: inset(100% -> 0)` 与内部图片的 `scale(1.15 -> 1.0)` 是各自独立的时间轴。这种**“外框在展开，内部在后退”**的视觉差，是传统幻灯片永远做不出的高级感。
3. **Typography 就是一切**：左侧通过强制拆分为数组 `headlineLines` 结合 `overflow: hidden` 实现了阶梯式文字遮罩（Text Masking Reveal），完美替代了需要高昂开发成本的 GSAP SplitText，且性能在 Remotion 逐帧渲染中极其稳定。