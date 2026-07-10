"use client";

import { useRef, useState } from "react";

const MAX_TEXTAREA_HEIGHT = 160;

export function QuestionForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}) {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setQuestion("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQuestion(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 rounded-xl border border-border bg-surface p-2 shadow-sm focus-within:border-accent"
    >
      <textarea
        ref={textareaRef}
        value={question}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about the corpus..."
        disabled={isLoading}
        rows={1}
        className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-base text-foreground placeholder:text-muted focus-visible:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isLoading || !question.trim()}
        aria-label="Ask"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden className="text-base leading-none">
          ↑
        </span>
      </button>
    </form>
  );
}
