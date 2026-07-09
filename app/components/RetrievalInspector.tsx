"use client";

import { useState } from "react";
import type { RetrievedChunk } from "@/lib/types";
import { ScoreBadge } from "./ScoreBadge";

const TRUNCATE_LENGTH = 220;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}

function ChunkRow({ chunk }: { chunk: RetrievedChunk }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = chunk.text.length > TRUNCATE_LENGTH;
  const displayText =
    expanded || !isLong ? chunk.text : `${chunk.text.slice(0, TRUNCATE_LENGTH)}…`;
  const hasParent =
    chunk.parent_heading && chunk.parent_heading !== chunk.section_heading;

  return (
    <li className="border-b border-border py-4 last:border-b-0">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {hasParent && (
            <p className="text-xs text-muted">{chunk.parent_heading} ›</p>
          )}
          <p className="text-base font-semibold leading-snug text-foreground">
            {chunk.section_heading}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <FieldLabel>Similarity score</FieldLabel>
          <div className="mt-1">
            <ScoreBadge score={chunk.score} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground">
        {displayText}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-2 font-medium text-accent hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
      <div className="mt-3">
        <FieldLabel>Source URL</FieldLabel>
        <a
          href={chunk.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block max-w-full truncate font-mono text-xs text-accent hover:underline"
        >
          {chunk.source_url}
        </a>
      </div>
    </li>
  );
}

export function RetrievalInspector({ chunks }: { chunks: RetrievedChunk[] }) {
  return (
    <section className="rounded-lg border border-border bg-panel p-5">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
        Retrieved evidence ({chunks.length})
      </h2>
      <ul className="mt-3">
        {chunks.map((chunk) => (
          <ChunkRow key={chunk.chunk_id} chunk={chunk} />
        ))}
      </ul>
    </section>
  );
}
