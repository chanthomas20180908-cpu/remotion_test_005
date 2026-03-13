import React, { useMemo } from "react";
import { AbsoluteFill, Img } from "remotion";
import { CANVAS } from "../constants";
import { interpolateExpoInOut } from "../utils/easings";
import { FlowParticles } from "./FlowParticles";
import { SubtleRipple } from "./SubtleRipple";

export type AmbientLayerProps = {
  localFrame: number;
  imageSrc: string;
};

export const AmbientLayer: React.FC<AmbientLayerProps> = ({
  localFrame,
  imageSrc,
}) => {
  const ken = interpolateExpoInOut(localFrame, [0, 120], [0, 1]);
  const scale = 1 + 0.05 * ken;
  const x = -12 + 24 * ken;

  const envOpacity = useMemo((): number => {
    // 横幅极窄：环境层只做“存在感”，不能抢
    return 0.22;
  }, []);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <AbsoluteFill
          style={{
            transform: `translateX(${x}px) scale(${scale})`,
            transformOrigin: "50% 50%",
            opacity: envOpacity,
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: CANVAS.w,
              height: CANVAS.h,
              objectFit: "cover",
              // 仅做轻微“压噪”与统一感，不使用大 blur
              filter: "saturate(0.9) contrast(0.95)",
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* 极弱粒子流动（不抢主图） */}
      <FlowParticles localFrame={localFrame} />

      {/* 极弱波纹（低频、低透明） */}
      <SubtleRipple localFrame={localFrame} />
    </AbsoluteFill>
  );
};
