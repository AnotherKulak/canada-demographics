export type GeographyLevel = "country" | "province";
export type TimeGrain = "monthly" | "quarterly" | "yearly";
export type ObservationKind = "official" | "estimate";

export type Geography = {
  id: string;
  slug: string;
  name: string;
  code: string;
  level: GeographyLevel;
  parentId: string | null;
};

export type SourceReference = {
  id: string;
  name: string;
  organization: string;
  releaseDate: string;
  accessedAt: string;
  url: string;
  note: string;
};

export type MethodologySummary = {
  id: string;
  title: string;
  summary: string;
  caveats: string[];
  confidenceLabel: "high" | "medium" | "low";
};

export type MetricTaxonomyNode = {
  id: string;
  slug: string;
  label: string;
  description: string;
  parentId: string | null;
};

export type Metric = {
  id: string;
  slug: string;
  label: string;
  shortLabel: string;
  domain: "population";
  summary: string;
  geographyLevels: GeographyLevel[];
  timeGrain: TimeGrain;
  unit: "people" | "share";
  taxonomyNodeId: string;
  sourceIds: string[];
  methodologyId: string;
  estimateEnabled: boolean;
  topicTags: string[];
};

export type Observation = {
  metricId: string;
  geographyId: string;
  period: string;
  value: number;
  kind: ObservationKind;
  sourceId: string;
  methodologyId: string;
  lastUpdated: string;
  confidenceNote: string;
};

export type HighlightCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  metricId: string;
  geographyId: string;
};

export type ProvinceProfile = {
  geographyId: string;
  headline: string;
  focusAreas: string[];
};

export type DatasetBundle = {
  generatedAt: string;
  sources: SourceReference[];
  methodologies: MethodologySummary[];
  geographies: Geography[];
  taxonomy: MetricTaxonomyNode[];
  metrics: Metric[];
  observations: Observation[];
  highlights: HighlightCard[];
  provinceProfiles: ProvinceProfile[];
};
