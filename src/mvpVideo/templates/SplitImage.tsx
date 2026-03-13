import React from "react";
import type { SceneSpec } from "../types";
import {
  Bullets,
  ImageSlot,
  Page,
  SafeArea,
  Subtitle,
  Tag,
  Title,
} from "./Shared";

export const SplitImageTemplate: React.FC<{ scene: SceneSpec }> = ({
  scene,
}) => {
  const theme = scene.theme ?? "light";
  return (
    <Page theme={theme}>
      <SafeArea>
        <div
          style={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            columnGap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {scene.tag ? <Tag text={scene.tag} theme={theme} /> : null}
            <Title text={scene.title} theme={theme} />
            <Subtitle text={scene.subtitle} theme={theme} />
            <Bullets bullets={scene.bullets} theme={theme} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ImageSlot
              src={scene.imageSrc}
              theme={theme}
              width={980}
              height={560}
            />
          </div>
        </div>
      </SafeArea>
    </Page>
  );
};
