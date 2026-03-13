import React, { type CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, ENTRY_BUFFER, TYPE } from "../constants";
import { power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLine, MaskedLines } from "../components/MaskedText";
import { ImageWindow } from "../components/ImageWindow";

import betaPlan from "../assets/images/S06_beta_plan_full.jpg";

export const S06Closer: React.FC = () => {
  const frame = useCurrentFrame();

  const copyStart = ENTRY_BUFFER + 0;
  const imgStart = ENTRY_BUFFER + 16;
  const vacuumStart = 104;
  const ctaStart = 120;

  const splitIn = interpolate(
    frame,
    [ENTRY_BUFFER, ENTRY_BUFFER + 26],
    [18, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4Out,
    },
  );
  const splitA = interpolate(frame, [ENTRY_BUFFER, ENTRY_BUFFER + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const vacuum = interpolate(frame, [vacuumStart, vacuumStart + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const splitOpacity = 1 - 0.92 * vacuum;
  const splitBlur = 10 * vacuum;

  const titleStyle: CSSProperties = {
    fontSize: 96,
    fontWeight: 850,
    lineHeight: 1.05,
    color: COLORS.light.textPrimary,
    letterSpacing: "-0.02em",
  };
  const subStyle: CSSProperties = {
    fontSize: TYPE.sub.fontSize,
    fontWeight: TYPE.sub.fontWeight as number,
    lineHeight: TYPE.sub.lineHeight,
    letterSpacing: TYPE.sub.letterSpacing,
    color: COLORS.light.textSecondary,
  };

  return (
    <SceneShell variant="light" gridAlign="center">
      <div
        style={{
          gridColumn: "1 / span 12",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: 28,
          alignItems: "center",
          transform: `translate3d(0, ${splitIn}px, 0)`,
          opacity: splitA,
          filter: `blur(${splitBlur}px)`,
        }}
      >
        <div
          style={{
            gridColumn: "1 / span 5",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <MaskedLines
            lines={["碰到哪，", "素材就去哪"]}
            start={copyStart}
            lineDuration={34}
            lineStagger={12}
            offsetY={52}
            style={titleStyle}
          />
          <MaskedLine
            text="跨设备流转，边界感更少，效率感更多。"
            start={copyStart + 20}
            duration={24}
            offsetY={22}
            style={subStyle}
          />
        </div>

        <div
          style={{
            gridColumn: "6 / span 7",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ImageWindow
            src={betaPlan}
            start={imgStart}
            duration={28}
            direction="from-right"
            borderRadius={0}
            style={{ width: 980, height: 560 }}
            imageStyle={{
              transform: "scale(1.02)",
              transformOrigin: "50% 52%",
            }}
          />
        </div>
      </div>

      {/* Visual vacuum：逐步抽空，只留 CTA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(246,248,252,1)",
          opacity: 0.92 * vacuum,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: vacuum,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "32%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "left", width: 1200 }}>
            <MaskedLines
              lines={["6 到了，", "就等你了"]}
              start={ctaStart}
              lineDuration={36}
              lineStagger={12}
              offsetY={60}
              style={{
                fontSize: 132,
                fontWeight: 900,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: COLORS.light.textPrimary,
              }}
            />
            <div style={{ height: 14 }} />
            <MaskedLine
              text="HarmonyOS 6"
              start={ctaStart + 10}
              duration={20}
              offsetY={18}
              style={{
                fontSize: 20,
                letterSpacing: "0.14em",
                color: COLORS.light.textTertiary,
                fontWeight: 700,
              }}
            />
          </div>
        </div>
      </div>

      {/* splitOpacity 用于保持上方分栏在 vacuum 前可见，vacuum 后由遮罩接管 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: splitOpacity,
          pointerEvents: "none",
        }}
      />
    </SceneShell>
  );
};
