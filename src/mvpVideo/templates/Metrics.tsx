import React from "react";
import type { Metric, SceneSpec } from "../types";
import { COLORS, TYPE } from "../constants";
import {
  Bullets,
  Page,
  SafeArea,
  Subtitle,
  Tag,
  Title,
  useEnter,
} from "./Shared";

const metricColor = (accent: Metric["accent"] | undefined): string => {
  if (accent === "teal") return COLORS.accent.teal;
  if (accent === "red") return COLORS.accent.red;
  return COLORS.accent.cyan;
};

export const MetricsTemplate: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const theme = scene.theme ?? "light";
  const metrics = scene.metrics ?? [];
  const m1 = metrics[0];
  const m2 = metrics[1];
  const { opacity: o1, y: y1 } = useEnter(12, 18, 36);
  const { opacity: o2, y: y2 } = useEnter(26, 18, 30);

  return (
    <Page theme={theme}>
      <SafeArea>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {scene.tag ? <Tag text={scene.tag} theme={theme} /> : null}
          <Title text={scene.title} theme={theme} />
          <Subtitle text={scene.subtitle} theme={theme} />
          <Bullets bullets={scene.bullets} theme={theme} />
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "58%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 48,
            alignItems: "end",
          }}
        >
          <div style={{ opacity: o1, transform: `translate3d(0, ${y1}px, 0)` }}>
            <div
              style={{
                fontSize: TYPE.metric.fontSize,
                fontWeight: TYPE.metric.fontWeight,
                lineHeight: TYPE.metric.lineHeight,
                letterSpacing: TYPE.metric.letterSpacing,
                color: metricColor(m1?.accent),
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {m1?.value ?? "—"}
            </div>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.12em",
                marginTop: 10,
                opacity: 0.75,
              }}
            >
              {m1?.label ?? ""}
            </div>
          </div>

          <div
            style={{
              opacity: o2,
              transform: `translate3d(0, ${y2}px, 0)`,
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: TYPE.metric.fontSize,
                fontWeight: TYPE.metric.fontWeight,
                lineHeight: TYPE.metric.lineHeight,
                letterSpacing: TYPE.metric.letterSpacing,
                color: metricColor(m2?.accent),
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {m2?.value ?? ""}
            </div>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.12em",
                marginTop: 10,
                opacity: 0.75,
              }}
            >
              {m2?.label ?? ""}
            </div>
          </div>
        </div>
      </SafeArea>
    </Page>
  );
};
