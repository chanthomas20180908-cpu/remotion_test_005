export type TemplateId =
  | "hero"
  | "split"
  | "metrics"
  | "dark"
  | "cta"
  | "chartBar";

export type Metric = {
  label: string;
  value: string;
  accent?: "cyan" | "teal" | "red";
};

export type ChartDatum = {
  label: string;
  value: number;
};

export type SceneSpec = {
  template: TemplateId;
  theme?: "light" | "dark";
  tag?: string;

  title: string;
  subtitle?: string;
  bullets?: string[];

  // Optional image. If missing or invalid, templates must render placeholder.
  imageSrc?: string;

  metrics?: Metric[];
  chartData?: ChartDatum[];
};
