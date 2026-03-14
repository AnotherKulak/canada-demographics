import { formatNumber } from "../lib/dataset";
import { Observation } from "../lib/types";

type MetricSummaryProps = {
  label: string;
  official?: Observation;
  estimate?: Observation;
};

export function MetricSummary({ label, official, estimate }: MetricSummaryProps) {
  return (
    <section className="stat-card">
      <div className="eyebrow">Latest reading</div>
      <h3>{label}</h3>
      {official ? (
        <>
          <div className="stat-value">{formatNumber(official.value)}</div>
          <div className="kicker">Official release for {official.period}</div>
        </>
      ) : (
        <p className="muted">No official reading available in the current seed dataset.</p>
      )}
      {estimate ? (
        <div style={{ marginTop: 14 }}>
          <span className="badge estimate">Estimate</span>
          <p className="muted" style={{ marginBottom: 0 }}>
            {formatNumber(estimate.value)} projected for {estimate.period}.
          </p>
        </div>
      ) : null}
    </section>
  );
}
