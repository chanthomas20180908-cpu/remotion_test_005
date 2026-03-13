import type { ChartDatum, Metric, SceneSpec, TemplateId } from "./types";

const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n));

const compact = (s: string): string => s.replace(/\s+/g, " ").trim();

const limitChars = (s: string, max: number): string => {
  const t = compact(s);
  if (t.length <= max) return t;
  return `${t.slice(0, Math.max(0, max - 1))}…`;
};

const splitLines = (s: string): string[] => {
  return compact(s)
    .split(/\n+/g)
    .map((x) => compact(x))
    .filter(Boolean);
};

const normalizeTitle = (s: string): string => {
  const lines = splitLines(s)
    .slice(0, 2)
    .map((l) => limitChars(l, 16));
  return lines.join("\n");
};

const normalizeSubtitle = (s: string | undefined): string | undefined => {
  if (!s) return undefined;
  const lines = splitLines(s)
    .slice(0, 2)
    .map((l) => limitChars(l, 26));
  const out = lines.join("\n");
  return out.length === 0 ? undefined : out;
};

const normalizeBullets = (
  bullets: string[] | undefined,
): string[] | undefined => {
  if (!bullets || bullets.length === 0) return undefined;
  const out = bullets
    .map((b) => limitChars(b, 22))
    .filter(Boolean)
    .slice(0, 3);
  return out.length === 0 ? undefined : out;
};

const normalizeMetrics = (
  metrics: Metric[] | undefined,
): Metric[] | undefined => {
  if (!metrics || metrics.length === 0) return undefined;
  const out = metrics
    .slice(0, 3)
    .map((m) => ({
      label: limitChars(m.label, 14),
      value: limitChars(m.value, 8),
      accent: m.accent,
    }))
    .filter((m) => m.label.length > 0 && m.value.length > 0);
  return out.length === 0 ? undefined : out;
};

const normalizeChart = (
  data: ChartDatum[] | undefined,
): ChartDatum[] | undefined => {
  if (!data || data.length === 0) return undefined;
  const filtered = data
    .filter((d) => Number.isFinite(d.value))
    .slice(0, 8)
    .map((d) => ({
      label: limitChars(d.label, 8),
      value: clamp(d.value, 0, 1_000_000),
    }))
    .filter((d) => d.label.length > 0);
  return filtered.length === 0 ? undefined : filtered;
};

const normalizeTemplate = (t: TemplateId): TemplateId => t;

export const validateScenes = (scenes: SceneSpec[]): SceneSpec[] => {
  return scenes.slice(0, 6).map((s) => {
    const template = normalizeTemplate(s.template);
    return {
      template,
      theme: s.theme,
      tag: s.tag ? limitChars(s.tag, 18) : undefined,
      title: normalizeTitle(s.title),
      subtitle: normalizeSubtitle(s.subtitle),
      bullets: normalizeBullets(s.bullets),
      imageSrc: s.imageSrc,
      metrics: normalizeMetrics(s.metrics),
      chartData: normalizeChart(s.chartData),
    };
  });
};
