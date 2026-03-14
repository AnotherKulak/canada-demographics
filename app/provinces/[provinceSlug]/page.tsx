import Link from "next/link";
import { notFound } from "next/navigation";

import { ExportButton } from "../../../components/export-button";
import { SiteHeader } from "../../../components/site-header";
import { Sparkline } from "../../../components/sparkline";
import {
  buildMetricCsv,
  dataset,
  formatNumber,
  getGeographyBySlug,
  getLatestObservation,
  getMetricObservations
} from "../../../lib/dataset";

type ProvincePageProps = {
  params: Promise<{ provinceSlug: string }>;
};

const featuredMetrics = [
  "population-total",
  "population-temporary-residents",
  "population-naturalized",
  "population-permanent-residents"
];

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { provinceSlug } = await params;
  const geography = getGeographyBySlug(provinceSlug);

  if (!geography || geography.level !== "province") {
    notFound();
  }

  const profile = dataset.provinceProfiles.find((item) => item.geographyId === geography.id);
  const populationSeries = getMetricObservations("population-total", geography.id);

  return (
    <>
      <SiteHeader />
      <main className="page shell">
        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Province profile</div>
              <h1 className="headline" style={{ fontSize: "clamp(2.6rem, 4vw, 4.6rem)" }}>
                {geography.name}
              </h1>
              <p className="lede">{profile?.headline}</p>
              <div className="cta-row">
                <Link className="button" href="/metrics/population-total">
                  View headline metric
                </Link>
                <ExportButton
                  filename={`${geography.slug}-population.csv`}
                  content={buildMetricCsv("population-total", geography.id)}
                />
              </div>
            </div>
            <section className="panel">
              <div className="eyebrow">Population trend</div>
              <h2 style={{ marginBottom: 4 }}>Current province trajectory</h2>
              <p className="muted">Official releases with a conservative estimate bridge.</p>
              <Sparkline series={populationSeries} />
            </section>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Focus areas</div>
              <h2>What to inspect in this province</h2>
            </div>
          </div>
          <div className="card-grid">
            {(profile?.focusAreas ?? []).map((item) => (
              <article className="profile-card" key={item}>
                <h3>{item}</h3>
                <p className="muted">
                  This area can later expand into additional demographic modules without changing the core page system.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Metric snapshots</div>
              <h2>Latest official figures</h2>
            </div>
          </div>
          <div className="province-grid">
            {featuredMetrics.map((metricId) => {
              const metric = dataset.metrics.find((entry) => entry.id === metricId)!;
              const official = getLatestObservation(metricId, geography.id, "official");

              return (
                <article className="metric-card" key={metricId}>
                  <div className="eyebrow">{metric.shortLabel}</div>
                  <h3>{metric.label}</h3>
                  <div className="stat-value">{official ? formatNumber(official.value) : "N/A"}</div>
                  <p className="muted">{official ? `Official reading for ${official.period}` : "No provincial series loaded yet."}</p>
                  <Link className="ghost-button" href={`/metrics/${metric.slug}`}>
                    Open metric page
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
