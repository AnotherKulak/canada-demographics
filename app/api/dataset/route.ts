import { NextResponse } from "next/server";

import { dataset } from "../../../lib/data/build-dataset";

export function GET() {
  return NextResponse.json(dataset);
}
