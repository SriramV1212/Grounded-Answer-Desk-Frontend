export function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-semibold tabular-nums text-white"
      title={`Similarity score: ${score}`}
    >
      {score.toFixed(2)}
    </span>
  );
}
