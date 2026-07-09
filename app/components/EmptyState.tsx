import { AiIcon, UserIcon } from "./Icons";

function SkeletonLine({ width }: { width: string }) {
  return <div className={`h-2.5 rounded bg-foreground/10 ${width}`} />;
}

export function EmptyState() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 text-center">
      <div
        aria-hidden
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent"
      >
        <span className="text-xl leading-none">◆</span>
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        What do you want to know?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        Ask a question about the corpus below. Every answer arrives grounded
        in retrieved evidence, or the system abstains if nothing relevant is
        found. Here&apos;s what a result looks like:
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-border bg-surface/70 p-5 text-left sm:p-6">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          Example
        </span>
        <div className="mt-3 grid gap-6 min-[900px]:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <UserIcon />
              <p className="mt-1 text-sm text-muted">
                &ldquo;What is prompt caching?&rdquo;
              </p>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <AiIcon />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-success">
                  Grounded answer
                </span>
                <div className="mt-3 space-y-2">
                  <SkeletonLine width="w-full" />
                  <SkeletonLine width="w-5/6" />
                  <SkeletonLine width="w-3/4" />
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-border bg-panel p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              Retrieved evidence (2)
            </p>
            <div className="mt-3 space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <SkeletonLine width="w-24" />
                  <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                    0.87
                  </span>
                </div>
                <div className="mt-2 space-y-1.5">
                  <SkeletonLine width="w-full" />
                  <SkeletonLine width="w-2/3" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <SkeletonLine width="w-20" />
                  <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                    0.62
                  </span>
                </div>
                <div className="mt-2">
                  <SkeletonLine width="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
