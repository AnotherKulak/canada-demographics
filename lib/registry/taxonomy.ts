import type { MetricTaxonomyNode } from "../types/dataset.ts";

export const taxonomy: MetricTaxonomyNode[] = [
  {
    id: "population-total",
    slug: "total-population",
    label: "Total population",
    description: "Headline population counts for Canada and provinces.",
    parentId: null
  },
  {
    id: "canadian-born",
    slug: "canadian-born-citizens",
    label: "Canadian-born citizens",
    description: "Residents born in Canada and holding citizenship by birth.",
    parentId: "population-total"
  },
  {
    id: "naturalized",
    slug: "naturalized-citizens",
    label: "Naturalized citizens",
    description: "Residents who obtained Canadian citizenship after immigration.",
    parentId: "population-total"
  },
  {
    id: "permanent-residents",
    slug: "permanent-residents",
    label: "Non-citizen permanent residents",
    description: "Residents with permanent resident status and without citizenship.",
    parentId: "population-total"
  },
  {
    id: "temporary-residents",
    slug: "temporary-residents",
    label: "Temporary residents",
    description: "Residents with temporary status including work, study, mobility, and asylum streams.",
    parentId: "population-total"
  },
  {
    id: "temp-asylum",
    slug: "asylum-claimants",
    label: "Asylum claimants",
    description: "Temporary residents with asylum claimant status where available.",
    parentId: "temporary-residents"
  },
  {
    id: "temp-tfw",
    slug: "temporary-foreign-workers",
    label: "Temporary Foreign Worker Program",
    description: "Temporary foreign workers admitted under TFW pathways.",
    parentId: "temporary-residents"
  },
  {
    id: "temp-imp",
    slug: "international-mobility-program",
    label: "International Mobility Program",
    description: "Temporary residents admitted under IMP work permit streams.",
    parentId: "temporary-residents"
  },
  {
    id: "temp-student",
    slug: "study-permit-holders",
    label: "Study permit holders",
    description: "Residents in Canada under student visa or study permit streams.",
    parentId: "temporary-residents"
  },
  {
    id: "origin-non-canadian-born",
    slug: "country-of-origin",
    label: "Country of origin",
    description: "Country-of-origin detail for residents born outside Canada.",
    parentId: null
  }
];
