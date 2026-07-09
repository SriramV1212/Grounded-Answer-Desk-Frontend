import type { AskResponse } from "./types";

const ASK_ENDPOINT = "https://api.sriramv.tech/ask";

export class AskApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AskApiError";
    this.status = status;
  }
}

function isAskResponse(data: unknown): data is AskResponse {
  if (typeof data !== "object" || data === null) return false;
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.answer === "string" &&
    Array.isArray(candidate.retrieved_chunks) &&
    typeof candidate.abstained === "boolean"
  );
}

function extractDetail(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null) return undefined;
  const detail = (data as Record<string, unknown>).detail;
  return typeof detail === "string" ? detail : undefined;
}

export async function askQuestion(question: string): Promise<AskResponse> {
  let response: Response;
  try {
    response = await fetch(ASK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
  } catch {
    throw new AskApiError(
      "Could not reach the backend. Check your connection and try again."
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new AskApiError(
      `The backend returned an unreadable response (status ${response.status}).`,
      response.status
    );
  }

  if (!response.ok) {
    throw new AskApiError(
      extractDetail(data) ?? `The backend returned an error (status ${response.status}).`,
      response.status
    );
  }

  if (!isAskResponse(data)) {
    throw new AskApiError("The backend returned an unexpected response shape.");
  }

  return data;
}
