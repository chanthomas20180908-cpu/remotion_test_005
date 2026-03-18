export interface TypographicSplitProps {
  theme: {
    backgroundColor: string;
    lineColor: string;
    textColor: string;
  };
  leftSection: {
    topLabel: string;
    headlineLines: string[];
    description?: string;
  };
  rightSection: {
    imageSrc: string;
    topRightLabel?: string;
  };
  durationInFrames: number;
}
