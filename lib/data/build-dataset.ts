import rawIrcc from "../../data/seed/raw/ircc-temporary-residents.json" with { type: "json" };
import rawStatsCan from "../../data/seed/raw/statscan-population.json" with { type: "json" };
import { geographies } from "../registry/geographies.ts";
import { methodologies } from "../registry/methodologies.ts";
import { metrics } from "../registry/metrics.ts";
import { sources } from "../registry/sources.ts";
import { taxonomy } from "../registry/taxonomy.ts";
import type {
  DatasetBundle,
  HighlightCard,
  MethodologySummary,
  Metric,
  Observation,
  ProvinceProfile,
  SourceReference
} from "../types/dataset.ts";

type RawRecord = {
  metricId: string;
  geographyId: string;
  values: number[];
};

type RawSnapshot = {
  sourceId: string;
  periods: string[];
  records: RawRecord[];
};

const snapshots = [rawStatsCan, rawIrcc] as RawSnapshot[];

function assertMetric(metricId: string): Metric {
  const metric = metrics.find((entry) => entry.id === metricId);
  if (!metric) {
    throw new Error(`Unknown metric: ${metricId}`);
  }

  return metric;
}

function assertSource(sourceId: string): SourceReference {
  const source = sources.find((entry) => entry.id === sourceId);
  if (!source) {
    throw new Error(`Unknown source: ${sourceId}`);
  }

  return source;
}

function assertMethodology(methodologyId: string): MethodologySummary {
  const methodology = methodologies.find((entry) => entry.id === methodologyId);
  if (!methodology) {
    throw new Error(`Unknown methodology: ${methodologyId}`);
  }

  return methodology;
}

function buildOfficialObservations(): Observation[] {
  return snapshots.flatMap((snapshot) =>
    snapshot.records.flatMap((record) => {
      const metric = assertMetric(record.metricId);
      const source = assertSource(snapshot.sourceId);

      return snapshot.periods.map((period, index) => ({
        metricId: record.metricId,
        geographyId: record.geographyId,
        period,
        value: record.values[index],
        kind: "official" as const,
        sourceId: snapshot.sourceId,
        methodologyId: metric.methodologyId,
        lastUpdated: source.accessedAt,
        confidenceNote: "Official released value"
      }));
    })
  );
}

function quarterToTuple(period: string): [number, number] {
  const [yearPart, quarterPart] = period.split("-Q");
  return [Number.parseInt(yearPart, 10), Number.parseInt(quarterPart, 10)];
}

function tupleToQuarter([year, quarter]: [number, number]): string {
  if (quarter < 4) {
    return `${year}-Q${quarter + 1}`;
  }

  return `${year + 1}-Q1`;
}

function buildNowcastObservations(official: Observation[]): Observation[] {
  const grouped = new Map<string, Observation[]>();

  for (const observation of official) {
    const metric = assertMetric(observation.metricId);
    if (!metric.estimateEnabled) {
      continue;
    }

    const key = `${observation.metricId}:${observation.geographyId}`;
    const list = grouped.get(key) ?? [];
    list.push(observation);
    grouped.set(key, list);
  }

  const nowcasts: Observation[] = [];

  for (const series of grouped.values()) {
    const sorted = [...series].sort((a, b) => {
      const [yearA, quarterA] = quarterToTuple(a.period);
      const [yearB, quarterB] = quarterToTuple(b.period);
      return yearA - yearB || quarterA - quarterB;
    });

    if (sorted.length < 2) {
      continue;
    }

    const latest = sorted.at(-1)!;
    const previous = sorted.at(-2)!;
    const delta = latest.value - previous.value;

    nowcasts.push({
      metricId: latest.metricId,
      geographyId: latest.geographyId,
      period: tupleToQuarter(quarterToTuple(latest.period)),
      value: Math.round(latest.value + delta),
      kind: "estimate",
      sourceId: latest.sourceId,
      methodologyId: "trend-nowcast",
      lastUpdated: new Date().toISOString(),
      confidenceNote: `Projected using the last official quarter-over-quarter change from ${previous.period} to ${latest.period}.`
    });
  }

  return nowcasts;
}

const officialObservations = buildOfficialObservations();
const estimatedObservations = buildNowcastObservations(officialObservations);

export const observations: Observation[] = [...officialObservations, ...estimatedObservations];

export const highlights: HighlightCard[] = [
  {
    id: "headline-population",
    eyebrow: "National pulse",
    title: "Canada remains above 41 million residents in the latest release window",
    body: "The platform centers headline population and residency-status shifts, with clear separation between official releases and interim nowcasts.",
    metricId: "population-total",
    geographyId: "ca"
  },
  {
    id: "temp-residents",
    eyebrow: "Residency structure",
    title: "Temporary resident growth remains the fastest-moving part of the demographic mix",
    body: "Temporary resident detail is broken into claimant, worker, mobility, and study streams where source data supports those distinctions.",
    metricId: "population-temporary-residents",
    geographyId: "ca"
  },
  {
    id: "province-contrast",
    eyebrow: "Provincial context",
    title: "Province pages show how each jurisdiction differs from the national baseline",
    body: "The first release supports Canada and provinces, with methodology-backed metric views and transparent release lineage.",
    metricId: "population-total",
    geographyId: "on"
  }
];

export const provinceProfiles: ProvinceProfile[] = geographies
  .filter((geo) => geo.level === "province")
  .map((geo) => ({
    geographyId: geo.id,
    headline: `${geo.name} profile with population, residency-status composition, and temporary resident detail.`,
    focusAreas: [
      "Population trend against the national baseline",
      "Residency-status mix",
      "Temporary resident category detail"
    ]
  }));

export const dataset: DatasetBundle = {
  generatedAt: "2026-03-14T09:00:00-04:00",
  sources,
  methodologies,
  geographies,
  taxonomy,
  metrics,
  observations,
  highlights,
  provinceProfiles
};

export { assertMethodology, quarterToTuple };
