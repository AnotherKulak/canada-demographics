import type { SourceReference } from "../types/dataset.ts";

export const sources: SourceReference[] = [
  {
    id: "statscan-pop-estimates",
    name: "Quarterly population estimates",
    organization: "Statistics Canada",
    releaseDate: "2025-12-17",
    accessedAt: "2026-03-14T09:00:00-04:00",
    url: "https://www150.statcan.gc.ca/",
    note: "Seed snapshot for Canada and provincial population totals by residency status."
  },
  {
    id: "ircc-temp-residents",
    name: "Temporary residents by permit and claimant class",
    organization: "Immigration, Refugees and Citizenship Canada",
    releaseDate: "2025-11-28",
    accessedAt: "2026-03-14T09:00:00-04:00",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    note: "Seed snapshot for temporary resident detail and category mapping."
  }
];
