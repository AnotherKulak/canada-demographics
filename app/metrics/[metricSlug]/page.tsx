import { notFound } from "next/navigation";
import Image from "next/image";

import { SiteHeader } from "../../../components/layout/site-header";
import { MethodologyCard } from "../../../components/metrics/methodology-card";
import { MetricSummary } from "../../../components/metrics/metric-summary";
import { ProvinceTable } from "../../../components/metrics/province-table";
import { Sparkline } from "../../../components/metrics/sparkline";
import { ExportButton } from "../../../components/shared/export-button";
import { SectionReveal } from "../../../components/shared/section-reveal";
import { buildMetricCsv } from "../../../lib/data/export";
import { formatNumber } from "../../../lib/data/format";
import { getMetricPayload } from "../../../lib/payloads/metric-page";

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
      <main id="main-content" className="app-shell pb-20 pt-8 sm:pt-12">
        <SectionReveal className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <section className="surface p-6 sm:p-8 lg:p-10">
            <div className="mb-6 overflow-hidden rounded-[28px] border border-border/70 bg-background/30">
              <Image
                src="/illustrations/metric-hero.svg"
                alt="Illustration of a metric analytics panel with trend charts and status widgets"
                width={920}
                height={700}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="eyebrow">Metric view</div>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none sm:text-6xl">
              {payload.metric.label}
            </h1>
            <p className="lede mt-5">{payload.metric.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="pill">Scope: {payload.geography?.name ?? "Canada"}</span>
              <span className="pill">{payload.metric.timeGrain}</span>
              <span className="pill">{payload.metric.domain}</span>
              <span className="pill">{payload.metric.estimateEnabled ? "Nowcast enabled" : "Official only"}</span>
            </div>
            <div className="mt-8">
              <ExportButton
                filename={`${payload.metric.slug}-${payload.geography?.slug ?? "canada"}.csv`}
                content={buildMetricCsv(payload.metric.id, payload.geography?.id)}
              />
            </div>
          </section>

          <MetricSummary
            label={`${payload.metric.shortLabel} in ${payload.geography?.name ?? "Canada"}`}
            official={payload.latestOfficial}
            estimate={payload.latestEstimate}
          />
        </SectionReveal>

        <SectionReveal className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]" delay={0.05}>
          <article className="surface p-6 sm:p-8">
            <div className="eyebrow">Trend</div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
              Official releases and estimate overlay for {payload.geography?.name ?? "Canada"}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
              Official values remain primary. Estimates are shown only to bridge the gap between releases for the active geography.
            </p>
            <Sparkline
              series={payload.series}
              label={`${payload.metric.label} trend for ${payload.geography?.name ?? "Canada"}`}
            />
            <div className="mt-6 overflow-hidden rounded-3xl border border-border/80">
              <table className="table-base">
                <caption className="sr-only">
                  Time series for {payload.metric.label} in {payload.geography?.name ?? "Canada"}
                </caption>
                <thead className="bg-background/55">
                  <tr>
                    <th scope="col">Period</th>
                    <th scope="col">Kind</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {payload.series.map((observation) => (
                    <tr key={`${observation.period}-${observation.kind}`}>
                      <td>{observation.period}</td>
                      <td>
                        <span className={`badge ${observation.kind === "estimate" ? "badge-estimate" : ""}`}>
                          {observation.kind}
                        </span>
                      </td>
                      <td>{formatNumber(observation.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <MethodologyCard methodology={payload.methodology} sources={payload.sources} />
        </SectionReveal>

        <SectionReveal className="mt-14" delay={0.1}>
          <ProvinceTable metricId={payload.metric.id} />
        </SectionReveal>
      </main>
    </>
  );
}
