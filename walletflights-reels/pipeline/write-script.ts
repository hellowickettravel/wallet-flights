// Step 2 — turn a calendar row + the render-day fares into scripts/<day>.json:
// hook, tag, spoken segments (say = what Kokoro reads, text = what captions show),
// series data for the template, the Instagram caption, and an `uncertain` list for review.
//
// Formula series (GuessTheFare, MapIt) are generated here. Copy-led series take their beats from
// the calendar row's `copy` field ({ segments, data }), written by Claude in the session; tokens
// like {fare0} / {fare0.say} in that copy resolve to the live fare so prices are never typed by hand.
import { args, exists, log, p, pad, PLACES, readJson, row, sayMoney, sayPriceShort, showMoney, words, writeJson, type CalRow } from "./lib";
import { fetchFares, type FareRecord } from "./fetch-fares";

type Seg = { id: string; say: string; text: string; pauseAfterMs?: number };
export type Script = {
  day: number;
  date: string;
  series: CalRow["series"];
  audience: "UK" | "US";
  voice: string;
  hook: string;
  tag: string;
  cta: string;
  segments: Seg[];
  data: Record<string, unknown>;
  fares: FareRecord[];
  caption: { keywordLine: string; valueLine: string; prompt: string; hashtags: string[] };
  brollQueries: string[];
  sources: { claim: string; url: string; checkedOn: string }[];
  uncertain: string[];
};

const TAGS: Record<CalRow["series"], string> = {
  GuessTheFare: "GUESS THE FARE",
  CheaperThan: "CHEAPER THAN…",
  MapIt: "MAP IT",
  BookingHack: "BOOKING HACK",
  PlaneSecret: "PLANE SECRETS",
  Pov: "POV",
  HotTake: "HOT TAKE",
  WeekendReceipt: "WEEKEND FOR £X",
};

const CITY_TAG: Record<string, string> = {
  London: "#londontravel",
  Manchester: "#manchestertravel",
  "New York": "#nyctravel",
  Chicago: "#chicagotravel",
  "Los Angeles": "#latravel",
  Atlanta: "#atlantatravel",
};
const DEST_TAG: Record<string, string> = {
  Rome: "#romeitaly",
  Lisbon: "#lisbonportugal",
  Barcelona: "#barcelonaspain",
  Dubai: "#dubaitravel",
  "Cancún": "#cancunmexico",
  "Mexico City": "#mexicocity",
  Tokyo: "#tokyotravel",
};

const fmtDate = (iso: string, us: boolean) => {
  const [, m, d] = iso.split("-").map(Number);
  const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return us ? `${mon} ${d}` : `${d} ${mon}`;
};

/** Round a decoy to a fare-looking number ending in 9. */
const decoy = (n: number) => Math.max(19, Math.round(n / 10) * 10 - 1);

const fareUncertain = (fares: FareRecord[]) =>
  fares
    .filter((f) => f.status !== "live")
    .map((f) => `${f.from}→${f.to} ${showMoney(f.price, f.currency)} NOT re-checked on walletflights.com (${f.error ?? "unreachable"}); showing the ${f.foundOn} plan figure`);

const resolveTokens = (s: string, fares: FareRecord[]) =>
  s.replace(/\{fare(\d+)(\.say)?\}/g, (_, i, say) => {
    const f = fares[Number(i)];
    if (!f) throw new Error(`Token {fare${i}} has no fare in the row`);
    return say ? sayMoney(f.price, f.currency) : showMoney(f.price, f.currency);
  });

