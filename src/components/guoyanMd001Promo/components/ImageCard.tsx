import type { FC } from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../styles/palette";

type ImageCardProps = {
  src: string;
  title?: string;
  caption?: string;
  width?: number | string;
  height?: number | string;
};

export const ImageCard: FC<ImageCardProps> = ({
  src,
  title,
  caption,
  width = "100%",
  height = 420,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 40], [1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        borderRadius: 34,
        overflow: "hidden",
        background: "rgba(255,255,255,0.82)",
        border: palette.cardBorder,
        boxShadow: palette.cardShadow,
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ position: "relative", height }}>
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
        {title ? (
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 24,
              padding: "10px 16px",
              borderRadius: 9999,
              background: "rgba(8,20,38,0.62)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 1,
            }}
          >
            {title}
          </div>
        ) : null}
      </div>
      {caption ? (
        <div
          style={{
            padding: "22px 26px 24px",
            fontSize: 22,
            lineHeight: 1.6,
            color: palette.textSecondary,
            fontWeight: 500,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};
