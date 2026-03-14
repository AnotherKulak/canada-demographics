import { notFound } from "next/navigation";

import { ExportButton } from "../../../components/export-button";
import { MethodologyCard } from "../../../components/methodology-card";
import { MetricSummary } from "../../../components/metric-summary";
import { ProvinceTable } from "../../../components/province-table";
import { SiteHeader } from "../../../components/site-header";
import { Sparkline } from "../../../components/sparkline";
import { buildMetricCsv, formatNumber } from "../../../lib/dataset";
import { getMetricPayload } from "../../../lib/api";

type MetricPageProps = {
  params: Promise<{ metricSlug: string }>;
};

export default async function MetricPage({ params }: MetricPageProps) {
  const { metricSlug } = await params;
  const payload = getMetricPayload(metricSlug);

  if (!payload) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="page shell">
        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Metric view</div>
              <h1 className="headline" style={{ fontSize: "clamp(2.4rem, 4vw, 4.2rem)" }}>
                {payload.metric.label}
              </h1>
              <p className="lede">{payload.metric.summary}</p>
              <div className="pill-row">
                <span className="pill">Scope: {payload.geography?.name ?? "Canada"}</span>
                <span className="pill">{payload.metric.timeGrain}</span>
                <span className="pill">{payload.metric.domain}</span>
                <span className="pill">{payload.metric.estimateEnabled ? "Nowcast enabled" : "Official only"}</span>
              </div>
              <div className="cta-row">
                <ExportButton
                  filename={`${payload.metric.slug}-${payload.geography?.slug ?? "canada"}.csv`}
                  content={buildMetricCsv(payload.metric.id, payload.geography?.id)}
                />
              </div>
            </div>
            <MetricSummary
              label={`${payload.metric.shortLabel} in ${payload.geography?.name ?? "Canada"}`}
              official={payload.latestOfficial}
              estimate={payload.latestEstimate}
            />
          </div>
        </section>

        <section className="section metric-grid">
          <article className="chart-card">
            <div className="eyebrow">Trend</div>
            <h2>Official releases and estimate overlay for {payload.geography?.name ?? "Canada"}</h2>
            <p className="muted">
              Official values remain primary. Estimates are shown only to bridge the gap between releases for the active geography.
            </p>
            <Sparkline series={payload.series} />
            <table className="table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Kind</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {payload.series.map((observation) => (
                  <tr key={`${observation.period}-${observation.kind}`}>
                    <td>{observation.period}</td>
                    <td>
                      <span className={`badge ${observation.kind === "estimate" ? "estimate" : ""}`}>
                        {observation.kind}
                      </span>
                    </td>
                    <td>{formatNumber(observation.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <MethodologyCard methodology={payload.methodology} sources={payload.sources} />
        </section>

        <section className="section">
          <ProvinceTable metricId={payload.metric.id} />
        </section>
      </main>
    </>
  );
}
