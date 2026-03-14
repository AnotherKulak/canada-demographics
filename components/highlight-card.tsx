import Link from "next/link";

import { HighlightCard as HighlightCardType } from "../lib/types";

type HighlightCardProps = {
  card: HighlightCardType;
};

export function HighlightCard({ card }: HighlightCardProps) {
  return (
    <article className="insight-card">
      <div className="eyebrow">{card.eyebrow}</div>
      <h3>{card.title}</h3>
      <p className="muted">{card.body}</p>
      <Link href={`/metrics/${card.metricId}`} className="ghost-button">
        Open metric
      </Link>
    </article>
  );
}
