import type { FC } from "react";
import { TECH_POINTS, MEDIA } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { MetricCard } from "../components/MetricCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type InnovationSceneProps = {
  durationInFrames: number;
};

export const InnovationScene: FC<InnovationSceneProps> = ({
  durationInFrames,
}) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S4" eyebrow="R&D / CORE TECHNOLOGY" accent="left">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 0.94fr",
          gap: 30,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <SectionTitle
            title="硬核创新，筑牢视听技术根基"
            subtitle="研发成果硕果累累，并以可落地、可交付的方式推动 AI 视频能力走向规模应用。"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
          >
            <MetricCard value="4" label="年度新增专利" compact />
            <MetricCard value="3" label="年度新增软著" compact index={1} />
            <MetricCard
              value="300%"
              label="4K 生成效率提升"
              compact
              index={2}
            />
          </div>
          <div
            style={{
              borderRadius: 34,
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(31, 111, 255, 0.12)",
              boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
              padding: "28px 32px",
              display: "grid",
              gap: 14,
            }}
          >
            {TECH_POINTS.map((point) => (
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
        <ImageCard
          src={MEDIA.cctvFeature}
          title="CCTV2《赢在 AI+》"
          height={760}
          caption="自主研发的元婴大模型于 2025 年 5 月登上央视节目，与行业同仁共探技术方向，彰显公司技术引领地位。"
        />
      </div>
    </SceneFrame>
  );
};
