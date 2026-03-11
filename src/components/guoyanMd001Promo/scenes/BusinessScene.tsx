import type { FC } from "react";
import { BUSINESS_POINTS } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { MetricCard } from "../components/MetricCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";
import { MEDIA } from "../constants";

type BusinessSceneProps = {
  durationInFrames: number;
};

export const BusinessScene: FC<BusinessSceneProps> = ({ durationInFrames }) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S3" eyebrow="BUSINESS EXPANSION" accent="right">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "0.94fr 1.06fr",
          gap: 30,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <SectionTitle
            title="规模与质量双向提升"
            subtitle="产品服务迭代升级，驱动客户创作效率提升与业务边界持续拓展。"
          />
          <div style={{ display: "grid", gap: 18 }}>
            <MetricCard
              value="80%"
              label="多场景智能适配带动创作效率提升"
              compact
            />
            <MetricCard
              value="全流程"
              label="视频理解、剪辑、调色、字幕生成自动化"
              compact
              index={1}
            />
            <MetricCard
              value="1000万+"
              label="到 2025 年底，公司营收超过千万元"
              compact
              index={2}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "auto 1fr", gap: 22 }}>
          <ImageCard
            src={MEDIA.productScreen}
            title="多场景创作中台"
            height={420}
            caption="通过智能脚本生成、多模态素材匹配与超高清画质生成，形成强可复制的交付能力。"
          />
          <div
            style={{
              borderRadius: 34,
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31, 111, 255, 0.12)",
              boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
              padding: "30px 34px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#11284f",
                marginBottom: 18,
              }}
            >
              合作与服务扩张
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {BUSINESS_POINTS.map((point, index) => (
                <div
                  key={point}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9999,
                      background:
                        "linear-gradient(135deg, rgba(31,111,255,0.16), rgba(84,199,255,0.2))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1f6fff",
                      fontWeight: 900,
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      lineHeight: 1.65,
                      color: "rgba(8, 20, 38, 0.76)",
                      fontWeight: 500,
                    }}
                  >
                    {point}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
