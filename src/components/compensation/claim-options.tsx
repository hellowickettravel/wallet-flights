"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Check, CopySimple, DownloadSimple, EnvelopeSimple, Handshake, LinkSimple, ShareNetwork, X } from "@phosphor-icons/react";
import { claimPartners, compensationCopy, questions, type What } from "@/content/compensation";
import { formatMoney, type Assessment } from "@/lib/compensation";

const copy = compensationCopy.claim;
const lcopy = compensationCopy.letter;
const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export type LetterFacts = {
  from: string;
  to: string;
  airline: string;
  date: string;
  what: What;
  delayLabel: string;
  noticeLabel: string;
  reasonLabel: string;
  passengers: number;
};

function letterText(f: LetterFacts, r: Assessment, d: { name: string; booking: string; flight: string }) {
  const law =
    r.regime === "EU261"
      ? "Regulation (EC) No 261/2004 (EU261)"
      : "Regulation (EC) No 261/2004 as it forms part of UK law (UK261)";
  const flight = d.flight.trim() || "[flight number]";
  const when = dateFmt.format(new Date(`${f.date}T12:00:00Z`));
  const event =
    f.what === "delayed"
      ? `The flight was delayed and I arrived at my destination ${f.delayLabel.toLowerCase()} late.`
      : f.what === "missed"
        ? `A delay on my booking made me miss my connection, and I arrived at my final destination ${f.delayLabel.toLowerCase()} late.`
        : f.what === "cancelled"
          ? `The flight was cancelled, and I was told ${f.noticeLabel.toLowerCase()} the departure date.`
          : "I was denied boarding against my will, although I had a confirmed booking, checked in on time and had valid travel documents.";
  const reason = f.what !== "denied" && f.reasonLabel ? `\n\nThe reason given was: ${f.reasonLabel.toLowerCase()}. This is not an extraordinary circumstance outside your control.` : "";
  const amount = formatMoney(r.perPassenger, r.currency);
  const total = formatMoney(r.total, r.currency);
  return `Subject: Compensation claim, flight ${flight} on ${when}${d.booking.trim() ? `, booking ${d.booking.trim()}` : ""}

Dear ${f.airline} customer relations team,

I was booked on flight ${flight} from ${f.from} to ${f.to} on ${when}. ${event}${reason}

Under ${law}, passengers on this flight of about ${Math.round(r.distanceKm).toLocaleString("en-GB")} km are entitled to compensation of ${amount} each. There ${f.passengers === 1 ? "was 1 passenger" : `were ${f.passengers} passengers`} on my booking, so I am claiming ${total} in total.

Please confirm within 14 days how you will pay this compensation. I have kept my booking confirmation and boarding passes, and can send copies if you need them.

Yours faithfully,
${d.name.trim() || "[your full name]"}${d.booking.trim() ? `\nBooking reference: ${d.booking.trim()}` : ""}
`;
}

