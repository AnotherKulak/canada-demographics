import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

import { SiteHeader } from "../../../components/layout/site-header";
import { Sparkline } from "../../../components/metrics/sparkline";
import { ExportButton } from "../../../components/shared/export-button";
import { SectionReveal } from "../../../components/shared/section-reveal";
import { formatNumber } from "../../../lib/data/format";
import { getProvincePayload } from "../../../lib/payloads/province-page";

type ProvincePageProps = {
  params: Promise<{ provinceSlug: string }>;
};

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { provinceSlug } = await params;
  const payload = getProvincePayload(provinceSlug);

  if (!payload) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="app-shell pb-20 pt-8 sm:pt-12">
        <SectionReveal className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.85fr)]">
          <section className="surface p-6 sm:p-8 lg:p-10">
            <div className="mb-6 overflow-hidden rounded-[28px] border border-border/70 bg-background/30">
              <Image
                src="/illustrations/province-hero.svg"
                alt="Illustration of a province profile with map, chart, and regional detail cards"
                width={920}
                height={700}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="eyebrow">Province profile</div>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none sm:text-6xl">
              {payload.geography.name}
            </h1>
            <p className="lede mt-5">{payload.profile?.headline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary" href="/metrics/population-total">
                View headline metric
              </Link>
              <ExportButton
                filename={`${payload.geography.slug}-population.csv`}
                content={payload.populationCsv}
              />
            </div>
          </section>

          <section className="surface p-6 sm:p-8" aria-labelledby="province-trend-heading">
            <div className="eyebrow">Population trend</div>
            <h2 id="province-trend-heading" className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">
              Current province trajectory
            </h2>
            <p className="mt-3 text-base leading-8 text-muted-foreground">Official releases with a conservative estimate bridge.</p>
            <Sparkline series={payload.populationSeries} label={`${payload.geography.name} population trend`} />
          </section>
        </SectionReveal>

        <SectionReveal className="mt-14" delay={0.05}>
          <div className="mb-6">
            <div className="eyebrow">Focus areas</div>
            <h2 className="section-heading mt-3">What to inspect in this province</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(payload.profile?.focusAreas ?? []).map((item) => (
              <article className="surface-soft p-6" key={item}>
                <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight">{item}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  This area can later expand into additional demographic modules without changing the core page system.
                </p>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14" delay={0.1}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">Metric snapshots</div>
              <h2 className="section-heading mt-3">Latest official figures</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              These cards surface the most recent official provincial readings and link back to their full metric views.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {payload.snapshotMetrics.map(({ metric, official }) => {
              return (
                <article className="surface p-6 sm:p-8" key={metric.id}>
                  <div className="eyebrow">{metric.shortLabel}</div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">{metric.label}</h3>
                  <div className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-none">
                    {official ? formatNumber(official.value) : "N/A"}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {official ? `Official reading for ${official.period}` : "No provincial series loaded yet."}
                  </p>
                  <Link className="button-secondary mt-6" href={`/metrics/${metric.slug}`}>
                    Open metric page
                  </Link>
                </article>
              );
            })}
          </div>
        </SectionReveal>
      </main>
    </>
  );
}
