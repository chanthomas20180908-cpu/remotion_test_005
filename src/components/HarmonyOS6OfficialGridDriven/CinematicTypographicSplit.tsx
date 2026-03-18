import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { TypographicSplitProps } from "./schema";

// 高级指数级阻尼曲线 (起步极猛，落位极度拖延丝滑，拒绝线性 PPT 感)
const power4Out = Easing.bezier(0.16, 1, 0.3, 1);
const expoInOut = Easing.bezier(0.87, 0, 0.13, 1);

// 注意：此文件为模板代码的工程化落地，动效与结构保持不变；仅做了类型与 lint 兼容处理。
export const CinematicTypographicSplit: React.FC<TypographicSplitProps> = ({
  theme,
  leftSection,
  rightSection,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  void fps;

  // 统一入场动画起始点（预留前 10 帧空白作为蓄力段）
  const enterStart = 10;

  // --- 1. 左侧：文字阶梯遮罩动画计算 ---
  const labelY = interpolate(frame, [enterStart, enterStart + 25], [20, 0], {
    easing: power4Out,
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const labelOpacity = interpolate(
    frame,
    [enterStart, enterStart + 15],
    [0, 1],
    {
      extrapolateRight: "clamp",
    },
  ); // 仅微小辅助标签允许极短淡入

  // --- 2. 右侧：图像视差遮罩动画计算 ---
  // 图像外层遮罩展开（从底向上揭开或从中心展开）
  const imageMaskProgress = interpolate(
    frame,
    [enterStart + 15, enterStart + 55],
    [100, 0],
    {
      easing: expoInOut, // 极具戏剧性的张力曲线
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  // 图像内部持续极缓收缩（Ken Burns 视差错觉）
  const imageScale = interpolate(
    frame,
    [enterStart + 15, enterStart + 150],
    [1.15, 1.0],
    {
      easing: power4Out,
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: theme.backgroundColor }}>
      {/* 核心网格系统容器 */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "5%", // 创造巨大的外围负空间
        }}
      >
        {/* ================= 左侧：排版视区 ================= */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRight: `1px solid ${theme.lineColor}`, // 经典的瑞士风网格线
            paddingRight: "6%",
            position: "relative",
          }}
        >
          {/* 左上角极小标签 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              textTransform: "uppercase",
              fontSize: "18px",
              letterSpacing: "0.1em",
              color: theme.textColor,
              transform: `translateY(${labelY}px)`,
              opacity: labelOpacity,
            }}
          >
            {leftSection.topLabel}
          </div>

          {/* 巨大的阶梯式主标题 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {leftSection.headlineLines.map((line, index) => {
              // 逐行延迟 (Stagger)，每行比上一行晚 4 帧入场
              const lineStart = enterStart + 5 + index * 4;
              const translateY = interpolate(
                frame,
                [lineStart, lineStart + 35],
                [100, 0],
                {
                  easing: power4Out,
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                },
              );

              return (
                <div
                  key={index}
                  style={{
                    overflow: "hidden",
                    paddingBottom: "10px" /* 防止下沉字母如 g,p 被裁切 */,
                  }}
                >
                  <div
                    style={{
                      fontSize: "110px", // 夸张的主视觉字号
                      fontWeight: 500, // 根据需求可改为 700 或 900
                      lineHeight: "0.9", // 极度收紧行高
                      letterSpacing: "-0.04em", // 收紧字距
                      color: theme.textColor,
                      textTransform: "uppercase",
                      transform: `translateY(${translateY}%)`, // Y轴位移实现遮罩揭示
                      willChange: "transform",
                    }}
                  >
                    {line}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 辅助副文案 (如果有) */}
          {leftSection.description && (
            <div
              style={{
                marginTop: "40px",
                fontSize: "26px",
                lineHeight: "1.4",
                maxWidth: "80%",
                color: theme.textColor,
                opacity: interpolate(
                  frame,
                  [enterStart + 30, enterStart + 50],
                  [0, 1],
                  { extrapolateRight: "clamp" },
                ),
              }}
            >
              {leftSection.description}
            </div>
          )}
        </div>

        {/* ================= 右侧：图像视差区 ================= */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "6%",
            position: "relative",
          }}
        >
          {/* 右上角极小标签 */}
          {rightSection.topRightLabel && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                fontSize: "18px",
                color: theme.textColor,
              }}
            >
              {rightSection.topRightLabel}
            </div>
          )}

          {/* 图像遮罩容器 (Clip-Path Wipe Reveal) */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4 / 5", // 强制控制画面比例，避免图片填满显得廉价
              overflow: "hidden",
              clipPath: `inset(${imageMaskProgress}% 0 0 0)`, // 类似刀片从下往上刮开的揭示感
              willChange: "clip-path",
            }}
          >
            <Img
              src={rightSection.imageSrc}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${imageScale})`, // 视差缓缩
                transformOrigin: "center center",
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
