import type { FC } from "react";
import { FUTURE_ROADMAP, MEDIA } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type FutureSceneProps = {
  durationInFrames: number;
};

export const FutureScene: FC<FutureSceneProps> = ({ durationInFrames }) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S8" eyebrow="2026 / NEXT HORIZON" accent="left">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.08fr 0.92fr",
          gap: 28,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "grid", gap: 22 }}>
            <SectionTitle
              title="面向 2026，持续放大\nAI 视听解决方案价值"
              subtitle="围绕元婴大模型、VisionConnect（视界通）与多行业场景适配，公司将进一步强化技术、商业与生态协同。"
            />
            <div style={{ display: "grid", gap: 14 }}>
              {FUTURE_ROADMAP.map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "58px 1fr",
                    gap: 16,
                    alignItems: "flex-start",
                    padding: "18px 22px",
                    borderRadius: 24,
                    background: "rgba(255,255,255,0.82)",
                    border: "1px solid rgba(31, 111, 255, 0.12)",
                    boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 9999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, rgba(31,111,255,0.18), rgba(84,199,255,0.22))",
                      color: "#1f6fff",
                      fontWeight: 900,
                      fontSize: 24,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      lineHeight: 1.7,
                      color: "rgba(8, 20, 38, 0.78)",
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: "26px 30px",
              borderRadius: 30,
              background:
                "linear-gradient(135deg, rgba(17,40,79,0.95), rgba(31,111,255,0.92))",
              color: "#ffffff",
              fontSize: 30,
              lineHeight: 1.6,
              fontWeight: 700,
            }}
          >
            以 AI 重构视频创作，携手客户伙伴与行业同仁，开启智能内容创作新征程。
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            justifyContent: "center",
          }}
        >
          <ImageCard
            src={MEDIA.qrCode}
            title="了解更多"
            height={520}
            caption="扫描二维码，关注品牌动态与 AI 视频创作能力升级。"
          />
          <div
            style={{
              padding: "28px 30px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(31, 111, 255, 0.12)",
              boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
              display: "grid",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: "rgba(8, 20, 38, 0.58)",
                fontWeight: 700,
              }}
            >
              国研能汇（北京）技术有限公司
            </div>
            <div style={{ fontSize: 34, color: "#11284f", fontWeight: 900 }}>
              全球领先 AI 视听解决方案供应商
            </div>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
