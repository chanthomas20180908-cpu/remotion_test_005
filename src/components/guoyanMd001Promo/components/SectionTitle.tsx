import type { FC } from "react";
import { useVideoConfig } from "remotion";
import { palette } from "../styles/palette";

type SectionTitleProps = {
  title: string;
  subtitle: string;
  align?: "left" | "center";
};

export const SectionTitle: FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "left",
}) => {
  const { width } = useVideoConfig();

  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontSize: Math.max(54, width * 0.035),
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -2,
          color: palette.textPrimary,
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: Math.max(24, width * 0.014),
          lineHeight: 1.7,
          maxWidth: align === "center" ? 980 : 760,
          color: palette.textSecondary,
          whiteSpace: "pre-line",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
