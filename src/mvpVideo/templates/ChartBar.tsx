import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import type { ChartDatum, SceneSpec } from "../types";
import { COLORS } from "../constants";
import {
  Bullets,
  Page,
  SafeArea,
  Subtitle,
  Tag,
  Title,
  useEnter,
} from "./Shared";

const maxValue = (data: ChartDatum[]): number => {
  const vals = data.map((d) => d.value).filter((v) => Number.isFinite(v));
  return Math.max(1, ...vals);
};

export const ChartBarTemplate: React.FC<{ scene: SceneSpec }> = ({ scene }) => {
  const theme = scene.theme ?? "light";
  const data = scene.chartData ?? [];
  const frame = useCurrentFrame();
  const { opacity, y } = useEnter(18, 18, 24);
  const denom = maxValue(data);
  const stroke = theme === "dark" ? COLORS.dark.stroke : COLORS.light.stroke;
  const bg =
    theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)";
  const labelColor = theme === "dark" ? COLORS.dark.text3 : COLORS.light.text3;

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

          <div style={{ opacity, transform: `translate3d(0, ${y}px, 0)` }}>
            <div
              style={{
                width: 980,
                height: 560,
                border: `1.5px solid ${stroke}`,
                backgroundColor: bg,
                boxSizing: "border-box",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-end",
                  height: "100%",
                }}
              >
                {data.length === 0 ? (
                  <div style={{ color: labelColor, letterSpacing: "0.10em" }}>
                    NO DATA
                  </div>
                ) : (
                  data.map((d, i) => {
                    const p = interpolate(frame, [18, 54 + i * 2], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    });
                    const h = Math.round((d.value / denom) * 420 * p);
                    return (
                      <div
                        key={`${d.label}-${i}`}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: h,
                              backgroundColor: COLORS.accent.cyan,
                              opacity: 0.85,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            letterSpacing: "0.10em",
                            textAlign: "center",
                            color: labelColor,
                          }}
                        >
                          {d.label}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </SafeArea>
    </Page>
  );
};
