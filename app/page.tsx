import Link from "next/link";

import { HighlightCard } from "../components/highlight-card";
import { SiteHeader } from "../components/site-header";
import { Sparkline } from "../components/sparkline";
import { getHomepagePayload } from "../lib/api";
import { futureDomainNotes, roadmapItems } from "../lib/content";
import { formatNumber, getMetricObservations } from "../lib/dataset";

export default function HomePage() {
  const payload = getHomepagePayload();
  const populationSeries = getMetricObservations("population-total", "ca");

  return (
    <>
      <SiteHeader />
      <main className="page shell">
        <section className="hero">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Canadian demographic intelligence</div>
              <h1 className="headline">A trusted public hub for population and residency-status data.</h1>
              <p className="lede">
                This MVP starts with a strong population vertical, combining official releases, clear methodology,
                province-level drill-downs, and conservative between-release nowcasts.
              </p>
              <div className="cta-row">
                <Link className="button" href="/metrics/population-total">
                  Explore flagship metric
                </Link>
                <Link className="ghost-button" href="/provinces/ontario">
                  View province profile
                </Link>
              </div>
            </div>
            <aside className="panel">
              <div className="eyebrow">Latest signal</div>
              <h2 style={{ marginBottom: 8 }}>{payload.headlineMetric?.label}</h2>
              <div className="stat-value">
                {payload.headlineObservation ? formatNumber(payload.headlineObservation.value) : "Pending"}
              </div>
              <p className="muted">
                {payload.headlineObservation?.kind === "estimate" ? "Estimated" : "Official"} reading for{" "}
                {payload.headlineObservation?.period}. Dataset refreshed {payload.generatedAt.slice(0, 10)}.
              </p>
              <Sparkline series={populationSeries} />
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow">What this release covers</div>
              <h2>Built to explain, unify, and extend</h2>
            </div>
          </div>
          <div className="card-grid">
            {payload.highlights.map((card) => (
              <HighlightCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className="section panel-grid">
          <div className="metric-grid">
            <article className="chart-card">
              <div className="eyebrow">Architecture direction</div>
              <h3>Demographics first, flexible expansion later</h3>
              <ul className="list">
                {futureDomainNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="chart-card">
              <div className="eyebrow">Near-term roadmap</div>
              <h3>What the platform is ready to add next</h3>
              <ul className="list">
                {roadmapItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow">Signals to watch</div>
              <h2>MVP commitments</h2>
            </div>
          </div>
          <div className="pill-row">
            {payload.roadmapItems.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