export const writeScript = async (day: number, opts: { refetch?: boolean } = {}) => {
  const r = row(day);
  const us = r.audience === "US";
  const faresFile = p("scripts", `${pad(day)}.fares.json`);
  const fares: FareRecord[] =
    r.fares.length === 0 ? [] : !opts.refetch && exists(faresFile) ? readJson<{ fares: FareRecord[] }>(faresFile).fares : await fetchFares(day);
  const uncertain = [...fareUncertain(fares), ...r.claims.map((c) => `Claim to verify: ${c}`)];
  const base = {
    day,
    date: r.date,
    series: r.series,
    audience: r.audience,
    voice: us ? "af_heart" : "bf_emma",
    hook: r.hook,
    tag: r.series === "WeekendReceipt" && us ? "WEEKEND FOR $X" : TAGS[r.series],
    cta: r.cta,
    fares,
    brollQueries: r.broll,
    sources: [] as Script["sources"],
  };
  const tags = (dest?: string) =>
    [
      "#cheapflights",
      CITY_TAG[r.fares[0]?.from ?? (us ? "New York" : "London")] ?? (us ? "#ustravel" : "#uktravel"),
      (dest && DEST_TAG[dest]) || (us ? "#ustravel" : "#uktravel"),
      "#budgettravel",
      r.series === "PlaneSecret" || r.series === "BookingHack" ? "#flyinghacks" : "#travelhacks",
    ].slice(0, 5);

  let script: Script;

  if (r.series === "GuessTheFare") {
    const f = fares[0];
    const options = r.options?.length ? r.options : [f.price, decoy(f.price * 2.7), decoy(f.price * 5)].sort((a, b) => a - b);
    if (!r.options?.length) uncertain.push(`Decoy options ${options.filter((o) => o !== f.price).map((o) => showMoney(o, f.currency)).join(", ")} are made-up wrong answers (labelled by the reveal)`);
    if (!options.includes(f.price)) {
      // Live fare moved: keep the plan's decoys, swap the old answer for the live one.
      const i = options.indexOf(f.snapshotPrice);
      options.splice(i >= 0 ? i : 0, 1, f.price);
      options.sort((a, b) => a - b);
    }
    const trip = f.trip === "return" ? (us ? "round trip" : "return") : "one way";
    const unit = f.currency === "GBP" ? "pounds" : "dollars";
    const optSay = options.map((o, i) => (i === options.length - 1 ? `or ${sayPriceShort(o)} ${unit}` : sayPriceShort(o))).join(", ");
    const optText = options.map((o, i) => (i === options.length - 1 ? `or ${showMoney(o, f.currency)}` : showMoney(o, f.currency))).join(", ");
    script = {
      ...base,
      segments: [
        { id: "hook", say: r.hook.replace(/\.$/, "") + (r.hook.endsWith("?") ? "" : "."), text: r.hook, pauseAfterMs: 250 },
        { id: "options", say: `${optSay[0].toUpperCase()}${optSay.slice(1)}?`, text: `${optText}?`, pauseAfterMs: 200 },
        { id: "countdown", say: "Three, two, one.", text: "3, 2, 1", pauseAfterMs: 120 },
        { id: "reveal", say: `${sayMoney(f.price, f.currency).replace(/^./, (c) => c.toUpperCase())}, ${trip}.`, text: `${showMoney(f.price, f.currency)} ${trip}.`, pauseAfterMs: 250 },
        { id: "cta", say: `${r.cta}.`, text: `${r.cta}.` },
      ],
      data: { fare: { ...f }, options, city: f.to },
      caption: {
        keywordLine: `Cheap flights ${f.from} to ${f.to}: ${showMoney(f.price, f.currency)} ${trip} this week`,
        valueLine: `Found ${fmtDate(f.foundOn, us)} on a cheapest-first search. Prices move, so check your dates.`,
        prompt: `Comment ${r.keyword ?? f.to.toUpperCase()} and I'll send you the cheapest dates.`,
        hashtags: tags(f.to),
      },
      uncertain,
    };
  } else if (r.series === "MapIt") {
    const budget = r.budget as { amount: number; currency: "GBP" | "USD" };
    const origin = r.origin as string;
    const within = fares.filter((f) => f.price <= budget.amount).sort((a, b) => a.price - b.price);
    fares.filter((f) => f.price > budget.amount).forEach((f) => uncertain.push(`${f.to} dropped: live fare ${showMoney(f.price, f.currency)} is over the ${showMoney(budget.amount, budget.currency)} budget`));
    uncertain.push(`Plan says "add any other sub-${showMoney(budget.amount, budget.currency)} route live that day": needs a look at walletflights.com/deals on render day`);
    if (/winter/i.test(r.hook)) uncertain.push(`Hook says "this winter": check the fares' travel dates fall in winter`);
    const trip = us ? "round trip" : "return";
    const ask = us ? "Pick one." : "Where would you go?";
    script = {
      ...base,
      segments: [
        {
          id: "hook",
          say: r.hook.replace(/£(\d+)/, (_, n) => `${words(Number(n))} pounds`).replace(/\$(\d+)/, (_, n) => `${words(Number(n), true)} dollars`).replace(/^How far (.*) gets you/, "How far does $1 get you") + "?",
          text: r.hook.replace(/^How far (.*) gets you/, "How far does $1 get you") + "?",
          pauseAfterMs: 700,
        },
        // Long pauses let each arc land before the next city is named.
        ...within.map((f, i) => ({ id: `stop-${i}`, say: `${f.to}. ${sayMoney(f.price, f.currency).replace(/^./, (c) => c.toUpperCase())} ${trip}.`, text: `${f.to}. ${showMoney(f.price, f.currency)} ${trip}.`, pauseAfterMs: 1000 })),
        {
          id: "end",
          say: `${within.length === 2 ? "Both" : "All"} under ${sayMoney(budget.amount, budget.currency)}. ${ask} Comment the city.`,
          text: `${within.length === 2 ? "Both" : "All"} under ${showMoney(budget.amount, budget.currency)}. ${ask} Comment the city.`,
        },
      ],
      data: {
        origin: { name: origin, lngLat: PLACES[origin] },
        budgetLabel: showMoney(budget.amount, budget.currency),
        stops: within.map((f) => ({ name: f.to, lngLat: PLACES[f.to], fare: f })),
        endLine: ask,
        mapStyle: process.env.MAP_STYLE === "openfreemap" ? "openfreemap" : "offline",
      },
      caption: {
        keywordLine: `How far ${showMoney(budget.amount, budget.currency)} gets you from ${origin}: ${within.map((f) => `${f.to} ${showMoney(f.price, f.currency)}`).join(", ")} ${trip}`,
        valueLine: `Cheapest ${trip} fares found ${fmtDate(within[0]?.foundOn ?? r.date, us)}. Prices move, so check your dates.`,
        prompt: `${ask} Comment the city and I'll send you the cheapest dates.`,
        hashtags: tags(),
      },
      uncertain,
    };
  } else {
    const copy = r.copy as { segments: Seg[]; data: Record<string, unknown>; caption: Script["caption"]; sources?: Script["sources"] } | undefined;
    if (!copy) throw new Error(`Day ${day} (${r.series}) needs authored copy: add a "copy" field to its calendar row`);
    const data = JSON.parse(resolveTokens(JSON.stringify(copy.data), fares));
    script = {
      ...base,
      segments: copy.segments.map((s) => ({ ...s, say: resolveTokens(s.say, fares), text: resolveTokens(s.text, fares) })),
      data,
      caption: { ...copy.caption, keywordLine: resolveTokens(copy.caption.keywordLine, fares) },
      sources: copy.sources ?? [],
      uncertain,
    };
  }

  const words_ = script.segments.map((s) => s.say).join(" ").split(/\s+/).length;
  if (words_ > Math.max(25, r.lengthSec * 2.4)) script.uncertain.push(`VO is ${words_} words for a ${r.lengthSec}s target; may run long`);
  if (script.caption.keywordLine.length > 125) script.uncertain.push(`Caption keyword line is ${script.caption.keywordLine.length} chars (>125)`);
  writeJson(p("scripts", `${pad(day)}.json`), script);
  log(day, "write-script", `${r.series}, ${script.segments.length} segments, ${words_} words`);
  return script;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const { days, flags } = args();
  for (const d of days) await writeScript(d, { refetch: flags.has("--refetch") });
}
