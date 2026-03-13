import React from "react";
import type { SceneSpec } from "../types";
import { Page, SafeArea, Subtitle, Tag, Title } from "./Shared";

export const HeroTemplate: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const theme = scene.theme ?? "light";
  return (
    <Page theme={theme}>
      <SafeArea>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {scene.tag ? <Tag text={scene.tag} theme={theme} /> : null}
          <Title text={scene.title} size="hero" theme={theme} />
          <Subtitle text={scene.subtitle} theme={theme} />
        </div>
      </SafeArea>
    </Page>
  );
};
