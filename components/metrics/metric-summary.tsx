import { formatNumber } from "../../lib/data/format";
import { Observation } from "../../lib/types/dataset";

type MetricSummaryProps = {
  label: string;
  official?: Observation;
  estimate?: Observation;
};

export function MetricSummary({ label, official, estimate }: MetricSummaryProps) {
  return (
    <section className="surface p-6 sm:p-8">
      <div className="eyebrow">Latest reading</div>
      <h3 className="mt-4 max-w-sm font-[family-name:var(--font-display)] text-3xl leading-tight">{label}</h3>
      {official ? (
        <>
          <div className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-none sm:text-6xl">
            {formatNumber(official.value)}
          </div>
          <div className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">Official release for {official.period}</div>
        </>
      ) : (
        <p className="mt-5 text-base leading-8 text-muted-foreground">No official reading available in the current seed dataset.</p>
      )}
      {estimate ? (
        <div className="mt-6 rounded-3xl border border-border/70 bg-background/55 p-4">
          <span className="badge badge-estimate">Estimate</span>
          <p className="mt-3 mb-0 text-sm leading-7 text-muted-foreground">
            {formatNumber(estimate.value)} projected for {estimate.period}.
          </p>
        </div>
      ) : null}
    </section>
  );
}
