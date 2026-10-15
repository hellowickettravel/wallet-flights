import { llmsTxt } from "@/lib/llms";

/** Site map for AI assistants (https://llmstxt.org). Static: built from src/content. */
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
