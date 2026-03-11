import type { FC } from "react";
import { MEDIA, RESPONSIBILITY_POINTS } from "../constants";
import { useSceneProgress } from "../hooks/useSceneProgress";
import { ImageCard } from "../components/ImageCard";
import { SceneFrame } from "../components/SceneFrame";
import { SectionTitle } from "../components/SectionTitle";

type ResponsibilitySceneProps = {
  durationInFrames: number;
};

export const ResponsibilityScene: FC<ResponsibilitySceneProps> = ({
  durationInFrames,
}) => {
  const { opacity, translateY } = useSceneProgress(durationInFrames);

  return (
    <SceneFrame sceneId="S6" eyebrow="SOCIAL IMPACT / ACADEMIA" accent="left">
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.02fr 0.98fr",
          gap: 28,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <ImageCard
          src={MEDIA.universityMeeting}
          title="产学研协同"
          height={760}
          caption="支持北方工业大学人工智能相关专业建设，推动课堂、实践与产业需求深度联动。"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            justifyContent: "center",
          }}
        >
          <SectionTitle
            title="初心如磐，温暖同行"
            subtitle="公司将技术成长与社会价值并行推进，以产学研协同持续培养行业后备人才。"
          />
          <div style={{ display: "grid", gap: 16 }}>
            {RESPONSIBILITY_POINTS.map((point, index) => (
              <div
                key={point}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr",
                  gap: 16,
                  padding: "22px 24px",
                  borderRadius: 28,
                  background: "rgba(255,255,255,0.82)",
                  border: "1px solid rgba(31, 111, 255, 0.12)",
                  boxShadow: "0 30px 80px rgba(10, 32, 76, 0.16)",
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 24,
                    background:
                      "linear-gradient(135deg, rgba(31,111,255,0.18), rgba(84,199,255,0.2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#1f6fff",
                  }}
                >
                  0{index + 1}
                </div>
                <div
                  style={{
                    fontSize: 23,
                    lineHeight: 1.65,
                    color: "rgba(8, 20, 38, 0.78)",
                    fontWeight: 600,
                  }}
                >
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
};
