import type { FC } from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { MetricBadge } from "../components/MetricBadge";
import { BRAND, MEDIA, TEAM_METRICS } from "../constants";

type SceneProps = {
  durationInFrames: number;
};

export const TeamScene: FC<SceneProps> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const heroIn = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 98, mass: 1 },
  });

  return (
    <Backdrop accent={BRAND.cyan}>
      <AbsoluteFill style={{ padding: "84px 88px" }}>
        <div
          style={{
            position: "absolute",
            left: 88,
            top: 118,
            width: 760,
            height: 760,
            borderRadius: 44,
            overflow: "hidden",
            boxShadow: BRAND.shadow,
            border: `1px solid ${BRAND.line}`,
            transform: `translateY(${36 - heroIn * 36}px) scale(${0.94 + heroIn * 0.06})`,
            opacity: heroIn,
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
            right: 96,
            top: 88,
            width: 770,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 24,
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
              fontSize: 104,
              lineHeight: 0.94,
              letterSpacing: -5,
              fontWeight: 800,
              color: BRAND.text,
            }}
          >
            人才梯队
            <br />
            托起增长曲线
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              lineHeight: 1.34,
              color: BRAND.muted,
            }}
          >
            资深研发引领，新锐力量攻坚，产学研协同推进，
            <br />
            让技术壁垒和组织能力同步成长。
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 104,
            top: 442,
            display: "flex",
            gap: 18,
          }}
        >
          {TEAM_METRICS.map((metric, index) => {
            const badgeIn = spring({
              fps,
              frame: Math.max(0, frame - index * 6),
              config: { damping: 16, stiffness: 110, mass: 0.95 },
            });

            return (
              <div
                key={metric.label}
                style={{
                  transform: `translateY(${34 - badgeIn * 34}px)`,
                  opacity: badgeIn,
                }}
              >
                <MetricBadge
                  value={metric.value}
                  label={metric.label}
                  width={220}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            right: 96,
            bottom: 98,
            display: "flex",
            gap: 18,
          }}
        >
          {[MEDIA.universityMeeting, MEDIA.cctvFeature].map((src, index) => {
            const cardIn = spring({
              fps,
              frame: Math.max(0, frame - 16 - index * 7),
              config: { damping: 16, stiffness: 100, mass: 0.96 },
            });

            return (
              <div
                key={src}
                style={{
                  width: 330,
                  height: 198,
                  borderRadius: 28,
                  overflow: "hidden",
                  border: `1px solid ${BRAND.line}`,
                  boxShadow: BRAND.shadow,
                  transform: `translateY(${28 - cardIn * 28}px)`,
                  opacity: cardIn,
                }}
              >
                <Img
                  src={src}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Backdrop>
  );
};
