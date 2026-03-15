import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { dataset } from "../lib/data/build-dataset.ts";

const outDir = resolve(process.cwd(), "data", "derived");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "dataset.json"), `${JSON.stringify(dataset, null, 2)}\n`, "utf8");

console.log(`Wrote derived dataset snapshot to ${outDir}`);
