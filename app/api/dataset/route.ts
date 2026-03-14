import { NextResponse } from "next/server";

import { dataset } from "../../../lib/dataset";

export function GET() {
  return NextResponse.json(dataset);
}
