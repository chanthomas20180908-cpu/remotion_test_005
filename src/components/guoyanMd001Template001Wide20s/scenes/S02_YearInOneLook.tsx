import type { FC } from "react";
import { staticFile } from "remotion";
import { ASSET_PATHS, COLORS, GRID } from "../constants";
import { MaskedText } from "../components/MaskedText";
import { VisualWindow } from "../components/VisualWindow";
import { SceneShell } from "./SceneShell";

export const S02YearInOneLook: FC = () => {
  const colW = GRID.contentWidth / GRID.columns;
  const leftW = Math.round(colW * 5 - GRID.gutter);
  const rightW = Math.round(colW * 7 - GRID.gutter);

  return (
    <SceneShell>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: leftW, paddingTop: 14 }}>
          <MaskedText
            text="年度一眼看懂"
            startFrame={16}
            durationFrames={24}
            style={{
              fontSize: 72,
              fontWeight: 560,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: COLORS.ink,
            }}
          />
          <div style={{ height: 18 }} />

          <div style={{ display: "grid", gap: 16, marginTop: 10 }}>
            <MetricRow value="80%" label="用户创作效率提升" startFrame={24} />
            <MetricRow value="千万+" label="2025 年营收规模" startFrame={30} />
            <MetricRow value="4 + 3" label="专利 / 软著新增" startFrame={36} />
          </div>

          <div style={{ height: 22 }} />
          <MaskedText
            text="AIGC 全面爆发，围绕“用 AI 重构视频创作”形成产品与服务协同。"
            startFrame={44}
            durationFrames={26}
            style={{
              fontSize: 24,
              fontWeight: 430,
              color: COLORS.ink2,
              lineHeight: 1.55,
              maxWidth: leftW - 10,
            }}
          />
        </div>

        <div style={{ width: GRID.gutter }} />

        <div style={{ flex: 1, position: "relative" }}>
          <VisualWindow
            src={staticFile(ASSET_PATHS.product)}
            startFrame={12}
            durationFrames={38}
            style={{
              position: "absolute",
              left: 0,
              top: 40,
              width: rightW,
              height: 1080 - 240 - 80,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 28,
              color: COLORS.ink3,
              fontSize: 18,
              letterSpacing: "0.12em",
              opacity: 0.9,
            }}
          >
            02 / 05
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const MetricRow: FC<{ value: string; label: string; startFrame: number }> = ({
  value,
  label,
  startFrame,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "baseline",
        gap: 18,
      }}
    >
      <MaskedText
        text={value}
        startFrame={startFrame}
        durationFrames={22}
        style={{
          fontSize: 96,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: COLORS.accent,
          lineHeight: 0.95,
        }}
      />
      <MaskedText
        text={label}
        startFrame={startFrame + 4}
        durationFrames={20}
        style={{
          fontSize: 22,
          fontWeight: 520,
          letterSpacing: "0.10em",
          color: COLORS.ink3,
          textTransform: "uppercase",
        }}
      />
    </div>
  );
};
