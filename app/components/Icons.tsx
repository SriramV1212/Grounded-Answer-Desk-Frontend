export function UserIcon() {
  return (
    <div
      aria-hidden
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-muted"
    >
      U
    </div>
  );
}

export function AiIcon() {
  return (
    <div
      aria-hidden
      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
    >
      <span className="text-sm leading-none">◆</span>
    </div>
  );
}
