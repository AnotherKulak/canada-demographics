import type { Geography } from "./types.ts";

export const geographies: Geography[] = [
  { id: "ca", slug: "canada", name: "Canada", code: "CA", level: "country", parentId: null },
  { id: "ab", slug: "alberta", name: "Alberta", code: "AB", level: "province", parentId: "ca" },
  { id: "bc", slug: "british-columbia", name: "British Columbia", code: "BC", level: "province", parentId: "ca" },
  { id: "mb", slug: "manitoba", name: "Manitoba", code: "MB", level: "province", parentId: "ca" },
  { id: "nb", slug: "new-brunswick", name: "New Brunswick", code: "NB", level: "province", parentId: "ca" },
  { id: "nl", slug: "newfoundland-and-labrador", name: "Newfoundland and Labrador", code: "NL", level: "province", parentId: "ca" },
  { id: "ns", slug: "nova-scotia", name: "Nova Scotia", code: "NS", level: "province", parentId: "ca" },
  { id: "on", slug: "ontario", name: "Ontario", code: "ON", level: "province", parentId: "ca" },
  { id: "pe", slug: "prince-edward-island", name: "Prince Edward Island", code: "PE", level: "province", parentId: "ca" },
  { id: "qc", slug: "quebec", name: "Quebec", code: "QC", level: "province", parentId: "ca" },
  { id: "sk", slug: "saskatchewan", name: "Saskatchewan", code: "SK", level: "province", parentId: "ca" }
];

export const geographyLookup = Object.fromEntries(geographies.map((geo) => [geo.id, geo]));
