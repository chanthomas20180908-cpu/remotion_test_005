import React, { type CSSProperties } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { COLORS, MVP_ENTRY_BUFFER, SAFE_X, SAFE_Y, TYPE } from "../constants";

export const fontFamily =
  "PingFang SC, HarmonyOS Sans, Noto Sans SC, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

export const SafeArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        paddingLeft: SAFE_X,
        paddingRight: SAFE_X,
        paddingTop: SAFE_Y,
        paddingBottom: SAFE_Y,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
};

export const Page: React.FC<{
  theme: "light" | "dark";
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: palette.bg,
        color: palette.text,
        fontFamily,
      }}
    >
      {children}
    </div>
  );
};

export const Tag: React.FC<{ text: string; theme: "light" | "dark" }> = ({
  text,
  theme,
}) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  return (
    <div
      style={{
        fontSize: TYPE.small.fontSize,
        fontWeight: TYPE.small.fontWeight,
        letterSpacing: TYPE.small.letterSpacing,
        color: palette.text3,
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
};

type EnterMotion = {
  opacity: number;
  y: number;
};

// SAFE 动效：只用 opacity + translateY，并且位移取整，防止文字 shimmer
export const useEnter = (
  start: number,
  duration: number,
  fromY: number,
): EnterMotion => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = p;
  const y = Math.round(fromY * (1 - p));
  return { opacity, y };
};

export const Title: React.FC<{
  text: string;
  size?: "hero" | "title";
  theme: "light" | "dark";
  start?: number;
}> = ({ text, size = "title", theme, start = MVP_ENTRY_BUFFER }) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  const { opacity, y } = useEnter(start, 18, 32);
  const style = size === "hero" ? TYPE.hero : TYPE.title;

  return (
    <div style={{ opacity, transform: `translate3d(0, ${y}px, 0)` }}>
      {text.split("\n").map((line, i) => (
        <div
          key={`${i}-${line}`}
          style={{
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            color: palette.text,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export const Subtitle: React.FC<{
  text?: string;
  theme: "light" | "dark";
  start?: number;
}> = ({ text, theme, start = MVP_ENTRY_BUFFER + 10 }) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  const { opacity, y } = useEnter(start, 16, 18);
  if (!text) return null;
  return (
    <div
      style={{ opacity, transform: `translate3d(0, ${y}px, 0)`, marginTop: 18 }}
    >
      {text.split("\n").map((line, i) => (
        <div
          key={`${i}-${line}`}
          style={{
            fontSize: TYPE.body.fontSize,
            fontWeight: TYPE.body.fontWeight,
            lineHeight: TYPE.body.lineHeight,
            letterSpacing: TYPE.body.letterSpacing,
            color: palette.text2,
            maxWidth: 820,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export const Bullets: React.FC<{
  bullets?: string[];
  theme: "light" | "dark";
  start?: number;
}> = ({ bullets, theme, start = MVP_ENTRY_BUFFER + 18 }) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  const { opacity, y } = useEnter(start, 16, 14);
  if (!bullets || bullets.length === 0) return null;
  return (
    <div
      style={{ opacity, transform: `translate3d(0, ${y}px, 0)`, marginTop: 22 }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {bullets.map((b, i) => (
          <div
            key={`${i}-${b}`}
            style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: palette.text3,
                marginTop: 10,
              }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 550,
                lineHeight: 1.45,
                color: palette.text2,
                maxWidth: 860,
              }}
            >
              {b}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImageSlot: React.FC<{
  src?: string;
  theme: "light" | "dark";
  width: number;
  height: number;
  start?: number;
}> = ({ src, theme, width, height, start = MVP_ENTRY_BUFFER }) => {
  const palette = theme === "dark" ? COLORS.dark : COLORS.light;
  const { opacity, y } = useEnter(start, 18, 18);

  const wrap: CSSProperties = {
    width,
    height,
    border: `1.5px solid ${palette.stroke}`,
    backgroundColor:
      theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  return (
    <div style={{ opacity, transform: `translate3d(0, ${y}px, 0)` }}>
      <div style={wrap}>
        {src ? (
          <Img
            src={src}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: palette.text3,
              fontSize: 18,
              letterSpacing: "0.10em",
              fontWeight: 650,
            }}
          >
            IMAGE
          </div>
        )}
      </div>
    </div>
  );
};
