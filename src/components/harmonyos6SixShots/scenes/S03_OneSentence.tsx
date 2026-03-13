import React, { type CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, ENTRY_BUFFER, TYPE } from "../constants";
import { power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLine, MaskedLines } from "../components/MaskedText";
import { ImageWindow } from "../components/ImageWindow";

import office from "../assets/images/S03_office_full.jpg";
import fun1 from "../assets/images/S03_ai_fun_1.png";
import fun2 from "../assets/images/S03_ai_fun_2.png";

export const S03OneSentence: React.FC = () => {
  const frame = useCurrentFrame();

  const titleStart = ENTRY_BUFFER + 0;
  const subStart = ENTRY_BUFFER + 20;
  const panelStart = ENTRY_BUFFER + 18;

  const left: CSSProperties = {
    gridColumn: "1 / span 5",
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
    fontSize: 96,
    fontWeight: 850,
    lineHeight: 1.06,
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

  const truck = interpolate(frame, [panelStart, panelStart + 90], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });

  const stackIn = interpolate(
    frame,
    [panelStart + 26, panelStart + 56],
    [24, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4Out,
    },
  );
  const stackOpacity = interpolate(
    frame,
    [panelStart + 20, panelStart + 44],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4Out,
    },
  );

  return (
    <SceneShell variant="light" gridAlign="center">
      <div style={left}>
        <MaskedLines
          lines={["一句话，", "就搞定"]}
          start={titleStart}
          lineDuration={34}
          lineStagger={12}
          offsetY={52}
          style={titleStyle}
        />
        <MaskedLine
          text="有事呼叫小艺：拆解任务，后台执行。"
          start={subStart}
          duration={24}
          offsetY={26}
          style={subStyle}
        />
      </div>

      <div style={right}>
        <div
          style={{
            width: 840,
            height: 520,
            transform: `translate3d(${truck}px, 0, 0)`,
          }}
        >
          <ImageWindow
            src={office}
            start={panelStart}
            duration={30}
            direction="from-right"
            style={{ width: "100%", height: "100%" }}
            imageStyle={{
              transform: "scale(1.04)",
              transformOrigin: "50% 48%",
            }}
          />
        </div>

        {/* 右侧小叠层：让“AI 了 AI 了”的趣味以小比例出现，避免喧宾夺主 */}
        <div
          style={{
            width: 220,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transform: `translate3d(0, ${stackIn}px, 0)`,
            opacity: stackOpacity,
          }}
        >
          <ImageWindow
            src={fun1}
            start={panelStart + 26}
            duration={26}
            direction="from-bottom"
            borderRadius={16}
            borderOpacity={0.55}
            style={{ width: 220, height: 260 }}
          />
          <ImageWindow
            src={fun2}
            start={panelStart + 34}
            duration={26}
            direction="from-bottom"
            borderRadius={16}
            borderOpacity={0.55}
            style={{ width: 220, height: 260 }}
          />
        </div>
      </div>
    </SceneShell>
  );
};
