import type { FC } from "react";
import { staticFile } from "remotion";
import { ASSET_PATHS, COLORS, GRID } from "../constants";
import { MaskedText } from "../components/MaskedText";
import { VisualWindow } from "../components/VisualWindow";
import { SceneShell } from "./SceneShell";

export const S03FlagshipProof: FC = () => {
  const colW = GRID.contentWidth / GRID.columns;
  const leftW = Math.round(colW * 5 - GRID.gutter);
  const rightW = Math.round(colW * 7 - GRID.gutter);

  return (
    <SceneShell>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: leftW, paddingTop: 14 }}>
          <MaskedText
            text="标杆项目复盘"
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
          <div style={{ height: 14 }} />
          <MaskedText
            text="北京 · AI + 广电传媒"
            startFrame={22}
            durationFrames={22}
            style={{
              fontSize: 20,
              fontWeight: 520,
              letterSpacing: "0.14em",
              color: COLORS.ink3,
              textTransform: "uppercase",
            }}
          />

          <div style={{ height: 22 }} />
          <div style={{ display: "grid", gap: 14 }}>
            <ImpactRow value="92%+" label="内容识别准确率" startFrame={30} />
            <ImpactRow value="+60%" label="生产效率提升" startFrame={36} />
            <ImpactRow value="-40%" label="审核成本降低" startFrame={42} />
          </div>
        </div>

        <div style={{ width: GRID.gutter }} />

        <div style={{ flex: 1, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 40,
              width: rightW,
              height: 1080 - 240 - 80,
              display: "grid",
              gridTemplateRows: "1fr 0.52fr",
              gap: 16,
            }}
          >
            <VisualWindow
              src={staticFile(ASSET_PATHS.proof)}
              startFrame={12}
              durationFrames={34}
              style={{ position: "relative", width: "100%", height: "100%" }}
            />
            <VisualWindow
              src={staticFile(ASSET_PATHS.award)}
              startFrame={18}
              durationFrames={34}
              style={{ position: "relative", width: "100%", height: "100%" }}
            />
          </div>

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
            03 / 05
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const ImpactRow: FC<{ value: string; label: string; startFrame: number }> = ({
  value,
  label,
  startFrame,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        alignItems: "baseline",
        gap: 18,
      }}
    >
      <MaskedText
        text={value}
        startFrame={startFrame}
        durationFrames={22}
        style={{
          fontSize: 92,
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
          color: COLORS.ink2,
        }}
      />
    </div>
  );
};
