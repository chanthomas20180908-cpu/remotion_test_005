import React, { type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  COLORS,
  GRID_COLUMNS,
  SAFE_X,
  SAFE_Y,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../constants";
import { power4InOut } from "../easings";

type Variant = "light" | "dark";

export type SceneShellProps = {
  variant: Variant;
  children: ReactNode;
  gridAlign?: CSSProperties["alignItems"];
};

export const SceneShell: React.FC<SceneShellProps> = ({
  variant,
  children,
  gridAlign = "center",
}) => {
  const frame = useCurrentFrame();
  const palette = variant === "dark" ? COLORS.dark : COLORS.light;

  // 始终在运动（极慢 Ken Burns）：让画面有“呼吸”，但不抢戏
  const bgT = interpolate(frame, [0, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4InOut,
  });
  const bgScale = 1.0 + 0.05 * bgT;
  const bgX = -16 * bgT;
  const bgY = 10 * bgT;

  const rootStyle: CSSProperties = {
    backgroundColor: palette.bg,
    color: palette.textPrimary,
    fontFamily:
      "PingFang SC, HarmonyOS Sans, Noto Sans SC, system-ui, -apple-system, sans-serif",
  };

  const bgLayer: CSSProperties = {
    position: "absolute",
    inset: 0,
    transform: `translate3d(${bgX}px, ${bgY}px, 0) scale(${bgScale})`,
    transformOrigin: "50% 50%",
    background:
      variant === "dark"
        ? "radial-gradient(1200px 700px at 72% 48%, rgba(58,183,255,0.14), rgba(6,10,18,0) 60%), radial-gradient(900px 600px at 28% 62%, rgba(85,230,213,0.10), rgba(6,10,18,0) 55%)"
        : "radial-gradient(1100px 700px at 72% 44%, rgba(58,183,255,0.10), rgba(246,248,252,0) 60%), radial-gradient(900px 700px at 30% 65%, rgba(85,230,213,0.08), rgba(246,248,252,0) 55%)",
  };

  const contentWrap: CSSProperties = {
    position: "absolute",
    inset: 0,
    paddingLeft: SAFE_X,
    paddingRight: SAFE_X,
    paddingTop: SAFE_Y,
    paddingBottom: SAFE_Y,
  };

  const gridStyle: CSSProperties = {
    width: VIDEO_WIDTH - SAFE_X * 2,
    height: VIDEO_HEIGHT - SAFE_Y * 2,
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
    columnGap: 28,
    alignItems: gridAlign,
  };

  const topHairline: CSSProperties = {
    position: "absolute",
    left: SAFE_X,
    right: SAFE_X,
    top: SAFE_Y,
    height: 1,
    backgroundColor:
      variant === "dark" ? "rgba(215,224,236,0.10)" : "rgba(215,224,236,0.70)",
  };

  return (
    <AbsoluteFill style={rootStyle}>
      <div style={bgLayer} />
      <div style={topHairline} />
      <div style={contentWrap}>
        <div style={gridStyle}>{children}</div>
      </div>
    </AbsoluteFill>
  );
};
