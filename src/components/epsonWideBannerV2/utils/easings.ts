import { Easing, interpolate } from "remotion";

const expoInOut = Easing.bezier(0.87, 0, 0.13, 1);
const power4Out = Easing.bezier(0.16, 1, 0.3, 1);

export const interpolateExpoInOut = (
  frame: number,
  input: [number, number],
  output: [number, number],
): number => {
  return interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: expoInOut,
  });
};

export const interpolatePower4Out = (
  frame: number,
  input: [number, number],
  output: [number, number],
): number => {
  return interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: power4Out,
  });
};
