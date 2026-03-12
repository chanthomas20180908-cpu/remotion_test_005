import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Stage } from "../components/Stage";
import { BRAND, CAPABILITIES, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const CapabilityScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const screenIn = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 100, mass: 1 },
  });

  return (
    <Stage accent={BRAND.cyan}>
      <AbsoluteFill style={{ padding: "84px 90px" }}>
        <div
          style={{
            position: "absolute",
            top: 154,
            left: 760,
            width: 1000,
            height: 620,
            transform: `perspective(1600px) rotateY(-18deg) rotateX(5deg) scale(${0.9 + screenIn * 0.1})`,
            transformOrigin: "left center",
            borderRadius: 40,
            overflow: "hidden",
            border: `1px solid ${BRAND.line}`,
            boxShadow: BRAND.shadow,
            opacity: screenIn,
          }}
        >
          <Img
            src={MEDIA.productScreen}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(9,17,31,0.3) 0%, rgba(9,17,31,0.02) 60%, rgba(255,255,255,0.2) 100%)",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, width: 840 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            能力不是列表，是整条生产链
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            从生成
            <br />
            到交付闭环
          </div>
        </div>

        {CAPABILITIES.map((item, index) => {
          const itemIn = spring({
            fps,
            frame: Math.max(0, frame - 8 - index * 7),
            config: { damping: 15, stiffness: 130, mass: 0.9 },
          });
          const offsetX = index % 2 === 0 ? -180 : 220;
          const top = 410 + index * 96;

          return (
            <div
              key={item}
              style={{
                position: "absolute",
                top,
                left: 110 + index * 36,
                padding: "18px 28px",
                borderRadius: 24,
                background: BRAND.panelStrong,
                border: `1px solid ${BRAND.line}`,
                boxShadow: BRAND.shadow,
                fontSize: 34,
                fontWeight: 700,
                color: BRAND.text,
                letterSpacing: -0.5,
                transform: `translateX(${offsetX - itemIn * offsetX}px) skewX(-14deg)`,
                opacity: itemIn,
              }}
            >
              <span style={{ display: "block", transform: "skewX(14deg)" }}>
                {item}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </Stage>
  );
};
