import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { COLORS, ENTRY_BUFFER, TYPE } from "../constants";
import { power4InOut, power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLine, MaskedLines } from "../components/MaskedText";

import antiScam from "../assets/images/S04_anti_scam_full.jpg";

export const S04Security: React.FC = () => {
  const frame = useCurrentFrame();

  const titleStart = ENTRY_BUFFER + 0;
  const subStart = ENTRY_BUFFER + 26;
  const phoneStart = ENTRY_BUFFER + 34;

  const left: CSSProperties = {
    gridColumn: "1 / span 5",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    alignSelf: "center",
  };

  const right: CSSProperties = {
    gridColumn: "6 / span 7",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
  };

  const titleStyle: CSSProperties = {
    fontSize: 104,
    fontWeight: 850,
    lineHeight: 1.03,
    color: COLORS.dark.textPrimary,
    letterSpacing: "-0.02em",
  };

  const subStyle: CSSProperties = {
    fontSize: TYPE.sub.fontSize,
    fontWeight: TYPE.sub.fontWeight as number,
    lineHeight: TYPE.sub.lineHeight,
    letterSpacing: TYPE.sub.letterSpacing,
    color: COLORS.dark.textSecondary,
    maxWidth: 520,
  };

  // 盾形描边：用“规则边界”表达权限与安全，避免廉价特效
  const shieldP = interpolate(
    frame,
    [ENTRY_BUFFER + 6, ENTRY_BUFFER + 52],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4InOut,
    },
  );
  const dash = 1200;
  const dashOffset = dash * (1 - shieldP);

  const phoneY = interpolate(frame, [phoneStart, phoneStart + 30], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const phoneOpacity = interpolate(
    frame,
    [phoneStart, phoneStart + 18],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4Out,
    },
  );

  return (
    <SceneShell variant="dark" gridAlign="center">
      <div style={left}>
        <MaskedLines
          lines={["由你掌控"]}
          start={titleStart}
          lineDuration={38}
          lineStagger={10}
          offsetY={50}
          style={titleStyle}
        />
        <MaskedLine
          text="隐私安全坚实可靠，访问只取你所选。"
          start={subStart}
          duration={26}
          offsetY={26}
          style={subStyle}
        />
      </div>

      <div style={right}>
        <div style={{ width: 640, height: 520, position: "relative" }}>
          <svg
            width={640}
            height={520}
            viewBox="0 0 640 520"
            style={{ position: "absolute", inset: 0, opacity: 0.9 }}
          >
            <path
              d="M320 38 C 408 78 476 92 556 102 L556 250 C556 360 480 446 320 492 C160 446 84 360 84 250 L84 102 C164 92 232 78 320 38 Z"
              fill="none"
              stroke="rgba(58,183,255,0.55)"
              strokeWidth={2.2}
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
              strokeLinejoin="round"
            />
            <path
              d="M320 68 C 398 102 462 114 532 124 L532 250 C532 342 468 410 320 456 C172 410 108 342 108 250 L108 124 C178 114 242 102 320 68 Z"
              fill="none"
              stroke="rgba(85,230,213,0.28)"
              strokeWidth={1.4}
              strokeDasharray={dash}
              strokeDashoffset={dashOffset * 1.04}
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              right: 26,
              top: 62,
              width: 260,
              height: 396,
              transform: `translate3d(0, ${phoneY}px, 0)`,
              opacity: phoneOpacity,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 26,
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1.5px solid rgba(215,224,236,0.12)",
              }}
            >
              <Img
                src={antiScam}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* 规则边界线：表达“权限边界”，同时为 Punch-through 提前铺形 */}
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 340,
              width: 280,
              height: 1.5,
              background:
                "linear-gradient(90deg, rgba(58,183,255,0.0), rgba(58,183,255,0.55), rgba(85,230,213,0.0))",
              opacity: 0.65,
            }}
          />
        </div>
      </div>
    </SceneShell>
  );
};
