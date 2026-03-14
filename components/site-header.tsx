import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="shell nav">
      <Link href="/">
        <strong>Canada Demographics</strong>
      </Link>
      <nav className="nav-links" aria-label="Primary">
        <Link href="/">Overview</Link>
        <Link href="/metrics/population-total">Metrics</Link>
        <Link href="/provinces/ontario">Province profiles</Link>
        <Link href="/api/dataset">Dataset API</Link>
      </nav>
    </header>
  );
}
