import Link from "next/link";

import { formatNumber } from "../../lib/data/format";
import { listProvinceSnapshots } from "../../lib/data/queries";

type ProvinceTableProps = {
  metricId: string;
};

export function ProvinceTable({ metricId }: ProvinceTableProps) {
  const rows = listProvinceSnapshots(metricId);

  return (
    <section className="surface p-6 sm:p-8">
      <div className="eyebrow">Provincial detail</div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">Latest official province snapshots</h3>
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80">
        <table className="table-base">
          <caption className="sr-only">Latest official provincial values for the current metric</caption>
          <thead className="bg-background/55">
          <tr>
            <th scope="col">Province</th>
            <th scope="col">Period</th>
            <th scope="col">Value</th>
          </tr>
          </thead>
          <tbody>
            {rows.map(({ geography, latest }) =>
              latest ? (
                <tr key={geography.id}>
                  <td>
                    <Link
                      href={`/provinces/${geography.slug}`}
                      className="font-medium text-primary underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {geography.name}
                    </Link>
                  </td>
                  <td>{latest.period}</td>
                  <td>{formatNumber(latest.value)}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
