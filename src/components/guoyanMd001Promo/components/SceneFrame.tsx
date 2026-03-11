import type { CSSProperties, FC, ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MEDIA } from "../constants";
import { palette } from "../styles/palette";
import { BackgroundDecor } from "./BackgroundDecor";

type SceneFrameProps = {
  sceneId: string;
  eyebrow: string;
  accent?: "left" | "right";
  children: ReactNode;
};

export const SceneFrame: FC<SceneFrameProps> = ({
  sceneId,
  eyebrow,
  accent = "right",
  children,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const headerShift = interpolate(frame, [0, 24], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerStyle: CSSProperties = {
    padding: "84px 96px 72px",
    display: "flex",
    flexDirection: "column",
    color: palette.textPrimary,
  };

  return (
    <AbsoluteFill>
      <BackgroundDecor accent={accent} />
      <AbsoluteFill style={containerStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `translateY(${headerShift}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Img src={MEDIA.accentSquare} style={{ width: 22, height: 22 }} />
            <div
              style={{
                fontSize: Math.max(24, width * 0.013),
                fontWeight: 700,
                letterSpacing: 4,
                color: "rgba(8, 20, 38, 0.58)",
              }}
            >
              {eyebrow}
            </div>
          </div>
          <div
            style={{
              padding: "12px 18px",
              borderRadius: 9999,
              border: palette.cardBorder,
              boxShadow: palette.glow,
              background: "rgba(255,255,255,0.54)",
              fontSize: 24,
              fontWeight: 700,
              color: "rgba(8, 20, 38, 0.72)",
            }}
          >
            {sceneId}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", paddingTop: 38 }}>
          {children}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
