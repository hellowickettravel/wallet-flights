import { llmsFullTxt } from "@/lib/llms";

/** Full text of help, destinations and guides for AI assistants. Static: built from src/content. */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
