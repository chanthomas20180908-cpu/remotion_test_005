import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "../components/Stage";
import { BRAND, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const TeamScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftIn = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 110, mass: 0.95 },
  });
  const rightIn = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 16, stiffness: 110, mass: 0.95 },
  });
  const statIn = interpolate(frame, [16, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage accent={BRAND.violet}>
      <AbsoluteFill style={{ padding: "78px 88px" }}>
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 140,
            width: 760,
            height: 680,
            borderRadius: 42,
            overflow: "hidden",
            boxShadow: BRAND.shadow,
            transform: `translateX(${-60 + leftIn * 60}px) rotate(-6deg)`,
            opacity: leftIn,
          }}
        >
          <Img
            src={MEDIA.teamPhoto}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 94,
            top: 94,
            width: 700,
            height: 430,
            borderRadius: 36,
            overflow: "hidden",
            boxShadow: BRAND.shadow,
            transform: `translateX(${60 - rightIn * 60}px) rotate(7deg)`,
            opacity: rightIn,
          }}
        >
          <Img
            src={MEDIA.awardPhoto}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 112,
            bottom: 104,
            width: 740,
            padding: "34px 38px",
            borderRadius: 34,
            background: BRAND.panelStrong,
            border: `1px solid ${BRAND.line}`,
            boxShadow: BRAND.shadow,
            backdropFilter: "blur(18px)",
            opacity: statIn,
            transform: `translateY(${30 - statIn * 30}px)`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            团队建设与荣誉认可
          </div>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 34,
              alignItems: "baseline",
              color: BRAND.text,
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 800, letterSpacing: -5 }}>
              24
            </span>
            <span style={{ fontSize: 44, fontWeight: 700 }}>60%+ 研发占比</span>
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 32,
              lineHeight: 1.35,
              color: BRAND.muted,
            }}
          >
            资深引领 + 新锐攻坚
            <br />
            国家级、市级奖项持续加身
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
