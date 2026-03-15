import { geographyLookup } from "../registry/geographies";
import { getMetricObservations } from "./queries";

export function buildMetricCsv(metricId: string, geographyId?: string) {
  const rows = getMetricObservations(metricId, geographyId).map((item) => {
    const geography = geographyLookup[item.geographyId];
    return [item.period, geography.name, item.kind, String(item.value), item.sourceId].join(",");
  });

  return ["period,geography,kind,value,sourceId", ...rows].join("\n");
}
