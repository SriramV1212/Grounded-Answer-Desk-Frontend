import type { AskResponse } from "@/lib/types";
import { AiIcon, UserIcon } from "./Icons";
import { AnswerPanel } from "./AnswerPanel";
import { RetrievalInspector } from "./RetrievalInspector";

export interface Turn {
  id: string;
  question: string;
  status: "loading" | "success" | "error";
  result?: AskResponse;
  errorMessage?: string;
}

export function ConversationTurnView({ turn }: { turn: Turn }) {
  const chunks =
    turn.status === "success" && turn.result ? turn.result.retrieved_chunks : [];
  const hasEvidence = chunks.length > 0;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div
        className={`grid gap-6 ${
          hasEvidence ? "min-[900px]:grid-cols-[1.4fr_1fr]" : ""
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <UserIcon />
            <p className="mt-1 min-w-0 flex-1 text-base leading-relaxed text-foreground">
              {turn.question}
            </p>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <AiIcon />
            <div className="min-w-0 flex-1">
              {turn.status === "loading" && (
                <p className="mt-1.5 animate-pulse text-sm text-muted">
                  Retrieving and generating an answer...
                </p>
              )}
              {turn.status === "error" && turn.errorMessage && (
                <section
                  role="alert"
                  className="rounded-lg border border-warning/30 bg-warning-bg p-5"
                >
                  <span className="inline-block rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-warning">
                    Error
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    {turn.errorMessage}
                  </p>
                </section>
              )}
              {turn.status === "success" && turn.result && (
                <AnswerPanel
                  answer={turn.result.answer}
                  isAbstention={turn.result.abstained}
                />
              )}
            </div>
          </div>
        </div>

        {hasEvidence && (
          <div className="min-w-0">
            <RetrievalInspector chunks={chunks} />
          </div>
        )}
      </div>
    </div>
  );
}
