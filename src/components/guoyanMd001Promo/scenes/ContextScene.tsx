import type { FC } from "react";
import { MEDIA } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type ContextSceneProps = {
  durationInFrames: number;
};

export const ContextScene: FC<ContextSceneProps> = ({ durationInFrames }) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S2" eyebrow="2025 / INDUSTRY MOMENT" accent="left">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 0.92fr",
          gap: 34,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 26,
          }}
        >
          <SectionTitle
            title="2025，AIGC 爆发式重塑内容生产"
            subtitle="在视频创作迎来深刻变革的关键节点，国研能汇紧扣“用 AI 重构视频创作”核心主线，以技术、产品、交付三线并进，稳健前行。"
          />
          <div
            style={{
              padding: "34px 36px",
              borderRadius: 34,
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(31, 111, 255, 0.12)",
              boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
            }}
          >
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.8,
                color: "rgba(8, 20, 38, 0.78)",
                fontWeight: 600,
              }}
            >
              业务范围覆盖全国多个省市，联合发起国内首家面向影视科技的产业协同平台，
              并成功申报北京市{" "}
              <span style={{ color: "#1f6fff", fontWeight: 800 }}>
                “AI+广电传媒”
              </span>{" "}
              标杆性项目。
            </div>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {["技术突破", "行业合作", "规模增长", "生态协同"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "14px 20px",
                  borderRadius: 18,
                  background: "rgba(31, 111, 255, 0.08)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1a4d9f",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <ImageCard
          src={MEDIA.productScreen}
          title="AI 脚本剪辑"
          height={760}
          caption="围绕脚本生成、素材智能匹配、自动剪辑与多场景适配，构建完整的智能创作闭环。"
        />
      </div>
    </SceneFrame>
  );
};
