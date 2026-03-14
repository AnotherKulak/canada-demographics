import type { MethodologySummary } from "./types.ts";

export const methodologies: MethodologySummary[] = [
  {
    id: "official-release",
    title: "Official release series",
    summary: "Directly reflects the latest official release snapshot used by the platform without modeled interpolation.",
    caveats: [
      "Coverage varies by metric and release.",
      "Subcategories may be revised retroactively by source agencies."
    ],
    confidenceLabel: "high"
  },
  {
    id: "trend-nowcast",
    title: "Conservative nowcast",
    summary: "Projects the latest point using the trailing official trend and preserves a clear distinction from released values.",
    caveats: [
      "Nowcasts should not be interpreted as official totals.",
      "Short-term shocks may not be reflected until an official release lands."
    ],
    confidenceLabel: "medium"
  }
];
