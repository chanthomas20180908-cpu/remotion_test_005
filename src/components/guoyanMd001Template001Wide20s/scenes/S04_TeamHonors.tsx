import type { FC } from "react";
import { staticFile } from "remotion";
import { ASSET_PATHS, COLORS, GRID } from "../constants";
import { MaskedText } from "../components/MaskedText";
import { VisualWindow } from "../components/VisualWindow";
import { SceneShell } from "./SceneShell";

export const S04TeamHonors: FC = () => {
  const colW = GRID.contentWidth / GRID.columns;
  const leftW = Math.round(colW * 5 - GRID.gutter);
  const rightW = Math.round(colW * 7 - GRID.gutter);

  return (
    <SceneShell>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: leftW, paddingTop: 14 }}>
          <MaskedText
            text="团队 · 荣誉"
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
          <MaskedText
            text="24 人复合型团队"
            startFrame={26}
            durationFrames={22}
            style={{
              fontSize: 28,
              fontWeight: 520,
              color: COLORS.ink2,
              lineHeight: 1.4,
            }}
          />
          <div style={{ height: 10 }} />
          <MaskedText
            text="研发占比 60%+ · 形成持续创新引擎"
            startFrame={32}
            durationFrames={22}
            style={{
              fontSize: 22,
              fontWeight: 450,
              letterSpacing: "0.02em",
              color: COLORS.ink3,
              lineHeight: 1.5,
            }}
          />
          <div style={{ height: 22 }} />
          <MaskedText
            text="多项国家级 / 市级荣誉认可"
            startFrame={40}
            durationFrames={22}
            style={{
              fontSize: 26,
              fontWeight: 520,
              letterSpacing: "0.02em",
              color: COLORS.accent,
              lineHeight: 1.4,
            }}
          />
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
              gridTemplateRows: "1fr 0.58fr",
              gap: 16,
            }}
          >
            <VisualWindow
              src={staticFile(ASSET_PATHS.team)}
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
            04 / 05
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
