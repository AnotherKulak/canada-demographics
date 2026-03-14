import Link from "next/link";

import { formatNumber, listProvinceSnapshots } from "../lib/dataset";

type ProvinceTableProps = {
  metricId: string;
};

export function ProvinceTable({ metricId }: ProvinceTableProps) {
  const rows = listProvinceSnapshots(metricId);

  return (
    <section className="chart-card">
      <div className="eyebrow">Provincial detail</div>
      <h3>Latest official province snapshots</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Province</th>
            <th>Period</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ geography, latest }) =>
            latest ? (
              <tr key={geography.id}>
                <td>
                  <Link href={`/provinces/${geography.slug}`}>{geography.name}</Link>
                </td>
                <td>{latest.period}</td>
                <td>{formatNumber(latest.value)}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </section>
  );
}
