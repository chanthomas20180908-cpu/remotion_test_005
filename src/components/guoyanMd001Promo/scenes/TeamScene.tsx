import type { FC } from "react";
import { HONOR_POINTS, MEDIA, TEAM_METRICS } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { MetricCard } from "../components/MetricCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type TeamSceneProps = {
  durationInFrames: number;
};

export const TeamScene: FC<TeamSceneProps> = ({ durationInFrames }) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S7" eyebrow="TEAM / HONORS" accent="right">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <SectionTitle
            title="凝聚人心，共筑辉煌"
            subtitle="资深引领与新锐攻坚并行的人才梯队，为技术攻关、产品迭代与市场突破提供持续支撑。"
          />
          <ImageCard src={MEDIA.teamPhoto} title="团队成长" height={360} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {TEAM_METRICS.map((metric, index) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                compact
                index={index}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 20 }}>
          <ImageCard
            src={MEDIA.awardPhoto}
            title="荣誉认可"
            height={320}
            caption="企业与核心成员同步获得国家级、市级奖项与区域人才荣誉。"
          />
          <div
            style={{
              borderRadius: 34,
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31, 111, 255, 0.12)",
              boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
              padding: "28px 32px",
              display: "grid",
              gap: 14,
            }}
          >
            {HONOR_POINTS.map((point) => (
              <div
                key={point}
                style={{
                  fontSize: 22,
                  lineHeight: 1.7,
                  color: "rgba(8, 20, 38, 0.78)",
                  fontWeight: 600,
                }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
