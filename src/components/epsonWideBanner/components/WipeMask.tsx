import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EPSON_WIDE_BANNER } from "../video-constants";
import { EASING } from "../easing";

export type WipeStyle = "slit" | "diagonal" | "door" | "top";

export type WipeMaskProps = {
  wipeStyle: WipeStyle;
  isFirst: boolean;
  /** 用于“刀线继承”的转场原点（像素） */
  originX: number;
  /** 当前 Scene 的 Sequence 时长（用于做 exit wipe） */
  durationInFrames: number;
  /** 最后一场通常不需要 exit wipe（避免 CTA 提前被关掉） */
  enableExit?: boolean;
  children: React.ReactNode;
};

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

const pct = (v01: number): string => `${Math.round(clamp01(v01) * 1000) / 10}%`;

const insetClip = (
  top: number,
  right: number,
  bottom: number,
  left: number,
): string => {
  return `inset(${pct(top)} ${pct(right)} ${pct(bottom)} ${pct(left)})`;
};

const polygonClip = (points: Array<[number, number]>): string => {
  const str = points.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ");
  return `polygon(${str})`;
};

export const WipeMask: React.FC<WipeMaskProps> = ({
  wipeStyle,
  isFirst,
  originX,
  durationInFrames,
  enableExit = true,
  children,
}) => {
  const frame = useCurrentFrame();
  const t = EPSON_WIDE_BANNER.transitionDurationInFrames;

  const enterP = isFirst
    ? 1
    : clamp01(
        interpolate(frame, [0, t], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASING.expoInOut,
        }),
      );

  const exitP = enableExit
    ? clamp01(
        interpolate(frame, [durationInFrames - t, durationInFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASING.expoInOut,
        }),
      )
    : 0;

  // 场内可视进度：进入展开 + 退出收拢，保证 overlap 时不会两屏内容叠加。
  const visibleP = clamp01(Math.min(enterP, 1 - exitP));

  const clipPath = (() => {
    // 第一场如果启用退出，也需要 clip（否则 overlap 仍然叠字）
    if (visibleP >= 0.999) {
      // 不要把 clip-path 变成 null：属性离散切换会产生 1 帧“卡一下”。
      return polygonClip([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ]);
    }

    const originX01 = clamp01(originX / EPSON_WIDE_BANNER.width);

    switch (wipeStyle) {
      case "slit": {
        // 以导视线为“刀口”，从细缝扩张到全画面。
        const xL = originX01 - originX01 * visibleP;
        const xR = originX01 + (1 - originX01) * visibleP;
        return polygonClip([
          [xL, 0],
          [xR, 0],
          [xR, 1],
          [xL, 1],
        ]);
      }
      case "diagonal": {
        const skew = 0.18;
        // p=0 必须完全收拢；p=1 必须完整覆盖（不能永远留一个对角缺口）。
        const xTop = clamp01(visibleP * (1 + skew));
        const xBottom = clamp01(visibleP);
        return polygonClip([
          [0, 0],
          [xTop, 0],
          [xBottom, 1],
          [0, 1],
        ]);
      }
      case "door": {
        const side = (1 - visibleP) * 0.5;
        return insetClip(0, side, 0, side);
      }
      case "top": {
        const y = 1 - visibleP;
        const yL = y;
        const yR = y + 0.06 * y;
        return polygonClip([
          [0, yL],
          [1, yR],
          [1, 1],
          [0, 1],
        ]);
      }
      default: {
        const _exhaustive: never = wipeStyle;
        return _exhaustive;
      }
    }
  })();

  return (
    <div
      style={
        {
          position: "absolute",
          inset: 0,
          clipPath: clipPath ?? undefined,
          WebkitClipPath: clipPath ?? undefined,
          willChange: "clip-path, transform",
        } satisfies React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
