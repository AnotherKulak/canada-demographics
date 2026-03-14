import { MethodologySummary, SourceReference } from "../lib/types";

type MethodologyCardProps = {
  methodology: MethodologySummary;
  sources: SourceReference[];
};

export function MethodologyCard({ methodology, sources }: MethodologyCardProps) {
  return (
    <section className="method-card">
      <div className="eyebrow">Methodology and lineage</div>
      <h3>{methodology.title}</h3>
      <p className="muted">{methodology.summary}</p>
      <ul className="meta-list">
        {methodology.caveats.map((caveat) => (
          <li key={caveat}>{caveat}</li>
        ))}
      </ul>
      <table className="table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id}>
              <td>{source.organization}: {source.name}</td>
              <td>{source.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
