import { llmsFullTxt } from "@/lib/llms";

/** Full text of help, destinations, routes and guides for AI assistants. Static: built from src/content. */
export async function GET() {
  return new Response(await llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
