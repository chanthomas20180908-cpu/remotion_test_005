export type Layout = {
  safeX: number;
  safeY: number;
  contentW: number;
  contentH: number;
  col: number;
  gutter: number;
  leftW: number;
  rightW: number;
  leftX: number;
  rightX: number;
  topY: number;
};

export const getLayout = (width: number, height: number): Layout => {
  const safeX = Math.round(width * 0.1);
  const safeY = Math.round(height * 0.1);
  const contentW = width - safeX * 2;
  const contentH = height - safeY * 2;
  const col = contentW / 12;
  const gutter = Math.round(col * 0.6);

  // 40% / 60% layout (5 cols / 7 cols)
  const leftW = col * 5 - gutter;
  const rightW = col * 7 + gutter;
  const leftX = safeX;
  const rightX = safeX + col * 5;

  return {
    safeX,
    safeY,
    contentW,
    contentH,
    col,
    gutter,
    leftW,
    rightW,
    leftX,
    rightX,
    topY: safeY,
  };
};
