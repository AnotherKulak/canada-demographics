import Link from "next/link";

import { HighlightCard as HighlightCardType } from "../../lib/types/dataset";

type HighlightCardProps = {
  card: HighlightCardType;
};

export function HighlightCard({ card }: HighlightCardProps) {
  return (
    <article className="surface-soft flex h-full flex-col gap-5 p-6">
      <div className="eyebrow">{card.eyebrow}</div>
      <div className="space-y-3">
        <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-card-foreground">{card.title}</h3>
        <p className="text-sm leading-7 text-muted-foreground">{card.body}</p>
      </div>
      <Link href={`/metrics/${card.metricId}`} className="button-secondary mt-auto w-fit">
        Open metric
      </Link>
    </article>
  );
}
