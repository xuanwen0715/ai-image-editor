import type { MetadataRoute } from "next";
import manifest from "../manifest";

export const runtime = "edge";

export async function GET() {
  const data = (manifest() as MetadataRoute.Manifest);
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/manifest+json; charset=UTF-8" },
  });
}
