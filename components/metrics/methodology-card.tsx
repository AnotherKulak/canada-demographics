import { MethodologySummary, SourceReference } from "../../lib/types/dataset";

type MethodologyCardProps = {
  methodology: MethodologySummary;
  sources: SourceReference[];
};

export function MethodologyCard({ methodology, sources }: MethodologyCardProps) {
  return (
    <section className="surface h-full p-6 sm:p-8">
      <div className="eyebrow">Methodology and lineage</div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight">{methodology.title}</h3>
      <p className="mt-3 text-base leading-8 text-muted-foreground">{methodology.summary}</p>
      <ul className="mt-6 grid gap-3">
        {methodology.caveats.map((caveat) => (
          <li key={caveat} className="rounded-2xl border border-border/70 bg-background/50 px-4 py-4 text-sm leading-7 text-muted-foreground">
            {caveat}
          </li>
        ))}
      </ul>
      <div className="mt-8 overflow-hidden rounded-3xl border border-border/80">
        <table className="table-base">
          <caption className="sr-only">Sources used for this metric and their release dates</caption>
          <thead className="bg-background/55">
          <tr>
            <th scope="col">Source</th>
            <th scope="col">Release date</th>
          </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.id}>
                <td>
                  <span className="block font-medium text-card-foreground">{source.organization}</span>
                  <span className="mt-1 block text-muted-foreground">{source.name}</span>
                </td>
                <td>{source.releaseDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
