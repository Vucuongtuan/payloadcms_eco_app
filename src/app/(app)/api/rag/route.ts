import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  try {
  } catch (err) {
    return new Response("Error processing request", { status: 500 });
  }
}
