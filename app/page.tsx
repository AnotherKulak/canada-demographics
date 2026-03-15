import Link from "next/link";
import Image from "next/image";

import { HighlightCard } from "../components/home/highlight-card";
import { SiteHeader } from "../components/layout/site-header";
import { Sparkline } from "../components/metrics/sparkline";
import { SectionReveal } from "../components/shared/section-reveal";
import { futureDomainNotes, roadmapItems } from "../content/home";
import { formatNumber } from "../lib/data/format";
import { getMetricObservations } from "../lib/data/queries";
import { getHomepagePayload } from "../lib/payloads/homepage";

export default function HomePage() {
  const payload = getHomepagePayload();
  const populationSeries = getMetricObservations("population-total", "ca");

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="app-shell pb-20 pt-8 sm:pt-12">
        <SectionReveal className="relative overflow-hidden rounded-[36px] border border-border/70 bg-secondary/60 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-primary/12 via-transparent to-cyan-400/10"
          />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.8fr)] lg:items-end">
            <div>
              <div className="eyebrow">Canadian demographic intelligence</div>
              <h1 className="headline-display mt-5 max-w-[11ch]">A trusted public hub for population and residency-status data.</h1>
              <p className="lede mt-6">
                This MVP starts with a strong population vertical, combining official releases, clear methodology,
                province-level drill-downs, and conservative between-release nowcasts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="button-primary" href="/metrics/population-total">
                  Explore flagship metric
                </Link>
                <Link className="button-secondary" href="/provinces/ontario">
                  View province profile
                </Link>
              </div>
            </div>

            <aside className="surface relative overflow-hidden p-6 sm:p-8" aria-labelledby="latest-signal-heading">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/16 to-transparent"
              />
              <div className="relative">
                <div className="mb-5 overflow-hidden rounded-[24px] border border-border/70 bg-background/35">
                  <Image
                    src="/illustrations/home-hero.svg"
                    alt="Illustration of a demographic dashboard with trend lines and data panels"
                    width={920}
                    height={700}
                    className="h-auto w-full"
                    priority
                  />
                </div>
                <div className="eyebrow">Latest signal</div>
                <h2 id="latest-signal-heading" className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
                  {payload.headlineMetric?.label}
                </h2>
                <div className="mt-5 font-[family-name:var(--font-display)] text-5xl leading-none sm:text-6xl">
                  {payload.headlineObservation ? formatNumber(payload.headlineObservation.value) : "Pending"}
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {payload.headlineObservation?.kind === "estimate" ? "Estimated" : "Official"} reading for{" "}
                  {payload.headlineObservation?.period}. Dataset refreshed {payload.generatedAt.slice(0, 10)}.
                </p>
                <Sparkline series={populationSeries} label="National population trend" />
              </div>
            </aside>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14" delay={0.05}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">What this release covers</div>
              <h2 className="section-heading mt-3">Built to explain, unify, and extend</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              The current release is designed as a trustworthy foundation: transparent source lineage, reusable metric
              modules, and a presentation layer built for deeper public interpretation.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {payload.highlights.map((card) => (
              <HighlightCard key={card.id} card={card} />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14 grid gap-5 lg:grid-cols-2" delay={0.1}>
          <article className="surface p-6 sm:p-8">
            <div className="eyebrow">Architecture direction</div>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
              Demographics first, flexible expansion later
            </h3>
            <ul className="mt-6 grid gap-3">
              {futureDomainNotes.map((item) => (
                <li key={item} className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4 text-sm leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="surface p-6 sm:p-8">
            <div className="eyebrow">Near-term roadmap</div>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
              What the platform is ready to add next
            </h3>
            <ul className="mt-6 grid gap-3">
              {roadmapItems.map((item) => (
                <li key={item} className="rounded-2xl border border-border/70 bg-background/55 px-4 py-4 text-sm leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </SectionReveal>

        <SectionReveal className="mt-14" delay={0.15}>
          <div className="surface p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="eyebrow">Signals to watch</div>
                <h2 className="section-heading mt-3">MVP commitments</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                Each commitment points toward a platform that stays legible for public users while scaling to richer
                demographic coverage.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {payload.roadmapItems.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </main>
    </>
  );
}
