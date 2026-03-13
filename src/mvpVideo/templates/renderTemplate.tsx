import React from "react";
import type { SceneSpec } from "../types";
import { HeroTemplate } from "./Hero";
import { SplitImageTemplate } from "./SplitImage";
import { MetricsTemplate } from "./Metrics";
import { DarkSecurityTemplate } from "./DarkSecurity";
import { CtaTemplate } from "./CTA";
import { ChartBarTemplate } from "./ChartBar";

export const renderTemplate = (scene: SceneSpec): React.ReactNode => {
  switch (scene.template) {
    case "hero":
      return <HeroTemplate scene={scene} />;
    case "split":
      return <SplitImageTemplate scene={scene} />;
    case "metrics":
      return <MetricsTemplate scene={scene} />;
    case "dark":
      return <DarkSecurityTemplate scene={scene} />;
    case "chartBar":
      return <ChartBarTemplate scene={scene} />;
    case "cta":
      return <CtaTemplate scene={scene} />;
    default: {
      const _exhaustive: never = scene.template;
      return _exhaustive;
    }
  }
};
