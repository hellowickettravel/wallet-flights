import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { Marquee } from "@/components/ui/marquee";
import { TrustpilotStar, TrustpilotStars } from "@/components/ui/trustpilot-star";
import { reviews, reviewsCopy, type Review } from "@/content/reviews";
import { site } from "@/content/site";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Trustpilot reviews as boarding passes drifting left to right. Real reviews
 * only (src/content/reviews.ts); until there are three, one pass invites a review.
 */
export function ReviewsSection() {
  const enough = reviews.length >= 3;
  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden bg-ink py-16 text-white md:py-24">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 id="reviews-title" className="font-display-tight text-[2rem] leading-tight font-bold md:text-[2.75rem]">
            {reviewsCopy.title}
          </h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/70">{reviewsCopy.intro}</p>
        </div>
        <a
          href={site.trustpilot}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-sun md:self-auto"
        >
          <TrustpilotStar className="size-5" />
          {enough ? reviewsCopy.readAll : reviewsCopy.findUs} on Trustpilot
          <ArrowUpRight className="size-4" weight="bold" aria-hidden />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {enough ? (
        <Marquee label="Reviews" duration={80} className="mt-10 md:mt-14">
          {reviews.map((r) => (
            <div key={r.url} className="pr-5">
              <ReviewPass review={r} />
            </div>
          ))}
        </Marquee>
      ) : (
        <div className="container-page mt-10 md:mt-14">
          <Pass
            stub={
              <>
                <TrustpilotStar className="size-9" />
                <span className="mt-2 text-[0.8125rem] font-semibold text-ink">Trustpilot</span>
              </>
            }
          >
            <p className="font-display-tight text-[1.375rem] leading-snug font-bold text-ink">{reviewsCopy.emptyTitle}</p>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">{reviewsCopy.emptyText}</p>
            <a
              href={site.trustpilot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center gap-2 self-start rounded-full bg-action px-6 font-semibold text-white hover:bg-action-deep"
            >
              {reviewsCopy.emptyCta}
              <ArrowUpRight className="size-4" weight="bold" aria-hidden />
              <span className="sr-only"> on Trustpilot (opens in a new tab)</span>
            </a>
          </Pass>
        </div>
      )}
    </section>
  );
}

/** Boarding-pass shell: main part, a perforated tear line with notches, and a stub. */
function Pass({ children, stub, className }: { children: ReactNode; stub: ReactNode; className?: string }) {
  return (
    <div className={`flex h-full rounded-(--radius-card) bg-white text-ink ${className ?? ""}`}>
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">{children}</div>
      <div aria-hidden className="relative w-0 border-l-2 border-dashed border-line">
        <span className="absolute -top-3 -left-3 size-6 rounded-full bg-ink" />
        <span className="absolute -bottom-3 -left-3 size-6 rounded-full bg-ink" />
      </div>
      <div className="flex w-24 shrink-0 flex-col items-center justify-center p-4 text-center sm:w-28">{stub}</div>
    </div>
  );
}

function ReviewPass({ review }: { review: Review }) {
  return (
    <figure className="h-full w-[20rem] sm:w-[27rem]">
      <Pass
        stub={
          <>
            <span className="font-display-tight text-[2rem] leading-none font-extrabold">{review.rating}</span>
            <span className="text-[0.75rem] text-ink-soft">out of 5</span>
            <a href={review.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[0.75rem] font-semibold hover:underline">
              <TrustpilotStar className="size-3.5" />
              Trustpilot
              <span className="sr-only"> review by {review.name} (opens in a new tab)</span>
            </a>
          </>
        }
      >
        <TrustpilotStars rating={review.rating} />
        <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">“{review.text}”</blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun text-[0.8125rem] font-bold text-ink">{initials(review.name)}</span>
          <span className="font-semibold">{review.name}</span>
        </figcaption>
      </Pass>
    </figure>
  );
}
