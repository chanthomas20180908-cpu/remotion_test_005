import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { COLORS, ENTRY_BUFFER, TYPE } from "../constants";
import { power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLine } from "../components/MaskedText";

import fluentBg from "../assets/images/S05_fluent_bg.jpg";
import fluentIcon from "../assets/icons/fluent-up-icon.svg";

export const S05Fluent: React.FC = () => {
  const frame = useCurrentFrame();

  const metric1Start = ENTRY_BUFFER + 0;
  const metric2Start = ENTRY_BUFFER + 34;
  const labelStart = ENTRY_BUFFER + 18;

  const kb = interpolate(frame, [ENTRY_BUFFER, ENTRY_BUFFER + 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const bgScale = 1.02 + 0.04 * kb;
  const bgX = -24 * kb;

  const m1Y = interpolate(frame, [metric1Start, metric1Start + 26], [56, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const m1A = interpolate(frame, [metric1Start, metric1Start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const m2X = interpolate(frame, [metric2Start, metric2Start + 26], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const m2A = interpolate(frame, [metric2Start, metric2Start + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const left: CSSProperties = {
    gridColumn: "1 / span 12",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    columnGap: 28,
    alignItems: "center",
  };

  return (
    <SceneShell variant="light" gridAlign="center">
      <div style={left}>
        <div
          style={{
            gridColumn: "1 / span 12",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            overflow: "hidden",
            borderRadius: 0,
          }}
        >
          <Img
            src={fluentBg}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `translate3d(${bgX}px, 0, 0) scale(${bgScale})`,
              transformOrigin: "50% 50%",
              filter: "saturate(1.05)",
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(246,248,252,0.92), rgba(246,248,252,0.76) 55%, rgba(246,248,252,0.88))",
            }}
          />
        </div>

        {/* 说明（极小） */}
        <div style={{ gridColumn: "1 / span 5", position: "relative" }}>
          <MaskedLine
            text="丝滑流畅，玩得真 6"
            start={labelStart}
            duration={22}
            offsetY={22}
            style={{
              fontSize: TYPE.sub.fontSize,
              letterSpacing: TYPE.sub.letterSpacing,
              fontWeight: 650,
              color: COLORS.light.textSecondary,
            }}
          />
        </div>

        {/* 大数据（纵深） */}
        <div
          style={{
            gridColumn: "1 / span 7",
            marginTop: 40,
            position: "relative",
            transform: `translate3d(0, ${m1Y}px, 0)`,
            opacity: m1A,
          }}
        >
          <div
            style={{
              fontSize: 172,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: COLORS.light.textPrimary,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            15%
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 8,
            }}
          >
            <Img
              src={fluentIcon}
              style={{ width: 18, height: 18, opacity: 0.9 }}
            />
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.12em",
                color: COLORS.light.textTertiary,
              }}
            >
              多设备流畅度提高
            </div>
          </div>
        </div>

        <div
          style={{
            gridColumn: "8 / span 5",
            justifySelf: "end",
            alignSelf: "end",
            position: "relative",
            transform: `translate3d(${m2X}px, 0, 0)`,
            opacity: m2A,
          }}
        >
          <div
            style={{
              fontSize: 176,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: COLORS.accent.cyan,
              fontVariantNumeric: "tabular-nums",
              textAlign: "right",
            }}
          >
            40%
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.12em",
              color: COLORS.light.textTertiary,
              textAlign: "right",
            }}
          >
            对比更早版本提升
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
