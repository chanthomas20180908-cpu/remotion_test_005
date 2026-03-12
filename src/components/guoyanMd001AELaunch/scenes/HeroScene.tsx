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
import { BRAND, HERO_LINES, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const HeroScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 开场用推镜头建立“不是 PPT，而是品牌影片”的第一印象。
  const titleIn = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 110, mass: 0.95 },
  });
  const panelIn = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const imageScale = interpolate(frame, [0, 120], [1.18, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const streakX = interpolate(frame, [0, 72], [-320, 1460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage accent={BRAND.blue}>
      <AbsoluteFill style={{ padding: "88px 96px" }}>
        <div
          style={{
            position: "absolute",
            top: 116,
            right: 80,
            width: 920,
            height: 760,
            borderRadius: 44,
            overflow: "hidden",
            border: `1px solid ${BRAND.line}`,
            boxShadow: BRAND.shadow,
            transform: `translateX(${40 - panelIn * 40}px) scale(${0.92 + panelIn * 0.08})`,
            opacity: panelIn,
          }}
        >
          <Img
            src={MEDIA.productScreen}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imageScale}) translateX(${24 - panelIn * 24}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(140deg, rgba(9,17,31,0.08) 0%, rgba(9,17,31,0) 34%, rgba(255,255,255,0.34) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: streakX,
            width: 220,
            height: "100%",
            transform: "skewX(-18deg)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.68) 50%, rgba(255,255,255,0) 100%)",
            opacity: 0.72,
            filter: "blur(2px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: 980,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                padding: "12px 22px",
                borderRadius: 9999,
                background: "rgba(47, 107, 255, 0.1)",
                color: BRAND.blue,
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 1,
                opacity: interpolate(frame, [0, 16], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              2025 DIRECTOR'S CUT
            </div>
            {HERO_LINES.map((line, index) => {
              const lineIn = spring({
                fps,
                frame: Math.max(0, frame - index * 7),
                config: { damping: 16, stiffness: 120, mass: 0.9 },
              });

              return (
                <div
                  key={line}
                  style={{
                    marginTop: index === 0 ? 28 : 10,
                    fontSize: index === 0 ? 150 : 132,
                    lineHeight: 0.96,
                    letterSpacing: -7,
                    fontWeight: 800,
                    color: BRAND.text,
                    transform: `translateY(${48 - lineIn * 48}px) scale(${0.94 + lineIn * 0.06})`,
                    opacity: lineIn,
                  }}
                >
                  {line}
                </div>
              );
            })}
            <div
              style={{
                marginTop: 28,
                fontSize: 42,
                lineHeight: 1.3,
                color: BRAND.muted,
                transform: `translateY(${26 - titleIn * 26}px)`,
                opacity: titleIn,
              }}
            >
              共赴新征程
              <br />用 AI 重构视频创作的镜头语法
            </div>
          </div>

          <div
            style={{
              width: 420,
              padding: "26px 30px",
              borderRadius: 34,
              background: BRAND.panel,
              backdropFilter: "blur(20px)",
              border: `1px solid ${BRAND.line}`,
              boxShadow: BRAND.shadow,
              transform: `translateY(${30 - panelIn * 30}px)`,
              opacity: panelIn,
            }}
          >
            <div
              style={{
                fontSize: 20,
                letterSpacing: 1,
                color: BRAND.blue,
                fontWeight: 700,
              }}
            >
              OPENING HOOK
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.1,
                color: BRAND.text,
              }}
            >
              不是内容堆叠
              <br />
              是创作链重写
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
