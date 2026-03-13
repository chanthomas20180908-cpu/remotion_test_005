import type { FC } from "react";
import { staticFile } from "remotion";
import { ASSET_PATHS, COLORS, GRID } from "../constants";
import { MaskedText } from "../components/MaskedText";
import { VisualWindow } from "../components/VisualWindow";
import { SceneShell } from "./SceneShell";

export const S05FutureCTA: FC = () => {
  const colW = GRID.contentWidth / GRID.columns;
  const leftW = Math.round(colW * 5 - GRID.gutter);
  const rightW = Math.round(colW * 7 - GRID.gutter);

  return (
    <SceneShell>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: leftW, paddingTop: 18 }}>
          <MaskedText
            text="面向 2026"
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
          <div style={{ height: 22 }} />
          <MaskedText
            text="营收 3000 万+ · A 轮融资"
            startFrame={28}
            durationFrames={22}
            style={{
              fontSize: 26,
              fontWeight: 520,
              letterSpacing: "0.02em",
              color: COLORS.accent,
            }}
          />
          <div style={{ height: 12 }} />
          <MaskedText
            text="迭代元婴大模型与 VisionConnect 能力，拓展更多行业场景。"
            startFrame={34}
            durationFrames={26}
            style={{
              fontSize: 24,
              fontWeight: 430,
              color: COLORS.ink2,
              lineHeight: 1.55,
              maxWidth: leftW - 6,
            }}
          />
          <div style={{ height: 26 }} />
          <MaskedText
            text="期待与更多伙伴携手，开启智能内容创作新征程。"
            startFrame={44}
            durationFrames={26}
            style={{
              fontSize: 28,
              fontWeight: 520,
              letterSpacing: "0.01em",
              color: COLORS.ink,
              lineHeight: 1.4,
            }}
          />

          <div style={{ position: "absolute", left: 0, bottom: 0 }}>
            <MaskedText
              text="国研能汇（北京）技术有限公司"
              startFrame={62}
              durationFrames={24}
              style={{
                fontSize: 20,
                fontWeight: 520,
                letterSpacing: "0.12em",
                color: COLORS.ink3,
                textTransform: "uppercase",
              }}
            />
          </div>
        </div>

        <div style={{ width: GRID.gutter }} />

        <div style={{ flex: 1, position: "relative" }}>
          <VisualWindow
            src={staticFile(ASSET_PATHS.qr)}
            startFrame={20}
            durationFrames={40}
            style={{
              position: "absolute",
              left: 0,
              top: 60,
              width: rightW,
              height: 1080 - 240 - 120,
            }}
            rounding={0}
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
            05 / 05
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
