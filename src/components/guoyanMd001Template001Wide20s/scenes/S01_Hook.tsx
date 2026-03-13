import type { FC } from "react";
import { staticFile } from "remotion";
import { ASSET_PATHS, COLORS, GRID } from "../constants";
import { MaskedText } from "../components/MaskedText";
import { SceneShell } from "./SceneShell";
import { VisualWindow } from "../components/VisualWindow";

export const S01Hook: FC = () => {
  const colW = GRID.contentWidth / GRID.columns;
  const leftW = Math.round(colW * 5 - GRID.gutter);
  const rightX = Math.round(colW * 5 + GRID.gutter);
  const rightW = Math.round(colW * 7 - GRID.gutter);

  return (
    <SceneShell>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: leftW, paddingTop: 18 }}>
          <MaskedText
            text="以 AI 赋能创作"
            startFrame={16}
            durationFrames={26}
            style={{
              fontSize: 128,
              fontWeight: 560,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              color: COLORS.ink,
            }}
          />
          <div style={{ height: 18 }} />
          <MaskedText
            text="共赴新征程"
            startFrame={22}
            durationFrames={26}
            style={{
              fontSize: 128,
              fontWeight: 560,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              color: COLORS.ink,
            }}
          />

          <div style={{ height: 34 }} />
          <MaskedText
            text="GUOYAN · 2025 REVIEW"
            startFrame={34}
            durationFrames={22}
            style={{
              fontSize: 20,
              fontWeight: 520,
              letterSpacing: "0.12em",
              color: COLORS.ink3,
              textTransform: "uppercase",
            }}
          />
          <div style={{ height: 14 }} />
          <MaskedText
            text="用 AI 重构视频创作"
            startFrame={40}
            durationFrames={24}
            style={{
              fontSize: 26,
              fontWeight: 450,
              letterSpacing: "0.02em",
              color: COLORS.ink2,
              lineHeight: 1.35,
              maxWidth: leftW - 24,
            }}
          />
        </div>

        <div style={{ width: GRID.gutter }} />

        <div style={{ flex: 1, position: "relative" }}>
          <VisualWindow
            // 避免 GIF 逐帧解码导致的合成压力：开场右窗使用静态大图
            src={staticFile(ASSET_PATHS.product)}
            startFrame={12}
            durationFrames={40}
            style={{
              position: "absolute",
              left: rightX - (leftW + GRID.gutter),
              top: 40,
              width: rightW,
              height: 1080 - 240 - 80,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: rightX - (leftW + GRID.gutter) + 20,
              bottom: 28,
              color: COLORS.ink3,
              fontSize: 18,
              letterSpacing: "0.12em",
              opacity: 0.9,
            }}
          >
            01 / 05
          </div>
        </div>
      </div>

      {/* 轻微“准星读数” */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          display: "flex",
          gap: 14,
          alignItems: "baseline",
          color: COLORS.ink3,
          fontSize: 18,
          letterSpacing: "0.10em",
        }}
      >
        <span style={{ color: COLORS.ink2, letterSpacing: "0.14em" }}>
          2025
        </span>
        <span>AI · VIDEO</span>
        <span style={{ color: COLORS.accent }}>+</span>
        <span>CAPABILITY</span>
      </div>
    </SceneShell>
  );
};
