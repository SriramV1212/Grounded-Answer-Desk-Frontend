# Grounded Answer Desk

**Live demo:** [grounded-answer-desk-frontend.vercel.app](https://grounded-answer-desk-frontend.vercel.app/)

Frontend for a RAG (retrieval-augmented generation) system. Ask a
question, get a grounded answer or an explicit abstention, and inspect the
actual retrieved chunks (with similarity scores, headings, and source URLs)
that produced it — the retrieval step is never a black box.

This is the frontend half only. The backend (FastAPI + OpenClaw agent +
Qdrant) lives in a separate repo:
[backend repository](https://github.com/SriramV1212/Grounded-Answer-Desk-Assignment).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS.

## Run locally

### Prerequisites

- **Node.js 20 or later** (this project was built and tested on Node
  v22.21.0 — check yours with `node -v`; grab a current LTS from
  [nodejs.org](https://nodejs.org/) if needed)
- **npm** (ships with Node)
- **Git**

No backend setup is required for this step. The app talks directly
(client-side `fetch`, no server proxy) to the live, already-deployed backend
at `https://api.sriramv.tech/ask`, and there are no environment variables to
configure — the endpoint is fixed in `lib/api.ts`.

### Steps

```bash
# 1. Clone this repo
git clone https://github.com/SriramV1212/Grounded-Answer-Desk-Frontend.git
cd Grounded-Answer-Desk-Frontend

# 2. Install dependencies
npm install

# 3. Start the dev server (Turbopack)
npm run dev
```

Once you see `Ready in ...ms` in the terminal, open
[http://localhost:3000](http://localhost:3000) in a browser. Type a question
into the input bar at the bottom and press Enter — you should see a loading
state, then either a grounded answer (teal) or an abstention (amber), each
with its own retrieval evidence panel on the right showing the chunks,
similarity scores, and source URLs that produced it.

If a question just spins forever or errors immediately, the live backend
may be temporarily unreachable — this frontend has no local backend to fall
back to, so there's nothing else to debug locally in that case.

### Other scripts

- `npm run build` — production build (`next build`)
- `npm run start` — run the production build locally (`next start`, after
  `npm run build`)
- `npm run lint` — ESLint

## Deploy / redeploy on Vercel

This app is a stock Next.js project with **zero required environment
variables** (the backend URL is hardcoded in `lib/api.ts`), so a Vercel
deployment needs no configuration beyond pointing Vercel at the repo.

### Option A — Vercel dashboard (recommended, no CLI install)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login
   is easiest since this repo is on GitHub).
2. Under "Import Git Repository," select
   `SriramV1212/Grounded-Answer-Desk-Frontend`. If it isn't listed, click
   "Adjust GitHub App Permissions" and grant Vercel access to the repo.
3. Vercel auto-detects the "Next.js" framework preset — leave Build Command
   (`next build`), Output Directory, and Install Command (`npm install`) on
   their defaults.
4. Skip "Environment Variables" — none are needed.
5. Click **Deploy**. The first build takes 1-2 minutes; Vercel gives you a
   `*.vercel.app` URL when it finishes.

Once imported, this project is now **linked**: every subsequent `git push`
to `main` triggers a new production deployment automatically, and every
push to any other branch/PR gets its own preview URL. To manually redeploy
the current `main` without a new commit (e.g. to pick up a Vercel platform
change or retry a flaky build), go to the project's **Deployments** tab in
the dashboard, open the three-dot menu on the latest deployment, and choose
**Redeploy**.

### Option B — Vercel CLI

```bash
npm install -g vercel   # or use `npx vercel` for a one-off, no global install
vercel login            # opens a browser to authenticate

cd Grounded-Answer-Desk-Frontend
vercel                  # first run: links this directory to a Vercel project
                         # (creates a preview deployment)
vercel --prod            # promotes to a production deployment
```

`vercel` on first run asks a few setup questions (which scope/account,
project name, link to an existing project or create a new one) — accepting
the defaults is fine for a fresh project. It writes a local `.vercel/`
folder recording the link (already gitignored — never commit it, it
contains project/org IDs). Once linked, running `vercel --prod` again from
this directory redeploys the current working tree straight to production
without going through GitHub at all.

### After deploying: tell the backend about your URL

The backend enforces CORS by allowlisted origin — it only accepts browser
requests from origins it's explicitly told about, and `http://localhost:3000`
is the only one allowed by default. If you deploy to a **new** Vercel URL
(not the existing `grounded-answer-desk-frontend.vercel.app` live demo),
that new origin needs to be added to the backend's `ALLOWED_ORIGINS` before
requests from it will succeed — see the backend repo's README, "After
deploying the frontend: update CORS," for how. Until that's done, the page
will load fine but every question will fail with a CORS error in the
browser console (the backend itself is unaffected — `curl` and
server-to-server calls don't go through CORS).

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
  somewhere other than `localhost:3000` or the existing live demo URL, the
  backend needs that origin added before requests will succeed in a
  browser. See "After deploying: tell the backend about your URL" above.
