// 统一缓动曲线：指数/高阶（禁用 spring/bounce 作为主缓动）
export const power4Out = (t: number): number => 1 - Math.pow(1 - t, 4);

export const power4InOut = (t: number): number => {
  if (t < 0.5) {
    return 8 * Math.pow(t, 4);
  }
  return 1 - Math.pow(-2 * t + 2, 4) / 2;
};

export const expoInOut = (t: number): number => {
  if (t === 0 || t === 1) {
    return t;
  }
  if (t < 0.5) {
    return Math.pow(2, 20 * t - 10) / 2;
  }
  return (2 - Math.pow(2, -20 * t + 10)) / 2;
};
