"use client";

import { useEffect, useRef, useState } from "react";
import { QuestionForm } from "./components/QuestionForm";
import { EmptyState } from "./components/EmptyState";
import { ConversationTurnView, type Turn } from "./components/ConversationTurn";
import { askQuestion, AskApiError } from "@/lib/api";

export default function Home() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const latestTurnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    latestTurnRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [turns]);

  async function handleSubmit(question: string) {
    const id = crypto.randomUUID();
    setTurns((prev) => [...prev, { id, question, status: "loading" }]);

    try {
      const result = await askQuestion(question);
      setTurns((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "success", result } : t))
      );
    } catch (err) {
      const message =
        err instanceof AskApiError
          ? err.message
          : "Something went wrong. Please try again.";
      setTurns((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: "error", errorMessage: message } : t
        )
      );
    }
  }

  const isLoading = turns.some((t) => t.status === "loading");

  return (
    <div className="flex h-dvh flex-col">
      <header className="shrink-0 border-b border-border bg-surface px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <h1 className="text-xl font-semibold tracking-tight">
            Grounded Answer Desk
          </h1>
          <p className="mt-1 text-sm text-muted">
            Ask a question. See the retrieved evidence behind the answer.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6">
        {turns.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1040px] flex-col gap-8 py-8">
            {turns.map((turn, index) => (
              <div
                key={turn.id}
                ref={index === turns.length - 1 ? latestTurnRef : undefined}
              >
                <ConversationTurnView turn={turn} />
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="shrink-0 border-t border-border bg-surface px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-[1040px]">
          <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
          <p className="mt-2 text-center text-xs text-muted">
            Enter to ask · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
