import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1HookKpi } from "./scenes/Scene1HookKpi";
import { Scene2DashboardCascade } from "./scenes/Scene2DashboardCascade";
import { Scene3PunchOutro } from "./scenes/Scene3PunchOutro";
import { COLORS } from "./components/tokens";

export const TemplateTest001WideVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Scene 1: 0-89 */}
      <Sequence durationInFrames={90}>
        <Scene1HookKpi startFrame={0} />
      </Sequence>

      {/* Scene 2: 72-251 (overlap 18f) */}
      <Sequence from={72} durationInFrames={180}>
        <Scene2DashboardCascade startFrame={72} />
      </Sequence>

      {/* Scene 3: 234-323 (overlap 18f) */}
      <Sequence from={234} durationInFrames={90}>
        <Scene3PunchOutro startFrame={234} />
      </Sequence>
    </AbsoluteFill>
  );
};
