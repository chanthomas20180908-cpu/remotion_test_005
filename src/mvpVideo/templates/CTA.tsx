import React from "react";
import type { SceneSpec } from "../types";
import { Page, SafeArea, Subtitle, Tag, Title, useEnter } from "./Shared";

export const CtaTemplate: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const theme = scene.theme ?? "light";
  const { opacity, y } = useEnter(36, 18, 42);

  return (
    <Page theme={theme}>
      <SafeArea>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {scene.tag ? <Tag text={scene.tag} theme={theme} /> : null}
          <div style={{ opacity, transform: `translate3d(0, ${y}px, 0)` }}>
            <Title text={scene.title} size="hero" theme={theme} start={36} />
          </div>
          <Subtitle text={scene.subtitle} theme={theme} start={50} />
        </div>
      </SafeArea>
    </Page>
  );
};
