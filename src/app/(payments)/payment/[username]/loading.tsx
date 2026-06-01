export default function Loading() {
  return (
    <main className="flex w-full flex-col items-center gap-6 p-4 pb-12 animate-pulse">
      <div className="w-full max-w-2xl">
        <div className="h-8 w-64 rounded bg-muted mb-2" />
        <div className="h-4 w-80 rounded bg-muted" />

        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="mt-4 rounded-lg border border-border bg-card p-6">
            <div className="h-5 w-24 rounded bg-muted mb-3" />
            <div className="h-4 w-48 rounded bg-muted mb-2" />
            <div className="h-4 w-40 rounded bg-muted mb-4" />
            <div className="h-12 w-full rounded-md bg-muted mb-4" />
            <div className="h-9 w-36 rounded bg-muted" />
          </div>
        ))}
      </div>
    </main>
  );
}
