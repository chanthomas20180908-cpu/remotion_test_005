import type { ComponentProps } from "react";
import { Composition } from "remotion";
import { TemplateTest001WideVideo } from "./Video";

export const templateTest001WideComposition = {
  id: "TemplateTest001Wide",
  component: TemplateTest001WideVideo,
  durationInFrames: 324,
  fps: 30,
  width: 1920,
  height: 1080,
} satisfies ComponentProps<typeof Composition>;
