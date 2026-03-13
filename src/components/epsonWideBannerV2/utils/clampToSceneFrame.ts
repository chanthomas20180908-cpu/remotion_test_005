export const clampToSceneFrame = (
  localFrame: number,
  duration: number,
): number => {
  if (localFrame < 0) {
    return 0;
  }

  if (localFrame > duration - 1) {
    return duration - 1;
  }

  return localFrame;
};
