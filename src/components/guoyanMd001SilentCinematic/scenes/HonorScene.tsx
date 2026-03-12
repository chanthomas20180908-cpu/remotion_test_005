import type { FC } from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { GlassCard } from "../components/GlassCard";
import { BRAND, MEDIA } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const HonorScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();

  return (
    <Backdrop accent={BRAND.cyan}>
      <AbsoluteFill style={{ padding: "84px 92px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            height: "100%",
          }}
        >
          {[MEDIA.awardPhoto, MEDIA.universityMeeting].map((src, index) => {
            const delay = index * 12;
            const opacity = interpolate(
              frame,
              [delay + 8, delay + 26],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
            const rotate = index === 0 ? -4 : 4;

            return (
              <GlassCard
                key={src}
                style={{
                  padding: 18,
                  opacity,
                  transform: `translateY(${22 - opacity * 22}px) rotate(${rotate * (1 - opacity)}deg)`,
                }}
              >
                <Img
                  src={src}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 26,
                  }}
                />
              </GlassCard>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            left: 120,
            bottom: 88,
            width: 980,
            padding: "30px 34px",
            borderRadius: 30,
            background: "rgba(255,255,255,0.92)",
            boxShadow: BRAND.shadow,
          }}
        >
          <div style={{ fontSize: 24, color: BRAND.blue }}>荣誉与社会责任</div>
          <div
            style={{
              marginTop: 12,
              fontSize: 54,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: BRAND.text,
              fontWeight: 700,
            }}
          >
            实力铸就口碑，
            <br />
            初心延伸到产学研协同。
          </div>
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
