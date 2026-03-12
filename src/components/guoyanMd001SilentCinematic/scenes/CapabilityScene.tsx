import type { FC } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { BRAND, CAPABILITY_ITEMS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const CapabilityScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const orbit = interpolate(frame, [0, 150], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const coreScale = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 110, mass: 0.8 },
  });

  return (
    <Backdrop accent={BRAND.cyan}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 1300, height: 760 }}>
          <div
            style={{
              position: "absolute",
              inset: 140,
              borderRadius: 9999,
              border: `1px solid ${BRAND.line}`,
              transform: `rotate(${orbit}deg)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 60,
              borderRadius: 9999,
              border: `1px solid ${BRAND.line}`,
              transform: `rotate(${-orbit * 0.6}deg)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 360,
              height: 360,
              marginLeft: -180,
              marginTop: -180,
              borderRadius: 180,
              background:
                "linear-gradient(135deg, rgba(47,107,255,0.98), rgba(99,211,255,0.92))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#ffffff",
              fontSize: 70,
              lineHeight: 1.1,
              fontWeight: 700,
              transform: `scale(${0.86 + coreScale * 0.14})`,
              boxShadow: "0 45px 120px rgba(47, 107, 255, 0.28)",
            }}
          >
            研究
            <br />
            ×
            <br />
            平台
          </div>

          {CAPABILITY_ITEMS.map((item, index) => {
            const angle =
              (Math.PI * 2 * index) / CAPABILITY_ITEMS.length - Math.PI / 2;
            const radiusX = 480;
            const radiusY = 250;
            const x = Math.cos(angle) * radiusX;
            const y = Math.sin(angle) * radiusY;
            const delay = index * 7;
            const opacity = interpolate(
              frame,
              [delay + 10, delay + 24],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <div
                key={item}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 320,
                  marginLeft: -160 + x,
                  marginTop: -70 + y,
                  padding: "26px 30px",
                  borderRadius: 28,
                  background: "rgba(255,255,255,0.88)",
                  border: `1px solid ${BRAND.line}`,
                  boxShadow: BRAND.shadow,
                  opacity,
                  transform: `translateY(${20 - opacity * 20}px) rotate(${orbit * 0.04}deg)`,
                }}
              >
                <div style={{ fontSize: 20, color: BRAND.blue }}>核心业务</div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 34,
                    lineHeight: 1.2,
                    fontWeight: 700,
                    color: BRAND.text,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
