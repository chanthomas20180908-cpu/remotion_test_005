import type { FC } from "react";
import { MEDIA, PROJECT_METRICS } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { MetricCard } from "../components/MetricCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type FlagshipProjectSceneProps = {
  durationInFrames: number;
};

export const FlagshipProjectScene: FC<FlagshipProjectSceneProps> = ({
  durationInFrames,
}) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame
      sceneId="S5"
      eyebrow="FLAGSHIP CASE / AI + MEDIA"
      accent="right"
    >
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "0.96fr 1.04fr",
          gap: 28,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <SectionTitle
            title="北京市“AI+广电传媒”\n标杆项目复盘"
            subtitle="以京西智谷“潭柘智空”项目配套工程为落点，精准对接广电业务场景，实现内容生产全流程智能化革新。"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {PROJECT_METRICS.map((metric, index) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                compact
                index={index}
              />
            ))}
          </div>
          <div
            style={{
              borderRadius: 30,
              padding: "26px 30px",
              background: "rgba(8, 20, 38, 0.9)",
              color: "#eef5ff",
              lineHeight: 1.7,
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            全模块技术闭环交付，涵盖视频智能理解、AI 辅助剪辑、AI
            视频风格化、系统集成等 6 大核心模块，
            获国家广电总局认可，成为国研能汇跨行业应用能力的关键证明。
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 20 }}>
          <ImageCard
            src={MEDIA.projectProof}
            title="标杆项目入选证明"
            height={340}
            caption="项目入选“AI+广电传媒”标杆项目名单，验证公司方案与交付实力。"
          />
          <ImageCard
            src={MEDIA.productScreen}
            title="全流程智能化系统"
            height={340}
            caption="素材调用秒级响应，媒资管理与检索能力显著增强，解决广电行业长期痛点。"
          />
        </div>
      </div>
    </SceneFrame>
  );
};
