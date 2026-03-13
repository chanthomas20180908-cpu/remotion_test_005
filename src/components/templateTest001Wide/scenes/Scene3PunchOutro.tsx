import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundWash } from "../components/BackgroundWash";
import { getLayout } from "../components/layout";
import { COLORS, FONT } from "../components/tokens";
import { MaskedTextReveal } from "../components/MaskedTextReveal";
import { easeExpoInOut, easePower4Out } from "../components/easing";

export type Scene3PunchOutroProps = {
  startFrame: number;
};

export const Scene3PunchOutro: React.FC<Scene3PunchOutroProps> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const local = frame - startFrame;
  const layout = useMemo(() => getLayout(width, height), [width, height]);

  // 落地缓冲（0-17）：把“过近的数字”拉回到稳定构图
  const landP = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeExpoInOut,
  });
  const numberScale = interpolate(landP, [0, 1], [2.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numberX = interpolate(landP, [0, 1], [240, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numberY = interpolate(landP, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 结尾真空（75-89）：弱化次要信息
  const vacuumP = interpolate(local, [75, 89], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easePower4Out,
  });
  const subOpacity = interpolate(vacuumP, [0, 1], [1, 0.28], {
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
            opacity: subOpacity,
          }}
        >
          <MaskedTextReveal
            startFrame={18}
            duration={14}
            yFrom={28}
            style={{
              fontSize: 18,
              fontWeight: 650,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.text2,
            }}
          >
            数据已更新
          </MaskedTextReveal>

          <div style={{ height: 14 }} />

          <MaskedTextReveal
            startFrame={22}
            duration={14}
            yFrom={28}
            style={{
              fontSize: 18,
              fontWeight: 650,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.text2,
            }}
          >
            统计口径：全渠道
          </MaskedTextReveal>
        </div>

        {/* Right 60%: 大数字收束 */}
        <div
          style={{
            width: layout.rightW,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              transform: `translate3d(${numberX}px, ${numberY}px, 0) scale(${numberScale})`,
              transformOrigin: "left center",
            }}
          >
            <div
              style={{
                fontSize: 132,
                fontWeight: 860,
                letterSpacing: -0.02,
                lineHeight: 1,
                color: COLORS.text,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              130,733,672
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
