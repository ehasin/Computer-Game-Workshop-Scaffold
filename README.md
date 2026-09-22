# Computer Game Workshop — Scaffold

A ready-to-clone starting point for running a **one-day AI-assisted game
studio workshop with kids (ages 7–12)**. Clone it, and a group of kids plus
two adults can go from "what game should we make?" to a **playable game live
on the internet** in 4–5 hours.

This repo is the starting line, not the finished game. What you get:

- A **walking skeleton**: a canvas, a game loop, a paddle you can move and a
  ball that bounces. It runs the moment you open `index.html`.
- A **`CLAUDE.md` guardrail file** that turns the coding agent into a
  gatekeeper instead of a yes-man — this is the single most important file
  in the repo (see below).
- A **run-of-show** with timings, and a **game-idea list rated red/amber/green**
  for what can actually be built in a session.

> **Worked example:** this scaffold was used on 2026-09-20 by a group of
> 8 kids and 2 moderators. In one afternoon they shipped
> **[Run Froggy, Run!](https://runfroggyrun.com)** — an endless lily-pad
> runner with their own hand-drawn art, music, a custom domain and a
> WhatsApp share card. Workshop and handbook by **Evgeni Hasin**.

## Stack (deliberately tiny)

Plain HTML5 Canvas + vanilla JavaScript. **No build step, no bundler, no
framework, no `npm install`, no backend.** Open `index.html` in a browser,
or serve the folder with any static server. What you commit is what deploys.

| File | What it is |
|---|---|
| `index.html` | Page shell, canvas, touch buttons |
| `style.css` | Layout and theme |
| `game.js` | The whole game — loop, input, update, draw |
| `CLAUDE.md` | Scope guardrails for the AI agent. **Read this one.** |
| `assets/` | Kids' art, referenced directly by filename |
| `docs/WORKSHOP_PLAN.md` | Run of show with timings |
| `docs/GAME_IDEAS_RAG.md` | Game ideas rated 🟢 / 🟠 / 🔴 by build risk |

## Quick start (facilitator, the night before)

```bash
# 1. Get the scaffold
gh repo create my-game-workshop --public --clone \
  --template ehasin/Computer-Game-Workshop-Scaffold
cd my-game-workshop

# 2. Check it runs — open index.html, or:
python -m http.server 8000   # then visit http://localhost:8000

# 3. Deploy it empty, before the kids arrive, so the pipeline is proven
npm i -g vercel
vercel        # link the project, accept defaults
vercel --prod # first production deploy
```

Then connect the GitHub repo in the Vercel dashboard so every push to `main`
auto-deploys. **Do this the night before, never in the room** — a broken
deploy pipeline in front of eight excited kids is the one failure mode that
kills the session.

## Why `CLAUDE.md` matters more than the code

Kids propose enormous ideas. "Open-world", "online multiplayer", "you can
buy skins". If the agent cheerfully tries to build them, you lose the
afternoon and ship nothing.

`CLAUDE.md` makes the agent **evaluate every idea against a time budget out
loud, in language a kid can follow**, before writing code:

> "Multiplayer over the internet would eat the whole workshop — let's do
> 2 players on one keyboard instead, that's 10 minutes."

That pushback **is the lesson**: lean prototyping and agile scoping,
delivered by the tool instead of by the adult. It also keeps the adult from
being the only person saying no.

Edit `CLAUDE.md` to match your own hard boundaries before the day.

## Full handbook

The complete facilitator handbook — room setup, staffing, minute-by-minute
flow, the exact prompts to use with each AI model, the art pipeline, cost
breakdown, and the do's and don'ts — is in
**[docs/FACILITATOR_HANDBOOK.md](docs/FACILITATOR_HANDBOOK.md)**.

## Licence

MIT — take it, fork it, run your own. If you do, I'd love to hear how it went.
