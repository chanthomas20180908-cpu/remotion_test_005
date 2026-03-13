export type EasingFn = (t: number) => number;

export const easePower4Out: EasingFn = (t: number): number => {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 4);
};

export const easeExpoInOut: EasingFn = (t: number): number => {
  const clamped = Math.min(1, Math.max(0, t));
  if (clamped === 0 || clamped === 1) return clamped;
  if (clamped < 0.5) return Math.pow(2, 20 * clamped - 10) / 2;
  return (2 - Math.pow(2, -20 * clamped + 10)) / 2;
};
