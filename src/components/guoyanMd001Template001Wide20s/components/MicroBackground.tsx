import type { FC } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { ASSET_PATHS, COLORS } from "../constants";

export const MicroBackground: FC = () => {
  const frame = useCurrentFrame();

  // 极慢 Ken Burns（避免静止画面）
  const driftX = interpolate(frame, [0, 576], [0, -18], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, 576], [0, 10], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 576], [1, 1.05], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vignette = interpolate(frame, [0, 120], [0.18, 0.26], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`,
        backgroundColor: COLORS.bg,
      }}
    >
      {/* 低成本纹理：静态 PNG 轻微漂移（替代 GIF 解码压力） */}
      <AbsoluteFill
        style={{
          opacity: 0.08,
          transform: `translate3d(${Math.round(driftX * -0.6)}px, ${Math.round(
            driftY * -0.6,
          )}px, 0) scale(1.35)`,
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile(ASSET_PATHS.square)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.9)",
          }}
        />
      </AbsoluteFill>

      {/* 轻微环境层：不做夸张渐变，保持“高级负空间” */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 800px at 70% 40%, rgba(105, 210, 255, 0.10), rgba(0, 0, 0, 0) 60%)",
          opacity: 0.55,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(900px 600px at 15% 80%, rgba(36, 48, 66, 0.55), rgba(0, 0, 0, 0) 62%)",
          opacity: vignette,
        }}
      />
    </AbsoluteFill>
  );
};
