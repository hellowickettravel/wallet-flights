import clsx from "clsx";

/**
 * Loading placeholders: solid bones that breathe gently (still with reduced
 * motion). Wrappers are aria-hidden with one sr-only status line, so
 * screen readers hear "Loading…" once instead of a list of empty boxes.
 */
export function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={clsx("skeleton block rounded-lg", className)} style={style} />;
}

function Status({ label }: { label: string }) {
  return (
    <p role="status" className="sr-only">
      {label}
    </p>
  );
}

/** Fare calendar: the route bar over the photo, then twelve month bars. */
export function CalendarSkeleton() {
  return (
    <div className="relative z-10 container-page -mt-20 md:-mt-24">
      <Status label="Loading the fare calendar…" />
      <div aria-hidden>
        <div className="grid gap-3 rounded-(--radius-panel) bg-white p-4 shadow-(--shadow-float) ring-1 ring-line md:grid-cols-[1fr_1fr_auto_auto] md:p-5">
          <Bone className="h-16 rounded-xl" />
          <Bone className="h-16 rounded-xl" />
          <Bone className="h-16 rounded-xl md:w-56" />
          <Bone className="h-14 rounded-full md:h-16 md:w-40" />
        </div>
        <div className="mt-6 rounded-(--radius-panel) p-5 ring-1 ring-line md:p-8">
          <Bone className="h-7 w-64 max-w-full" />
          <Bone className="mt-2 h-4 w-96 max-w-full" />
          <div className="mt-8 flex h-40 items-end gap-2 md:h-48 md:gap-3">
            {[62, 48, 74, 55, 38, 66, 80, 52, 30, 44, 70, 58].map((h, i) => (
              <Bone key={i} className="flex-1 rounded-t-md rounded-b-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Compensation checker: the route fields, then the question rows. */
export function CheckerSkeleton() {
  return (
    <div className="rounded-(--radius-panel) bg-white p-5 shadow-(--shadow-float) ring-1 ring-line md:p-8">
      <Status label="Loading the compensation checker…" />
      <div aria-hidden>
        <Bone className="h-7 w-72 max-w-full" />
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Bone key={i} className="h-16 rounded-xl" />
          ))}
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-8">
            <Bone className="h-5 w-56 max-w-full" />
            <div className="mt-3 flex flex-wrap gap-2">
              {[0, 1, 2].map((j) => (
                <Bone key={j} className="h-11 w-32 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
