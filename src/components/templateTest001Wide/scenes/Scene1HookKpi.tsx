import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundWash } from "../components/BackgroundWash";
import { getLayout } from "../components/layout";
import { MaskedTextReveal } from "../components/MaskedTextReveal";
import { OdometerNumber } from "../components/OdometerNumber";
import { COLORS, FONT } from "../components/tokens";
import { easePower4Out } from "../components/easing";

export type Scene1HookKpiProps = {
  startFrame: number;
};

export const Scene1HookKpi: React.FC<Scene1HookKpiProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - startFrame;
  const layout = getLayout(width, height);

  // 右侧“切刀”母题：在退出前 18f 轻微向左压迫
  const cutterShiftP = interpolate(local, [72, 89], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easePower4Out,
  });
  const cutterX =
    layout.rightX -
    interpolate(cutterShiftP, [0, 1], [0, 24], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill>
      <BackgroundWash startFrame={startFrame} durationInFrames={90} />

      <div
        style={{
          position: "absolute",
          left: layout.safeX,
          top: layout.safeY,
          right: layout.safeX,
          bottom: layout.safeY,
          display: "flex",
          alignItems: "stretch",
          gap: layout.gutter,
          fontFamily: FONT.sans,
        }}
      >
        {/* Left 40% */}
        <div
          style={{
            width: layout.leftW,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: Math.round(layout.col * 0.4),
          }}
        >
          <MaskedTextReveal
            startFrame={0}
            duration={16}
            yFrom={48}
            style={{
              fontSize: 126,
              fontWeight: 760,
              letterSpacing: -0.02,
              lineHeight: 0.98,
              color: COLORS.text,
            }}
          >
            本月访问量
          </MaskedTextReveal>

          <div style={{ height: 22 }} />

          <MaskedTextReveal
            startFrame={18}
            duration={14}
            yFrom={28}
            style={{
              fontSize: 18,
              fontWeight: 560,
              letterSpacing: 0.12 + "em",
              textTransform: "uppercase",
              color: COLORS.text2,
            }}
          >
            数据统计 · 近 30 天
          </MaskedTextReveal>
        </div>

        {/* Right 60% */}
        <div
          style={{
            width: layout.rightW,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: COLORS.card,
              borderRadius: 18,
              border: `1.5px solid ${COLORS.line}`,
              boxShadow: "0 18px 50px rgba(11, 18, 32, 0.06)",
              padding: "46px 46px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 650,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: COLORS.text3,
              }}
            >
              TOTAL VISITS
            </div>

            <div style={{ height: 18 }} />

            <OdometerNumber
              startFrame={36}
              duration={36}
              from={123_767_286}
              to={130_733_672}
              formatLocale="zh-CN"
              style={{
                fontSize: 96,
                fontWeight: 820,
                color: COLORS.text,
                letterSpacing: -0.02,
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            />
          </div>
        </div>
      </div>

      {/* 母题切刀（越界继承用）：放在全局坐标系，允许越界压迫 */}
      <div
        style={{
          position: "absolute",
          left: cutterX,
          top: layout.safeY,
          width: 2,
          height: height - layout.safeY * 2,
          backgroundColor: COLORS.line,
          opacity: 0.95,
          zIndex: 20,
        }}
      />
    </AbsoluteFill>
  );
};
