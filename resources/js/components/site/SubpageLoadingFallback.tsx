export function SubpageLoadingFallback() {
  return (
    <div
      className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-6 py-20"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-3xl space-y-4">
        <div className="h-4 w-32 rounded-full bg-slate-200/80" />
        <div className="h-10 w-3/4 rounded-full bg-slate-200/80" />
        <div className="h-4 w-full rounded-full bg-slate-100" />
        <div className="h-4 w-5/6 rounded-full bg-slate-100" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="h-48 rounded-[2rem] bg-slate-100" />
          <div className="h-48 rounded-[2rem] bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
