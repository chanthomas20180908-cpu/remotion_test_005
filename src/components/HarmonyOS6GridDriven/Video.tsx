import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CinematicTypographicSplit } from "./CinematicTypographicSplit";
import type { TypographicSplitProps } from "./schema";

export type HarmonyOS6GridDrivenScene = TypographicSplitProps;

const OVERLAP_FRAMES = 20;
const FADE_FRAMES = 12;

const THEME: TypographicSplitProps["theme"] = {
  backgroundColor: "#E8E6E1",
  lineColor: "rgba(0,0,0,0.12)",
  textColor: "#111111",
};

// 说明：文案严格遵守模板容量（每行尽量短），避免超长句破坏网格秩序。
export const HARMONY_OS6_GRID_DRIVEN_SCENES: HarmonyOS6GridDrivenScene[] = [
  {
    theme: THEME,
    leftSection: {
      topLabel: "HARMONYOS 6",
      headlineLines: ["HARMONYOS", "6", "焕新"],
      description: "更专注的日常体验",
    },
    rightSection: {
      imageSrc: staticFile("HarmonyOS6/images/safe_cover.png"),
      topRightLabel: "01/04",
    },
    durationInFrames: 88,
  },
  {
    theme: THEME,
    leftSection: {
      topLabel: "FLUENCY",
      headlineLines: ["更快", "更稳", "更顺"],
      description: "响应与动效更丝滑",
    },
    rightSection: {
      imageSrc: staticFile("HarmonyOS6/images/speed.jpg"),
      topRightLabel: "02/04",
    },
    durationInFrames: 88,
  },
  {
    theme: THEME,
    leftSection: {
      topLabel: "SECURITY",
      headlineLines: ["反诈", "守护", "家人"],
      description: "安全防护更安心",
    },
    rightSection: {
      imageSrc: staticFile("HarmonyOS6/images/anti_fraud.jpg"),
      topRightLabel: "03/04",
    },
    durationInFrames: 88,
  },
  {
    theme: THEME,
    leftSection: {
      topLabel: "AI",
      headlineLines: ["AI", "更懂你", "更多场景"],
      description: "智能体验持续进化",
    },
    rightSection: {
      imageSrc: staticFile("HarmonyOS6/images/ai_mood.png"),
      topRightLabel: "04/04",
    },
    durationInFrames: 88,
  },
];

const getSceneStartFrames = (scenes: HarmonyOS6GridDrivenScene[]): number[] => {
  const starts: number[] = [];
  let cursor = 0;
  for (let i = 0; i < scenes.length; i++) {
    const start = i === 0 ? 0 : cursor - OVERLAP_FRAMES;
    starts.push(start);
    cursor = start + scenes[i].durationInFrames;
  }
  return starts;
};

export const getHarmonyOS6GridDrivenTotalDuration = (
  scenes: HarmonyOS6GridDrivenScene[],
): number => {
  if (scenes.length === 0) return 1;
  const starts = getSceneStartFrames(scenes);
  const lastIndex = scenes.length - 1;
  return starts[lastIndex] + scenes[lastIndex].durationInFrames;
};

export const HarmonyOS6GridDrivenVideo: React.FC<{
  scenes?: HarmonyOS6GridDrivenScene[];
}> = ({ scenes = HARMONY_OS6_GRID_DRIVEN_SCENES }) => {
  const frame = useCurrentFrame();
  const starts = getSceneStartFrames(scenes);

  return (
    <AbsoluteFill
      className="remotion-reset"
      style={{ backgroundColor: "#000000" }}
    >
      {scenes.map((scene, index) => {
        const startFrame = starts[index];
        const duration = scene.durationInFrames;
        const localFrame = frame - startFrame;

        const fadeWindow = Math.min(FADE_FRAMES, OVERLAP_FRAMES);
        const fadeIn = interpolate(localFrame, [0, fadeWindow], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(
          localFrame,
          [duration - fadeWindow, duration],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        // 顶层统筹级微弱转场：仅用于 Scene 之间的连贯性，模板内部动效保持“零淡入”主原则。
        const opacity = Math.min(fadeIn, fadeOut);

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={duration}
            name={`HarmonyOS6GridDriven_S${index + 1}`}
          >
            <AbsoluteFill style={{ opacity }}>
              <CinematicTypographicSplit {...scene} />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
