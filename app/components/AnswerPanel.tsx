import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mt-3 first:mt-0 text-base leading-relaxed text-foreground">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h3 className="mt-4 first:mt-0 text-base font-semibold text-foreground">
      {children}
    </h3>
  ),
  h2: ({ children }) => (
    <h3 className="mt-4 first:mt-0 text-base font-semibold text-foreground">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-4 first:mt-0 text-sm font-semibold text-foreground">
      {children}
    </h4>
  ),
  ul: ({ children }) => (
    <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-relaxed text-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-3 list-decimal space-y-1 pl-5 text-base leading-relaxed text-foreground">
      {children}
    </ol>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-foreground/5 px-1 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
};

export function AnswerPanel({
  answer,
  isAbstention,
}: {
  answer: string;
  isAbstention: boolean;
}) {
  const label = isAbstention ? "Abstained — off corpus" : "Grounded answer";

  return (
    <section
      className={`rounded-lg border p-5 ${
        isAbstention
          ? "border-warning/30 bg-warning-bg"
          : "border-success/30 bg-success-bg"
      }`}
    >
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
          isAbstention ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
        }`}
      >
        {label}
      </span>
      <div>
        <ReactMarkdown components={markdownComponents}>{answer}</ReactMarkdown>
      </div>
    </section>
  );
}
