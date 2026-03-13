import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { COLORS, ENTRY_BUFFER, TYPE } from "../constants";
import { power4Out } from "../easings";
import { SceneShell } from "../components/SceneShell";
import { MaskedLine, MaskedLines } from "../components/MaskedText";
import { ImageWindow } from "../components/ImageWindow";

import lightSense from "../assets/images/S02_light_sense.jpg";
import signatureLock from "../assets/images/S02_signature_lock.png";

export const S02LightSense: React.FC = () => {
  const frame = useCurrentFrame();

  const titleStart = ENTRY_BUFFER + 0;
  const subStart = ENTRY_BUFFER + 26;
  const heroImgStart = ENTRY_BUFFER + 10;

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
    lineHeight: 1.04,
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

  // 右侧大图永远在动：更像镜头而不是 PPT
  const kb = interpolate(frame, [heroImgStart, heroImgStart + 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
  const heroScale = 1.02 + 0.04 * kb;
  const heroX = -18 * kb;
  const heroY = 10 * kb;

  const heroImgStyle: CSSProperties = {
    width: 920,
    height: 560,
  };

  const cameoIn = interpolate(
    frame,
    [heroImgStart + 24, heroImgStart + 54],
    [26, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: power4Out,
    },
  );
  const cameoOpacity = interpolate(
    frame,
    [heroImgStart + 20, heroImgStart + 44],
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
          lines={["看它，", "满屏都是戏"]}
          start={titleStart}
          lineDuration={34}
          lineStagger={12}
          offsetY={54}
          style={titleStyle}
        />
        <MaskedLine
          text="智慧光感如同流光，在界面中温暖流淌。"
          start={subStart}
          duration={26}
          offsetY={28}
          style={subStyle}
        />
      </div>

      <div style={right}>
        <ImageWindow
          src={lightSense}
          start={heroImgStart}
          duration={32}
          direction="from-right"
          style={heroImgStyle}
          imageStyle={{
            transform: `translate3d(${heroX}px, ${heroY}px, 0) scale(${heroScale})`,
            transformOrigin: "50% 50%",
          }}
        />

        {/* 小窗：把“签名锁屏”当成第二视觉层，形成杂志式层级 */}
        <div
          style={{
            width: 260,
            height: 390,
            transform: `translate3d(0, ${cameoIn}px, 0)`,
            opacity: cameoOpacity,
            alignSelf: "flex-end",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 18,
              overflow: "hidden",
              border: "1.5px solid rgba(215,224,236,0.85)",
              backgroundColor: "rgba(255,255,255,0.7)",
            }}
          >
            <Img
              src={signatureLock}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
