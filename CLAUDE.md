# Grounded Answer Desk — Frontend

## What this is
Frontend for an AI Engineer take-home assessment. The backend is a RAG system:
user asks a question → an agent (OpenClaw) retrieves via a custom MCP server →
returns a grounded, cited answer or abstains. This frontend's job is to make
that retrieval process visibly NOT a black box — the UI must show the actual
retrieved chunks/scores/sources alongside the answer.

## Backend API contract
- Deployed, verified working: `https://api.sriramv.tech/ask` (HTTPS, use this
  for the real Vercel deployment and for local dev — no local backend needed)
- Method: POST
- Request: `{"question": "<user question>"}`
- Response (CONFIRM EXACT SHAPE by curling the endpoint together before
  hardcoding TypeScript types — do not assume this is 100% accurate):
```json
{
  "answer": "<grounded answer text, or an abstention message if off-corpus>",
  "retrieved_chunks": [
    {
      "text": "<chunk text>",
      "score": 0.81,
      "section_heading": "<heading>",
      "source_url": "<url>"
    }
  ]
}
```
- Also reachable at `http://<droplet-ip>:8000/ask` (plain HTTP) if the HTTPS
  domain is ever down — not expected to be needed.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS, deployed to Vercel.
Separate repo and separate Claude Code session from the backend — no shared
context, no shared git history.

## What to build
One page:
1. Question input + submit button
2. Answer display, with a loading state while waiting on the backend
3. Retrieval inspector panel: table of retrieved_chunks (chunk text truncated
   with expand, score, section_heading, source_url) — must visibly show real
   similarity scores (assignment explicitly requires this)
4. Clear visual distinction between a grounded answer and an abstention
5. Basic error handling for backend-unreachable / error responses

## Working preferences (same as backend project)
- I'm new to frontend/React/Next.js — explain concepts as you go, don't just
  silently paste code
- Explain any Linux/bash commands thoroughly if we touch the terminal
- Work in discrete steps, propose a plan before writing code for anything
  non-trivial, verify things actually work before calling them done
- Never commit or push without my explicit permission

## Design direction

Aesthetic: precise and technical, like a diagnostic instrument — not a
marketing landing page. This tool's entire purpose is proving an AI answer
is grounded and inspectable, so the UI itself should feel trustworthy and
exact, not flashy.

Colors:
- Background: cool slate, #F1F4F7
- Surface/card background: white, #FFFFFF (creates real contrast against
  the slate page background)
- Text: dark slate, #1E293B
- Muted/secondary text: #64748B
- Primary accent (buttons, focus states, links): crisp blue, #2563EB
- Grounded/success indicator: #0D9488 (teal)
- Abstention indicator: #D97706 (amber — abstaining is correct behavior,
  not an error, so it stays warm/neutral rather than red)
- Borders/dividers: #E2E8F0

Typography:
- Body + UI text: a clean system sans-serif (Inter or the system font stack)
  — legible, neutral, doesn't call attention to itself
- Numbers/scores/citations: a monospace face (e.g. JetBrains Mono or system
  monospace) — using monospace specifically for the similarity scores and
  chunk metadata reinforces that these are precise, measured values, not
  prose

Layout:
- Conversation history, centered, max-width ~1040px for the transcript area
- Question input pinned at the bottom, always visible; new questions stack
  as blocks above it
- Each question produces one self-contained block (white card on the slate
  page background) containing the question, its answer, and that answer's
  own retrieval evidence — never a separate page-level evidence panel
- Within a block: answer content in a left column (~55-60% width),
  retrieval evidence in a right column (~40-45% width). Below ~900px both
  columns stack vertically (answer on top, evidence below) within the same
  block
- Each retrieved chunk in the inspector shows its score as a small
  monospace badge, not buried in a paragraph

Signature detail: the score badges (e.g. "0.81") — white monospace text on
the solid blue accent background — are the one element that should feel
deliberate and high-contrast; it's the visual proof that this system is
measuring, not guessing.

Keep everything else quiet and restrained around that one detail. No
gradients, no decorative icons, no unnecessary animation — the credibility
of this tool comes from precision, not polish.
