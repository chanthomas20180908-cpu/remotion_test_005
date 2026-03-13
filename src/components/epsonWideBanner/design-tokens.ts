export const TINTS = {
  // tinted greys (slightly blue/green leaning) — avoid true #000 / #808080.
  paper: "#F4F7F6",
  ink: "#0B1220",
  grey1: "#1A2433",
  grey2: "#2B3648",
  grey3: "#5B6B82",
  grey4: "#8A99AF",
  // Epson theme (from local asset dominant blue)
  brand: "#14248C",
  brandRgb: "20,36,140",

  // Text tints on deep brand background (tinted whites)
  paperOnBrand: "#F3F5FF",
  mistOnBrand: "#C9D3FF",
  smokeOnBrand: "#9DADEB",

  // Accent must remain readable on brand background + paper slab.
  accent: "#4FB3FF",
  accentRgb: "79,179,255",
} as const;
