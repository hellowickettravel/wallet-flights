/** Server-rendered placeholder while the results page reads the URL. */
export function ResultsSkeleton() {
  return (
    <div className="container-page py-8" aria-hidden>
      <div className="h-20 skeleton rounded-(--radius-panel) ring-1 ring-line" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[17.5rem_1fr]">
        <div className="hidden h-96 skeleton rounded-(--radius-panel) ring-1 ring-line lg:block" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 skeleton rounded-(--radius-panel) ring-1 ring-line" />
          ))}
        </div>
      </div>
    </div>
  );
}
