import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { ASSETS, COLORS } from "../constants";
import {
  MediaPlane,
  MetricPill,
  OrbitLabel,
  SceneShell,
} from "../components/Primitives";

type Props = {
  readonly durationInFrames: number;
};

export const Scene05Flagship: React.FC<Props> = ({ durationInFrames }) => {
  return (
    <SceneShell durationInFrames={durationInFrames}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 110,
            color: COLORS.accent,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          FLAGSHIP CASE
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 166,
            width: 920,
            fontSize: 102,
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: -5,
            color: COLORS.text,
          }}
        >
          AI+广电传媒
          <br />
          标杆项目
        </div>

        <MediaPlane
          src={ASSETS.productScreen}
          x={585}
          y={230}
          width={760}
          height={470}
          rotateY={0}
          rotateX={0}
          radius={40}
          shadow="0 46px 120px rgba(35, 73, 120, 0.22)"
        />

        <div
          style={{
            position: "absolute",
            left: 610,
            top: 256,
            width: 710,
            height: 420,
            borderRadius: 34,
            overflow: "hidden",
            mixBlendMode: "screen",
            opacity: 0.18,
          }}
        >
          <Img
            src={ASSETS.ambientFlow}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <OrbitLabel
          text="视频理解"
          angle={-80}
          radiusX={510}
          radiusY={220}
          centerX={960}
          centerY={462}
        />
        <OrbitLabel
          text="AI剪辑"
          angle={-10}
          radiusX={520}
          radiusY={245}
          centerX={960}
          centerY={462}
          accent={COLORS.emerald}
        />
        <OrbitLabel
          text="风格迁移"
          angle={48}
          radiusX={495}
          radiusY={250}
          centerX={960}
          centerY={462}
          accent={COLORS.gold}
        />
        <OrbitLabel
          text="系统集成"
          angle={112}
          radiusX={470}
          radiusY={220}
          centerX={960}
          centerY={462}
          accent={COLORS.rose}
        />
        <OrbitLabel
          text="秒级响应"
          angle={176}
          radiusX={535}
          radiusY={240}
          centerX={960}
          centerY={462}
          accent={COLORS.accentBright}
        />
        <OrbitLabel
          text="媒资检索"
          angle={236}
          radiusX={500}
          radiusY={260}
          centerX={960}
          centerY={462}
          accent={COLORS.accent}
        />

        <MetricPill
          x={160}
          y={700}
          value="92%+"
          label="内容识别准确率"
          accent={COLORS.accent}
        />
        <MetricPill
          x={620}
          y={778}
          value="+60%"
          label="生产效率提升"
          accent={COLORS.emerald}
        />
        <MetricPill
          x={1020}
          y={778}
          value="-40%"
          label="审核成本降低"
          accent={COLORS.rose}
        />
        <MetricPill
          x={1420}
          y={778}
          value="+75%"
          label="媒资复用提升"
          accent={COLORS.gold}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};
