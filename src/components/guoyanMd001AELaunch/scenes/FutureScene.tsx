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
import { BRAND, FUTURE_LINES, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const FutureScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });
  const qrIn = spring({
    fps,
    frame: Math.max(0, frame - 8),
    config: { damping: 15, stiffness: 95, mass: 1 },
  });
  const scanY = interpolate(frame, [18, 132], [-120, 900], {
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
            right: 120,
            width: 520,
            height: 520,
            borderRadius: 40,
            background: BRAND.panelStrong,
            border: `1px solid ${BRAND.line}`,
            boxShadow: BRAND.shadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `translateX(${50 - qrIn * 50}px) scale(${0.9 + qrIn * 0.1})`,
            opacity: qrIn,
          }}
        >
          <Img
            src={MEDIA.qrCode}
            style={{
              width: 420,
              height: 420,
              objectFit: "cover",
              borderRadius: 24,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 42,
              right: 42,
              top: scanY,
              height: 72,
              background:
                "linear-gradient(180deg, rgba(113,215,255,0) 0%, rgba(113,215,255,0.36) 50%, rgba(113,215,255,0) 100%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2, width: 960 }}>
          <div
            style={{
              fontSize: 24,
              color: BRAND.blue,
              fontWeight: 700,
              letterSpacing: 1.2,
            }}
          >
            下一幕已经开始
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 118,
              lineHeight: 0.94,
              letterSpacing: -6,
              fontWeight: 800,
              color: BRAND.text,
              opacity: titleIn,
              transform: `translateY(${42 - titleIn * 42}px)`,
            }}
          >
            2026
            <br />
            更大规模落地
          </div>
          <div
            style={{
              marginTop: 26,
              display: "grid",
              gap: 16,
              width: 760,
            }}
          >
            {FUTURE_LINES.map((line, index) => {
              const lineIn = interpolate(
                frame,
                [14 + index * 7, 36 + index * 7],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );

              return (
                <div
                  key={line}
                  style={{
                    padding: "18px 24px",
                    borderRadius: 22,
                    background: BRAND.panel,
                    border: `1px solid ${BRAND.line}`,
                    fontSize: 34,
                    color: BRAND.muted,
                    transform: `translateX(${-28 + lineIn * 28}px)`,
                    opacity: lineIn,
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 36,
              lineHeight: 1.4,
              color: BRAND.text,
              fontWeight: 700,
            }}
          >
            国研能汇（北京）技术有限公司
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