function LetterDialog({ open, onClose, facts, result }: { open: boolean; onClose: () => void; facts: LetterFacts; result: Assessment }) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [d, setD] = useState({ name: "", booking: "", flight: "" });
  const [copied, setCopied] = useState(false);
  const text = letterText(facts, result, d);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  async function copyLetter() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      (document.getElementById(`${id}-text`) as HTMLTextAreaElement | null)?.select();
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "flight-compensation-claim.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const field = "h-12 w-full rounded-xl bg-white px-4 text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-action";
  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(44rem,calc(100%-2rem))] max-w-none rounded-(--radius-panel) bg-white p-0 text-ink shadow-(--shadow-pop) backdrop:bg-ink/55"
    >
      <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-title`} className="font-display-tight text-[1.5rem] font-bold">
              {lcopy.title}
            </h2>
            <p className="mt-1 text-ink-soft">{lcopy.intro}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={lcopy.close} className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full ring-1 ring-line hover:bg-mist">
            <X className="size-4" weight="bold" aria-hidden />
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {(
            [
              ["name", lcopy.name, "name"],
              ["booking", lcopy.booking, "off"],
              ["flight", lcopy.flight, "off"],
            ] as const
          ).map(([k, label, ac]) => (
            <div key={k}>
              <label htmlFor={`${id}-${k}`} className="mb-1.5 block text-[0.8125rem] font-medium text-ink-soft">
                {label}
              </label>
              <input id={`${id}-${k}`} autoComplete={ac} value={d[k]} onChange={(e) => setD({ ...d, [k]: e.target.value })} className={field} />
            </div>
          ))}
        </div>
        <label htmlFor={`${id}-text`} className="sr-only">
          Letter text
        </label>
        <textarea
          id={`${id}-text`}
          readOnly
          value={text}
          rows={14}
          className="mt-5 w-full resize-y rounded-xl bg-mist p-4 font-sans text-[0.9375rem] leading-relaxed text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-action"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copyLetter} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-action px-5 font-semibold text-white hover:bg-action-deep">
            {copied ? <Check className="size-4" weight="bold" aria-hidden /> : <CopySimple className="size-4" weight="bold" aria-hidden />}
            <span aria-live="polite">{copied ? lcopy.copied : lcopy.copy}</span>
          </button>
          <button type="button" onClick={download} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink ring-1 ring-line hover:bg-mist">
            <DownloadSimple className="size-4" weight="bold" aria-hidden />
            {lcopy.download}
          </button>
        </div>
      </div>
    </dialog>
  );
}

/**
 * TODO(confirm): affiliate IDs for each claim partner (src/content/compensation.ts).
 * Once known, add the partner to src/content/affiliates.ts and return
 * affiliateUrl(id, p.url, `compensation_${p.id}`) here, marked sponsored.
 */
function partnerHref(p: (typeof claimPartners)[number]) {
  return { href: p.url, sponsored: p.affiliate !== null };
}

export function ClaimOptions({ result, facts, shareUrl }: { result: Assessment; facts: LetterFacts; shareUrl: string }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const canShare = typeof navigator !== "undefined" && "share" in navigator;
  const owed = result.verdict !== "not";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      window.prompt("Copy this link", shareUrl);
    }
  }

  return (
    <section aria-labelledby="claim-title" className="mt-10 md:mt-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 id="claim-title" className="font-display-tight text-[1.75rem] font-bold text-ink md:text-[2.25rem]">
            {copy.title}
          </h2>
          <p className="mt-2 text-ink-soft">{copy.intro}</p>
        </div>
      </div>

      {!owed && (
        <p role="status" className="mt-6 rounded-(--radius-card) bg-white p-4 text-[0.9375rem] text-ink ring-1 ring-line">
          <span className="font-semibold">{copy.notOwed.title}</span> {copy.notOwed.text}
        </p>
      )}
      <ul className="mt-6 grid gap-4 lg:grid-cols-3">
        <li className="flex flex-col rounded-(--radius-card) bg-white p-6 ring-2 ring-ink">
          <span className="grid size-11 place-items-center rounded-full bg-ink text-sun">
            <EnvelopeSimple className="size-5" weight="fill" aria-hidden />
          </span>
          <h3 className="mt-4 text-[1.1875rem] font-bold text-ink">{copy.yourself.name}</h3>
          <p className="mt-1 font-semibold text-fare">{copy.yourself.price}</p>
          <ul className="mt-4 flex-1 space-y-2 text-[0.9375rem] text-ink-soft">
            {copy.yourself.points.map((p) => (
              <li key={p} className="flex gap-2">
                <Check className="mt-1 size-4 shrink-0 text-fare" weight="bold" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setLetterOpen(true)}
            disabled={!owed}
            className="mt-6 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-action px-6 font-semibold text-white transition-colors hover:bg-action-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copy.yourself.cta}
          </button>
        </li>

        {claimPartners.map((p) => {
          const link = partnerHref(p);
          return (
            <li key={p.id} className="flex flex-col rounded-(--radius-card) bg-white p-6 ring-1 ring-line">
              <span className="grid size-11 place-items-center rounded-full bg-mist text-action">
                <Handshake className="size-5" weight="fill" aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.1875rem] font-bold text-ink">{p.name}</h3>
              {/* TODO(confirm): partner fee from the partner's own site. */}
              <p className="mt-1 font-semibold text-ink-soft">{p.fee ?? "Check their fee before you claim"}</p>
              <ul className="mt-4 flex-1 space-y-2 text-[0.9375rem] text-ink-soft">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-2">
                    <Check className="mt-1 size-4 shrink-0 text-action" weight="bold" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
              <a
                href={link.href}
                target="_blank"
                rel={link.sponsored ? "sponsored noopener" : "noopener"}
                data-sub={`compensation_${p.id}`}
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-ink ring-1 ring-line transition-colors hover:bg-mist hover:ring-ink/30"
              >
                {copy.partnerCta(p.name)}
                <ArrowUpRight className="size-4" weight="bold" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {link.sponsored && <p className="mt-2 text-center text-[0.75rem] text-ink-soft">{copy.partnerNote}</p>}
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-col gap-4 rounded-(--radius-card) bg-white p-5 ring-1 ring-line sm:flex-row sm:items-center">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-action">
          <LinkSimple className="size-5" weight="bold" aria-hidden />
        </span>
        <p className="flex-1">
          <span className="block font-semibold text-ink">{copy.share.title}</span>
          <span className="block text-[0.9375rem] text-ink-soft">{copy.share.text}</span>
        </p>
        <div className="flex gap-2">
          {canShare && (
            <button
              type="button"
              onClick={() => navigator.share({ title: compensationCopy.title, url: shareUrl }).catch(() => {})}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink ring-1 ring-line hover:bg-mist sm:hidden"
            >
              <ShareNetwork className="size-4" weight="bold" aria-hidden />
              {copy.share.native}
            </button>
          )}
          <button type="button" onClick={copyLink} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-5 font-semibold text-white hover:bg-ink/90">
            {shared ? <Check className="size-4" weight="bold" aria-hidden /> : <CopySimple className="size-4" weight="bold" aria-hidden />}
            <span aria-live="polite">{shared ? copy.share.done : copy.share.cta}</span>
          </button>
        </div>
      </div>

      <LetterDialog open={letterOpen} onClose={() => setLetterOpen(false)} facts={facts} result={result} />
    </section>
  );
}

export const labelOf = {
  delay: (v: string) => questions.delay.options.find((o) => o.v === v)?.label ?? "",
  notice: (v: string) => questions.notice.options.find((o) => o.v === v)?.label ?? "",
  reason: (v: string) => (v === "none" ? "" : (questions.reason.options.find((o) => o.v === v)?.label ?? "")),
};
