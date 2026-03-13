import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../constants";
import { power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLines } from "../components/MaskedText";

import introIcon from "../assets/icons/introduction-icon.svg";

export const S01Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const iconIn = interpolate(frame, [16, 44], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const iconOpacity = interpolate(frame, [16, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const left: CSSProperties = {
    gridColumn: "1 / span 7",
    display: "flex",
    flexDirection: "column",
    gap: 22,
    alignSelf: "center",
  };

  const right: CSSProperties = {
    gridColumn: "8 / span 5",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  };

  const eyebrow: CSSProperties = {
    color: COLORS.light.textTertiary,
    fontSize: 18,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 650,
  };

  const titleStyle: CSSProperties = {
    fontSize: TYPE.display.fontSize,
    fontWeight: TYPE.display.fontWeight as number,
    lineHeight: TYPE.display.lineHeight,
    color: COLORS.light.textPrimary,
    letterSpacing: "-0.02em",
  };

  const subStyle: CSSProperties = {
    fontSize: TYPE.sub.fontSize,
    fontWeight: TYPE.sub.fontWeight as number,
    lineHeight: TYPE.sub.lineHeight,
    letterSpacing: TYPE.sub.letterSpacing,
    color: COLORS.light.textSecondary,
    maxWidth: 520,
  };

  return (
    <SceneShell variant="light" gridAlign="center">
      <div style={left}>
        <div style={eyebrow}>HarmonyOS</div>
        {/* 为什么：一上来就极端字号对比，建立“发布会级”秩序 */}
        <MaskedLines
          lines={["HarmonyOS 6", "就此不同"]}
          start={10}
          lineDuration={36}
          lineStagger={14}
          offsetY={52}
          style={titleStyle}
        />

        <MaskedLines
          lines={[
            "新视觉，更惊艳｜更智能，更便捷",
            "隐私安全坚实可靠｜流畅体验丝滑愉悦",
          ]}
          start={38}
          lineDuration={26}
          lineStagger={10}
          offsetY={28}
          style={subStyle}
        />
      </div>

      <div style={right}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 16,
            transform: `translate3d(0, ${iconIn}px, 0)`,
            opacity: iconOpacity,
          }}
        >
          <Img
            src={introIcon}
            style={{ width: 42, height: 42, opacity: 0.95 }}
          />
          <div
            style={{
              width: 260,
              height: 1.5,
              background: `linear-gradient(90deg, rgba(58,183,255,0), rgba(58,183,255,0.65), rgba(85,230,213,0.35))`,
            }}
          />
        </div>
      </div>
    </SceneShell>
  );
};
