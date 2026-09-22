# Kids' AI Game Studio — Facilitator Handbook

**Run a one-day workshop where 5–8 kids (ages 7–12) ship a real, playable
game to a real domain on the internet.**

By Evgeni Hasin. Worked example: **[Run Froggy, Run!](https://runfroggyrun.com)**,
built 2026-09-20 by 6 kids and 2 moderators in one afternoon.
Scaffold repo: `ehasin/Computer-Game-Workshop-Scaffold`.

---

## 1. What the kids actually walk away with

Not "an introduction to coding". Something better:

- A **URL they can text to their grandmother**, that works on her phone.
- Their own **drawings** in the game, moving.
- The experience of being a **product manager** — proposing something,
  hearing a cost estimate, and deciding to cut it.
- A gut feel for what AI is good at and what it is not.

The last one is the real curriculum. The game is the excuse.

---

## 2. Before the day

### 2.1 Accounts and cost

| What | Plan used | Cost |
|---|---|---|
| Claude (Claude Code) | Paid personal plan | **$20 / month** |
| ChatGPT | Paid personal plan | **$20 / month** |
| GitHub | Free | $0 |
| Vercel | Free (Hobby) | $0 |
| Custom domain | Optional, any registrar | ~$10–15 / year |

**Total realistic cost of running one workshop: $40**, plus a domain if you
want the "it's really on the internet" moment (you do — see §7.6).

You need **one** of each account, on the facilitator's laptops. Kids do not
need accounts, emails, or logins for anything. That is deliberate: no
sign-ups means no parental-consent paperwork and no data questions.

> ⚠️ Both AI subscriptions have usage limits. A full workshop on a $20 Claude
> plan is comfortable *if* you use the cost-effective model (§5) and keep
> changes small. Two laptops on two accounts also halves your exposure to
> hitting a limit at the worst possible moment.

### 2.2 The repo — set it up the night before

```bash
gh repo create my-game-workshop --public --clone \
  --template ehasin/Computer-Game-Workshop-Scaffold
cd my-game-workshop
```

Clone it to **both** laptops. Confirm the starter game runs on both.

### 2.3 Vercel — set it up the night before, and prove it

```bash
npm i -g vercel
vercel          # link the project, accept the defaults
vercel --prod   # first production deploy
```

Then in the Vercel dashboard, connect the GitHub repo so every push to
`main` deploys automatically, and branches get preview URLs.

**Then actually open the deployed URL on a phone.** An untested deploy
pipeline is the single highest-risk item in the whole day. If it breaks at
16:30 with eight kids watching, the session ends flat no matter how good the
game is.

Add a `.vercelignore` so your notes and plans don't become public files — a
static deploy publishes *everything* you upload:

```
.env
.env.*
*.local
.vercel
node_modules
docs
plan.md
CLAUDE.md
```

If CLI deploys fail with "Not authorized", you are deploying to the wrong
scope. Pass your team explicitly: `vercel --prod --scope your-team-name`.

### 2.4 Domain (optional, high impact)

Buy a short, kid-pronounceable `.com` **before the day** — or buy it live in
the room as the finale (§7.6), which is more theatrical but risks a DNS
propagation wait. Point it at the Vercel project. Keeping DNS at Cloudflare
works fine; Vercel showing a "✗" next to nameservers only means you don't
use Vercel DNS, which is not a problem.

Decide in advance: do you buy the name the kids invent, or do you have one
already? Buying theirs is a much stronger moment.

### 2.5 The guardrail file — your most important prep

The scaffold ships with a `CLAUDE.md` that constrains the coding agent.
Read it, and edit the boundaries to match what *you* are willing to support.
Full text in §8; the short version is that it tells the agent to **argue
back, in kid-language, before building anything expensive.**

### 2.6 Pre-flight checklist

- [ ] Repo cloned on both laptops, starter game runs on both
- [ ] Vercel connected, an empty deploy is live and opened on a phone
- [ ] Both laptops logged into Claude and ChatGPT
- [ ] `CLAUDE.md` reviewed and adjusted
- [ ] Domain bought (or registrar account ready + payment method)
- [ ] Phones/tablets charged, on the Wi-Fi, screen-lock timeout set long
- [ ] Art table stocked (§3)
- [ ] Pizza ordered for the midpoint, at a delivery time you control
- [ ] Laptops on chargers, a power strip at each desk

---

## 3. Room setup

Three zones. Physical separation is what makes the two-group split in §7.4
actually work — kids drift to where the energy is, and you want two centres
of energy, not one.

**Zone A — the build desk**

- 2 laptops, both with the repo cloned and logged into Claude, ChatGPT,
  GitHub and Vercel.
- **One laptop connected to a large screen or TV.** This is the shared
  campfire: whatever is on that screen is what the room is discussing.
- Power strip. A mouse for each laptop — kids struggle with trackpads.

**Zone B — the art desk** (separate table, ideally facing away from the screens)

- Plain white paper, lots of it.
- Coloring markers, thick and thin. Black fineliner for outlines —
  **outlined drawings convert to game assets far better than pencil.**
- Scissors, if you want cut-out characters.
- No devices on this table. That is the point of it.

**Zone C — the test bench**

- **Several tablets and phones**, charged, unlocked, on the Wi-Fi.
- This is where the published URL gets opened, again and again.
- Having *multiple* devices matters: kids test in parallel, and they find
  bugs an adult never would — fat-finger swipes, rotating the device,
  spamming the jump button.

**Optional but nice:** an A3 sheet on the wall with three columns —
`IDEAS` / `BUILDING NOW` / `DONE` — and sticky notes. It makes the agile
loop visible without ever explaining the word "kanban".

---

## 4. Staffing

| Group size | Moderators | Notes |
|---|---|---|
| ≤ 4 kids | 1 | Doable solo; everyone stays in one group |
| **5–8 kids** | **2** | **Recommended. This is what was actually run.** |
| > 8 kids | 3+, or split the session | Beyond ~8 the art table becomes a crowd |

With two moderators, split by **role, not by supervision**:

- **Moderator 1 — the build desk.** Drives Claude, keeps the game running,
  owns git and deploys, narrates what is happening on the big screen.
- **Moderator 2 — the art desk.** Runs the drawing group, does the scanning
  and the ChatGPT asset generation, and protects the art group from the
  gravitational pull of the screens.

Swap once after lunch if you are both comfortable — the kids notice, and it
models that these are roles, not people.

One adult must own **git and deploys** for the whole day. Merge conflicts
between two excited moderators are not a lesson anybody needs.

---

## 5. Which AI for what

This is the part most people get wrong. The two tools are not
interchangeable, and choosing correctly is most of the cost saving.

| Task | Tool | Why |
|---|---|---|
| Ideation, feasibility talk, naming | **ChatGPT** (Sol, *medium* effort) | Fast, conversational, good at talking *to kids*; medium effort is plenty and keeps it snappy |
| Planning, breaking work into steps | **ChatGPT** (Sol, *medium* effort) | Good structured plans without over-thinking |
| Graphic design, rendering assets from sketches | **ChatGPT** | Image generation from the kids' scanned drawings |
| Writing and changing game code | **Claude Sonnet 5** | Best balance of quality and cost for this kind of work — the most cost-effective choice for a full day of edits |
| Deployment, debugging, git | **Claude Sonnet 5** | Handles the toolchain end to end |

> **Rule of thumb for the room:** *ChatGPT imagines it, Claude builds it.*
> Kids grasp that division instantly and start routing their own questions.

### 5.1 Starter prompts — ChatGPT (ideation and feasibility)

Paste this at the start of the brainstorm, on the big screen:

```
You are helping a group of kids aged 7–12 design a small browser game in a
single 4-hour workshop. The game must be plain HTML + CSS + vanilla
JavaScript with a Canvas — no frameworks, no backend, no installs, no online
multiplayer.

I will tell you the kids' ideas one at a time. For each idea:
1. Say it back in one sentence a 7-year-old would recognise.
2. Rate it GREEN (buildable in under 30 minutes), AMBER (only if we cut it
   down — say exactly what to cut), or RED (impossible today — say why in
   one plain sentence, and offer the closest GREEN alternative).
3. Keep every answer under 60 words. Talk to the kids, not to me.
```

For naming and the domain lesson:

```
We're naming our game. Suggest 10 short, fun names a kid could spell out
loud, that would work as a .com domain. For each, say whether it's likely
to already be taken and why. Then explain to a 9-year-old, in 4 sentences,
what a domain name actually is and why two people can't have the same one.
```

For turning drawings into game art:

```
This is a drawing by a 9-year-old for our game. Redraw it as a clean game
sprite: transparent background, bold outlines, flat bright colours, facing
right, roughly square, readable when shrunk to 48×48 pixels.
Keep it recognisably THEIR drawing — same shapes, same character, same
personality. Do not make it look professional or generic.
```

That last sentence matters more than all the others. Without it you get
slick stock art and the kids stop recognising their own work.

### 5.2 Starter prompts — Claude (build and deploy)

Claude reads `CLAUDE.md` automatically, so the guardrails apply to every
request without repeating them. Open Claude Code in the repo folder and
start with:

```
Read CLAUDE.md and the starter files, then tell me in 5 lines what this
game currently does. Don't change anything yet.
```

Then work in **one-sentence user stories**, one at a time:

```
The kids decided: the ball should break bricks at the top of the screen.
Build the smallest version that works — one row of bricks, they disappear
when hit, score goes up by 1. Nothing else. Tell me first if this is more
than 15 minutes of work.
```

```
Before you build this, tell the room whether it fits our time budget, and
if it doesn't, what smaller version we should do instead. Explain it in
language a 7-year-old understands. Then wait for my go-ahead.
```

For integrating the art:

```
The kids' art is now in assets/game/. Swap the grey rectangles for these
images: player-frog.png for the player, pickup-coin.png for the coins.
Keep every game rule exactly as it is — this change is art only. Make sure
the images are still readable when the game is small on a phone.
```

For deploying:

```
Deploy the current working tree to production on Vercel, then tell me the
URL and one thing I should test on a phone first.
```

### 5.3 Prompt lessons worth saying out loud to the kids

- **A vague ask gets a vague game.** Compare "make it cooler" with "make the
  frog flash white for half a second when it gets hit" — run both, show the
  difference. This is the prompt-engineering lesson and it lands hard.
- **One thing at a time.** A prompt with five features returns one working
  feature and four broken ones.
- **Always play it after every change.** Reading code is not testing.

---

## 6. Game suggestions — rated by build risk

🟢 **GREEN** = buildable in the budget · 🟠 **AMBER** = only if scoped down ·
🔴 **RED** = disqualify immediately, don't attempt

### Paddle / arcade

| Idea | RAG | Note |
|---|---|---|
| Pong (vs. simple AI, or 2 players on one keyboard) | 🟢 | The scaffold already *is* this |
| Breakout / DX-Ball | 🟢 | Safest crowd-pleaser |
| Space Invaders | 🟢 | The enemy grid is a nice loop lesson |
| Dino-style jump and dodge | 🟢 | Endless runner, easy to make feel good |
| Falling-objects dodger | 🟢 | Simplest possible; good for a young group |
| Lane runner (what Run Froggy, Run! became) | 🟢 | Rows scroll, one lane step, one jump |
| Pinball | 🔴 | Flipper and bounce physics |
| Bike / terrain physics (Elasto Mania) | 🔴 | Physics engine |
| Chain-reaction machine (The Incredible Machine) | 🔴 | Physics engine |

### Board / grid

| Idea | RAG | Note |
|---|---|---|
| **Memory / Concentration** | 🟢 | **Best fit for kids' art** — every card is a drawing |
| Connect Four | 🟢 | Safe default, satisfying win detection |
| Gomoku (5-in-a-row) | 🟢 | |
| Tic-Tac-Toe | 🟢 | Fine as a 5-minute warm-up, too thin as the centrepiece |
| Mancala, War (cards), Snakes & Ladders | 🟢 | Low interactivity — check the group actually wants it |
| Othello / Reversi | 🟠 | Multi-direction flip logic eats time |
| Battleship | 🟠 | Hot-seat or vs-computer only |
| Sudoku | 🟠 | One hard-coded puzzle, no generator |
| Checkers | 🟠 | Loose rules; don't enforce forced capture |
| Gobblet Gobblers | 🟠 | 3×3 only; stacking adds real state and UX complexity |
| Chess with full rules | 🔴 | A check/checkmate engine is too big |
| Risk / Monopoly | 🔴 | Too much persistent state |

### Platformer

| Idea | RAG | Note |
|---|---|---|
| Single-screen Dave-style (few platforms, reach the flag) | 🟠 | One screen only. No scrolling world, no levels |

### Always 🔴 — disqualify on sight

Online/networked multiplayer · user accounts or logins · a backend or
database · real-money anything · procedural world generation · physics
engines · genre pivots mid-build ("let's make it an open-world RPG") ·
anything needing `npm install` or a build step.

> **On multiplayer:** it is the most common kid request. Cross-device
> multiplayer *is* technically feasible for turn-based games (a serverless
> function + a hosted key-value store + QR-code join) and infeasible for
> real-time games like Pong, because of latency. It is still the wrong call
> for a one-day kids' workshop — the new infrastructure is pure risk with no
> visible payoff. **Local same-keyboard two-player is 10 minutes and gets
> 90% of the joy.** Have that sentence ready; you will need it.

---

## 7. The flow — 4 to 5 hours

Timings are guides. Compress the middle if the group is fast. **Never
compress the deploy and the wrap-up** — the ending is what they remember.

### 7.0 Kids in a circle: context and intro (15 min)

No screens yet. Chairs in a circle. Tell them what they are going to do
today, and that by the end it will be on the internet and they can send it
to anyone. Set the one rule: **we ship something that works, so every idea
has a price tag.**

### 7.1 Q&A — build the vocabulary (20 min)

Still in the circle, still no screens. Ask, don't tell. Let them argue.

- *What is a computer game?* Steer toward: rules + a goal + something you
  control + feedback.
- *What is AI?* Let them be wrong first. Then: a thing that has read an
  enormous amount and is very good at guessing what comes next.
- *What is UX?* Show them a badly-designed object in the room. Ask why it's
  annoying. That's UX.
- *What do these people do all day:* **developer**, **designer**,
  **product manager**? Then tell them: today you will be all three, and by
  the end you will know which one you liked.
- *What is agile development?* Keep it to: we build the tiniest version,
  play it, then decide what's next — instead of planning everything up front
  and finding out at the end that it's boring.

Write the three role names on paper and stick them on the wall. You will
point at them all day.

### 7.2 Game idea brainstorming (30 min)

Big screen on, ChatGPT open with the prompt from §5.1.

Kids propose; ChatGPT rates GREEN / AMBER / RED out loud; the room reacts.
The **RED verdicts are the most valuable part of the session** — this is
where they learn that "no" comes with a reason and an alternative.

Then **naming**, with the domain explainer (prompt in §5.1). Check
availability live at a registrar. Kids love watching a name get taken.

> ⏱ **The 15-minute rule.** If after 15 minutes no original idea looks
> viable, stop and show them the 🟢 list from §6 — or simply show two or
> three classic games on screen. Picking a classic and re-skinning it with
> their own characters produces a *better day* than grinding on an idea that
> won't ship. Frame it honestly: "real studios clone and remix all the time;
> the twist is where the originality lives."

Lock it in: **one game, one twist, one name.** Write it on the wall.

### 7.3 🍕 Pizza (30 min)

Put it here, at the midpoint — right after the idea is locked and before the
long build. It gives the moderators a window to set up the two stations, and
the kids come back to a room that has visibly changed.

Ban laptops at the table. The conversation over pizza — *what should the
frog do when it dies?* — is genuinely productive design work.

### 7.4 Split into two groups (60–75 min)

This is the heart of the day. Both groups work at the same time.

**Group 1 — Graphics design** (art desk, Moderator 2). Draw, on paper, with
markers:

- the main character, and what it looks like when it gets hurt
- artifacts: coins, hearts, power-ups, obstacles, enemies
- scenery and background elements
- **the logo** — don't skip this; it becomes the tab icon and the share card

**Group 2 — Game mechanics** (build desk, Moderator 1). Build the
**skeleton**: grey boxes, no art, but *playable*. Win and lose conditions,
score, lives, and the one core mechanic. Iterate with Claude in one-sentence
stories (§5.2), and **playtest after every single change**.

Publish to Vercel early and often. As soon as there is something playable,
push it and hand the phones to the art group for 60 seconds of testing. That
cross-traffic keeps both groups invested in one shared thing.

**The two groups must not go silent on each other.** Every ~20 minutes,
bring the art group to the big screen for two minutes to see the skeleton,
and send a builder over to the art table to see what's coming.

### 7.5 Integrating the graphics (45 min)

The moment the day turns. Everyone back together.

1. **Scan** the drawings — a phone photo on a flat, well-lit surface is
   completely sufficient. Keep the originals; they are the souvenir.
2. **Render** each one into a game asset with ChatGPT (prompt in §5.1).
   Show both on screen side by side and ask the artist: *is that still
   yours?* If they say no, regenerate — don't overrule a 9-year-old about
   their own drawing.
3. **Drop** the files into `assets/` with clear names —
   `player-frog.png`, `pickup-coin.png`, `hazard-bomb.png`.
4. **Wire them in** with Claude, one at a time, art-only changes.
5. **Test after every swap.** This is the **UX lesson**: custom art
   sometimes makes the game *harder to read*. A beautiful bomb the player
   can't spot in time is a worse bomb. Readability versus personalisation is
   a real trade-off, and the kids should be the ones to call it.

### 7.6 Final polish, publish, go live (30 min)

- Difficulty pass: it should be **playable by the youngest kid in the room**.
  Watch them play. Tune to what you see, not to what the builders want.
- Sound, if there is time. Huge payoff per minute spent.
- Icon and share card from their logo, so the link previews properly when
  it is pasted into a chat.
- **Deploy to production.** Put the URL on the big screen.
- **Activate the domain live**, on the screen, with everyone watching. Then
  everyone opens it on their own phone at the same time. This is the moment
  of the day — give it room, don't rush past it.
- Let them send the link to their parents from the room.

### 7.7 Summary circle (15 min)

Back in the circle, screens off. Go around; everyone answers:

- **What did you learn today?**
- **Which role did you like most — designer, coder, or product manager?**
  Point at the three papers on the wall from §7.1.
- **What should we improve in the next session?**

Write the answers down. The third question is how you build session two, and
asking it tells the kids their opinion is an input, not a formality.

---

## 8. The guardrail file (`CLAUDE.md`) — copy-pastable

Drop this at the repo root before the day. Claude reads it automatically on
every request. Adjust the boundaries to your own tolerance.

````markdown
# Game Studio Workshop — project instructions

One-day workshop, kids ages 7–12, single 3–4 hour session. Goal: a playable,
deployed MVP by the end. Optimize for speed and a working demo, not for
long-term architecture.

## Your job: gatekeeper, not yes-man

The facilitator (adult) moderates and has final say on everything — you
don't need consensus from the room. But before implementing any idea a kid
or the facilitator proposes, **evaluate it against the time and complexity
budget out loud, briefly**, before writing code:

- Can this be built and playtested in well under 30 minutes? If not, cut it
  down to a version that can, and say what you cut.
- Does it require anything outside the stack below? If yes, push back and
  propose the simplest alternative that gets 80% of the fun for 20% of the
  cost.
- Is this additive to the current working game, or does it risk breaking
  what already runs? Prefer additive. Never leave the game in a broken,
  unplayable state between changes — each change should be a small,
  shippable step.

Say the trade-off in plain language a kid can follow (e.g. "multiplayer over
the internet would eat the whole workshop — let's do 2 players on one
keyboard instead, that's 10 minutes"). This pushback IS the lesson (lean
prototyping / agile scoping) — don't skip it to be agreeable.

## Hard boundaries — disqualify immediately, don't attempt

- No build step, no bundler, no framework (React/Vue/etc), no `npm install`.
  Plain HTML + CSS + vanilla JS + Canvas only.
- No backend, no database, no user accounts/auth, no server of any kind.
- No real-money payments, no third-party paid APIs.
- No networked/online multiplayer (local same-keyboard multiplayer is fine).
- No procedural generation, physics engines, or genre pivots mid-build
  (e.g. "turn it into an open-world RPG") — stay inside whatever base
  mechanic was chosen.
- If asked for something that needs an install step or new dependency,
  propose a vanilla-JS equivalent instead of adding tooling.

## How to work

- Small, incremental edits to the existing files (`index.html`, `style.css`,
  `game.js`). Avoid full-file rewrites when a targeted edit will do.
- After each feature, it should still run. Treat every change as a tiny
  shippable increment, not a batch of features.
- Kids' art goes in `assets/` and gets referenced directly by filename — no
  image processing pipeline, no optimization step.
- Facilitator handles git (branches/merges/push) manually — don't run git
  commands unprompted.
- If genuinely unsure what the group wants, ask one short clarifying
  question rather than guessing big and building the wrong thing.
````

---

## 9. Do's and don'ts

### Do

- **Deploy before the kids arrive.** An empty live site proves the pipeline.
- **Ship every 15 minutes.** A game that is always playable is always
  demoable, and a kid who just walked in can be handed a phone.
- **Let the AI say no.** It is a neutral referee. Offload the "no" to the
  tool and stay the friendly adult.
- **Let them watch the thinking, not just the output.** Put Claude on the
  big screen while it works. The reasoning is more interesting to them than
  the code.
- **Make them play the game constantly.** On real phones. With their hands.
- **Keep every original drawing.** Photograph it and keep the paper.
- **Name things the kids' way.** If they call it "the swamp dog", the file
  is `foe-swamp-dog.png`. Their vocabulary in the codebase makes it theirs.
- **Give the youngest kid the final difficulty vote.**
- **End on the live URL**, with everyone's phone out.

### Don't

- **Don't set up git, Vercel or a domain during the session.** All of it is
  the night before. There is no recovery from a 40-minute infra detour.
- **Don't let one kid drive the keyboard all afternoon.** Rotate
  deliberately, or the loudest one becomes "the coder" and the rest tune
  out.
- **Don't accept a RED idea "just to try".** It will eat 45 minutes and end
  in a broken game. Give the AMBER alternative in the same breath.
- **Don't batch five features into one prompt.** One story, one change, one
  playtest.
- **Don't let the art group become a waiting room.** They need their own
  goal — the logo, the hurt-frame, the background — and their own deadline.
- **Don't over-polish the art.** If the kid doesn't recognise their drawing
  in the render, you have lost the entire point.
- **Don't skip the summary circle** to squeeze in one more feature.
- **Don't promise features you haven't checked with the agent first.**
- **Don't leave the game broken over the break.** Ever.

---

## 10. Known failure modes and what to do

| It happens | Do this |
|---|---|
| No viable original idea after 15 min | Show the 🟢 list. Clone a classic, re-skin it with their characters. §7.2 |
| A change breaks the game | Revert first, debug second. A working game is the baseline you never lose: `git checkout -- .`, or ask Claude to undo its last change. |
| Kids keep asking for online multiplayer | Have the §6 sentence ready. Offer same-keyboard 2P immediately, as a real yes. |
| A kid's drawing renders as generic stock art | Re-prompt with "keep it recognisably THEIR drawing — same shapes, same personality". Show the artist both; they decide. |
| The art group goes quiet or loses interest | Bring them to the big screen for two minutes. Seeing their coin in the game restarts them instantly. |
| Deploy fails mid-session | Fall back to the local server on the big screen and keep building. Fix the deploy during the summary circle, not in front of them. |
| AI usage limit hit | Switch to the second laptop and account. This is why you have two. |
| The game is too hard | Watch the youngest kid play, and tune to that. Builders always tune too hard. |
| Energy crashes around hour 3 | That's the pizza window moving. Take the break, or pull the art→game integration forward, since it's the most visually rewarding block. |

---

## 11. After the session

- Send parents the URL and a short note on what the kids actually did.
- Push everything to `main` so the repo is the record.
- Keep the photos of the original sketches next to the rendered assets —
  that before/after pair is the best thing you can show anyone asking what
  the workshop is.
- Write down the answers to "what should we improve next time" while they
  are fresh. That is your agenda for session two.

---

## 12. Worked example — Run Froggy, Run!

**2026-09-20 · 6 kids · 2 moderators · one afternoon ·
[runfroggyrun.com](https://runfroggyrun.com)**

An endless lily-pad lane runner. The frog stays near the bottom, pond rows
scroll down, ← / → change lane, Space jumps — or swipe on a phone. Land on
pads, dodge the water, get off the yellow pads before they sink, jump the
bombs and the dashing critters, grab coins, hearts and shields. Three lives.

Shipped in one session, all of it built on the scaffold in this repo:

- the kids' own art throughout — frog, lily pads, bomb, coin, heart, shield,
  a "spotted bug", a "swamp dog", and their logo
- hop and squash animation, four lily-pad variants, shrinking yellow pads
- a random-but-always-solvable course: every generated chunk is walked by a
  path check before it is used
- difficulty that rises with speed and caps, music whose tempo follows it,
  sound effects, and a settings panel with volume sliders
- a custom domain, a tab icon, a home-screen icon, and a WhatsApp share card
  carrying the kids' own studio name

Two things worth stealing. **The difficulty is one dial** — speed — that
every other parameter follows, which makes balancing a 30-second
conversation instead of an afternoon. And **every drawable thing got its own
draw function early**, so swapping grey boxes for the kids' art in §7.5 was
a filename change, not a rewrite.

---

*Handbook by Evgeni Hasin. Scaffold: `ehasin/Computer-Game-Workshop-Scaffold`.
MIT — fork it, run your own, and tell me how it went.*
