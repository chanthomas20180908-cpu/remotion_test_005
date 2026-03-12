import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GlassPanel } from "../components/GlassPanel";
import { HERO_LINES, BRAND, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const HeroScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 开场用推轨+擦光建立“导演版”语气，而不是平铺式标题页。
  const titleIn = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 112, mass: 0.95 },
  });
  const screenIn = spring({
    fps,
    frame: Math.max(0, frame - 8),
    config: { damping: 14, stiffness: 96, mass: 1.05 },
  });
  const imageScale = interpolate(frame, [0, 120], [1.2, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sweepX = interpolate(frame, [0, 68], [-340, 1660], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Backdrop accent={BRAND.blue}>
      <AbsoluteFill style={{ padding: "88px 92px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
          }}
        >
          <Img
            src={MEDIA.neuralFlow}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${1.06 + (1 - titleIn) * 0.06})`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 84,
            right: 72,
            width: 980,
            height: 820,
            borderRadius: 48,
            overflow: "hidden",
            transform: `perspective(2200px) rotateY(-18deg) rotateX(8deg) translateX(${64 - screenIn * 64}px) scale(${0.92 + screenIn * 0.08})`,
            transformOrigin: "left center",
            boxShadow: BRAND.shadow,
            border: `1px solid ${BRAND.line}`,
            opacity: screenIn,
          }}
        >
          <Img
            src={MEDIA.productScreen}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imageScale}) translateX(${20 - screenIn * 20}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(130deg, rgba(8,16,29,0.26) 0%, rgba(8,16,29,0.02) 34%, rgba(255,255,255,0.34) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: sweepX,
            width: 240,
            height: "100%",
            transform: "skewX(-18deg)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 50%, rgba(255,255,255,0) 100%)",
            opacity: 0.64,
            filter: "blur(3px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 3, width: 930 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "12px 22px",
              borderRadius: 9999,
              background: "rgba(40, 100, 255, 0.1)",
              color: BRAND.blue,
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1.2,
              opacity: interpolate(frame, [0, 16], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            DIRECTOR CUT / SILENT PROMO
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
                  marginTop: index === 0 ? 30 : 12,
                  fontSize: index === 0 ? 152 : 118,
                  lineHeight: 0.92,
                  letterSpacing: -7,
                  fontWeight: 800,
                  color: BRAND.text,
                  transform: `translateY(${44 - lineIn * 44}px) scale(${0.95 + lineIn * 0.05})`,
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
              fontSize: 40,
              lineHeight: 1.3,
              color: BRAND.muted,
              transform: `translateY(${28 - titleIn * 28}px)`,
              opacity: titleIn,
            }}
          >
            从技术突破、标杆项目到团队成长，
            <br />
            把年度回顾拍成一支真正有镜头语言的品牌片。
          </div>
        </div>

        <GlassPanel
          style={{
            position: "absolute",
            left: 92,
            bottom: 92,
            width: 500,
            padding: "28px 32px",
            borderRadius: 32,
            transform: `translateY(${26 - screenIn * 26}px)`,
            opacity: screenIn,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: BRAND.blue,
              letterSpacing: 1,
            }}
          >
            OPENING HOOK
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 46,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -2,
              color: BRAND.text,
            }}
          >
            不是 PPT 汇报
            <br />是 AI 影像的年度宣言
          </div>
        </GlassPanel>
      </AbsoluteFill>
    </Backdrop>
  );
};
