export default function Loading() {
  return (
    <div className="flex flex-col gap-5 my-5 animate-pulse">
      {/* Category skeleton (mobile) */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-28 rounded-lg bg-muted shrink-0" />
        ))}
      </div>

      {/* Search skeleton */}
      <div className="h-10 w-full rounded-md bg-muted" />

      {/* Divider skeleton */}
      <div className="h-4 w-full rounded bg-muted/50" />

      <div className="flex gap-6">
        {/* Sidebar skeleton (desktop) */}
        <div className="hidden md:flex flex-col gap-2 w-52 shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-muted" />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="h-44 bg-muted" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
                <div className="flex justify-between items-center pt-3 border-t border-border/60">
                  <div className="h-5 w-16 rounded bg-muted" />
                  <div className="h-8 w-20 rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
