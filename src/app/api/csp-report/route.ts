// Receives Content-Security-Policy violation reports (see src/lib/csp.ts) and
// writes a one-line summary to the server log. Both report formats arrive
// here: the older report-uri ({"csp-report": {...}}) and the Reporting API
// (an array of {type: "csp-violation", body: {...}}).
type Violation = Record<string, unknown>;

function summarise(v: Violation) {
  const pick = (...keys: string[]) => keys.map((k) => v[k]).find((x) => typeof x === "string") as string | undefined;
  return {
    directive: pick("effectiveDirective", "effective-directive", "violated-directive"),
    blocked: pick("blockedURL", "blocked-uri"),
    page: pick("documentURL", "document-uri"),
  };
}

export async function POST(req: Request) {
  const text = (await req.text().catch(() => "")).slice(0, 20_000);
  let reports: Violation[] = [];
  try {
    const data = JSON.parse(text) as unknown;
    if (Array.isArray(data)) reports = data.filter((r) => r?.type === "csp-violation").map((r) => r.body as Violation);
    else if (data && typeof data === "object" && "csp-report" in data) reports = [(data as { "csp-report": Violation })["csp-report"]];
  } catch {
    return new Response(null, { status: 400 });
  }
  for (const r of reports.slice(0, 10)) if (r) console.warn("CSP report-only violation", JSON.stringify(summarise(r)));
  return new Response(null, { status: 204 });
}
