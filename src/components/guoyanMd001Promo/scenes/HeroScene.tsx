import type { FC } from "react";
import { Img } from "remotion";
import { HERO_METRICS, MEDIA } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { MetricCard } from "../components/MetricCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type HeroSceneProps = {
  durationInFrames: number;
};

export const HeroScene: FC<HeroSceneProps> = ({ durationInFrames }) => {
  const { opacity, translateY, cardScale } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame
      sceneId="S1"
      eyebrow="AI VIDEO CREATION / 2025 REVIEW"
      accent="right"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 36,
          width: "100%",
          transform: `translateY(${translateY}px) scale(${cardScale})`,
          opacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <SectionTitle
              title={"以 AI 赋能创作\n共赴新征程"}
              subtitle={
                "国研能汇（北京）技术有限公司，孵化自北京大学信息技术高等研究院，\n以元婴大模型与智能创作能力，持续重构视频生产方式。"
              }
            />
            <div
              style={{
                display: "flex",
                gap: 18,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              {[
                "AIGC 视频创作智能体",
                "数字人内容生产",
                "AI 智能剪辑自动化",
              ].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "14px 22px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.78)",
                    border: "1px solid rgba(31, 111, 255, 0.14)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#12305c",
                    boxShadow: "0 12px 36px rgba(31, 111, 255, 0.10)",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
          >
            {HERO_METRICS.map((item, index) => (
              <MetricCard
                key={item.label}
                value={item.value}
                label={item.label}
                index={index}
                compact
              />
            ))}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 40,
            padding: 20,
            background: "rgba(255,255,255,0.56)",
            border: "1px solid rgba(31, 111, 255, 0.12)",
            boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Img
            src={MEDIA.productScreen}
            style={{
              width: "100%",
              height: 760,
              objectFit: "cover",
              borderRadius: 28,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 44,
              top: 44,
              padding: "12px 18px",
              borderRadius: 9999,
              background: "rgba(8,20,38,0.6)",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            PRODUCT EXPERIENCE
          </div>
          <Img
            src={MEDIA.accentDashed}
            style={{
              position: "absolute",
              width: 260,
              right: 36,
              bottom: 34,
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </SceneFrame>
  );
};
