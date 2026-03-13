import React from "react";
import { AbsoluteFill } from "remotion";
import { SCENE } from "../constants";
import { interpolateExpoInOut } from "../utils/easings";

export type GeometricWipeMaskProps = {
  localFrame: number;
  children: React.ReactNode;
};

export const GeometricWipeMask: React.FC<GeometricWipeMaskProps> = ({
  localFrame,
  children,
}) => {
  const p = interpolateExpoInOut(
    localFrame,
    [0, SCENE.transitionFrames],
    [0, 1],
  );

  // 梯形几何遮罩：右侧斜边推进，避免“淡入淡出”PPT感
  const x = 100 * p;
  const skew = 14; // percentage
  const clip = `polygon(0% 0%, ${x}% 0%, ${Math.max(0, x - skew)}% 100%, 0% 100%)`;

  return <AbsoluteFill style={{ clipPath: clip }}>{children}</AbsoluteFill>;
};
