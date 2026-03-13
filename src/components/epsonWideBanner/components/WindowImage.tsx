import React from "react";
import { Img } from "remotion";

export type WindowImageProps = {
  src: string;
  fit: "cover" | "contain";
  /** 1.0 means no extra zoom; use small values only */
  zoom?: number;
};

export const WindowImage: React.FC<WindowImageProps> = ({
  src,
  fit,
  zoom = 1,
}) => {
  return (
    <Img
      src={src}
      style={
        {
          width: "100%",
          height: "100%",
          objectFit: fit,
          transform: `scale(${zoom})`,
        } satisfies React.CSSProperties
      }
    />
  );
};
