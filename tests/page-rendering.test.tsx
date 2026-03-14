import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";
import MetricPage from "../app/metrics/[metricSlug]/page";
import ProvincePage from "../app/provinces/[provinceSlug]/page";

describe("page rendering", () => {
  it("renders the homepage with the main narrative", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("trusted public hub");
    expect(html).toContain("Canadian demographic intelligence");
  });

  it("renders a metric page with methodology context", async () => {
    const element = await MetricPage({ params: Promise.resolve({ metricSlug: "population-total" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Methodology and lineage");
    expect(html).toContain("Official releases and estimate overlay for Canada");
    expect(html).toContain("Scope: Canada");
  });

  it("renders a province page with provincial snapshots", async () => {
    const element = await ProvincePage({ params: Promise.resolve({ provinceSlug: "ontario" }) });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Ontario");
    expect(html).toContain("Latest official figures");
  });
});
