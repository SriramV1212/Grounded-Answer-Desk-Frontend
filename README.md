# Grounded Answer Desk

Frontend for a RAG (retrieval-augmented generation) assessment tool. Ask a
question, get a grounded answer or an explicit abstention, and inspect the
actual retrieved chunks (with similarity scores, headings, and source URLs)
that produced it — the retrieval step is never a black box.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app talks directly (client-side `fetch`, no server proxy) to a live
backend at `https://api.sriramv.tech/ask`. There's no local backend and no
environment variables to configure — the endpoint is fixed in `lib/api.ts`.

## Scripts

- `npm run dev` — start the dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Project structure

```
app/
  page.tsx                    conversation state + layout
  components/
    QuestionForm.tsx           input bar
    ConversationTurn.tsx        one question/answer block
    AnswerPanel.tsx             grounded / abstained answer rendering
    RetrievalInspector.tsx      evidence panel (chunks, scores, sources)
    EmptyState.tsx               first-load onboarding
    Icons.tsx                    user/AI avatar glyphs
    ScoreBadge.tsx                similarity score pill
lib/
  api.ts                       fetch wrapper + error handling
  types.ts                     API response types
```

## Notes

- CORS on the backend is allowlist-based per origin — if you deploy this
  somewhere other than `localhost:3000`, the backend needs that origin
  added before requests will succeed in a browser.
