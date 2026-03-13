import type { CSSProperties, FC, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { GRID, SAFE } from "../constants";

type SceneShellProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export const SceneShell: FC<SceneShellProps> = ({ children, style }) => {
  return (
    <AbsoluteFill style={style}>
      <div
        style={{
          position: "absolute",
          left: SAFE.x,
          top: SAFE.y,
          width: GRID.contentWidth,
          height: 1080 - SAFE.y * 2,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
