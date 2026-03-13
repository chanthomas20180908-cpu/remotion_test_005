import { AbsoluteFill, Series } from "remotion";
import { Scene1_Opener } from "./scenes/Scene1_Opener";
import { Scene2_Intelligence } from "./scenes/Scene2_Intelligence";
import { Scene3_Security } from "./scenes/Scene3_Security";
import { Scene4_Performance } from "./scenes/Scene4_Performance";
import { Scene5_Usability } from "./scenes/Scene5_Usability";
import { Scene6_Closer } from "./scenes/Scene6_Closer";

export const HarmonyOS6Video: React.FC = () => {
  return (
    <AbsoluteFill className="remotion-reset">
      <Series>
        <Series.Sequence durationInFrames={90}>
          <Scene1_Opener />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene2_Intelligence />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene3_Security />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <Scene4_Performance />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene5_Usability />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <Scene6_Closer />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
