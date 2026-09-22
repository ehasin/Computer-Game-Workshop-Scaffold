# Game ideas, rated by build risk

A discussion aid for the brainstorm block — put it on the big screen when an
original idea isn't converging, or use it to sanity-check what the room is
proposing.

🟢 **doable in budget** · 🟠 **doable only if scoped down** · 🔴 **disqualified**

## Paddle / arcade
- 🟢 Pong — vs. simple AI, or 2 players on one keyboard. The scaffold already is this
- 🟢 Breakout / DX-Ball — safest crowd-pleaser
- 🟢 Space Invaders — the enemy grid is a nice loop lesson
- 🟢 Dino-style jump and dodge — easy to make feel good
- 🟢 Falling-objects dodger — simplest possible; good for a young group
- 🟢 Lane runner — rows scroll, one lane step, one jump
- 🔴 Pinball — flipper and bounce physics
- 🔴 Elasto Mania — bike and terrain physics
- 🔴 The Incredible Machine — chain-reaction physics

## Board / grid
- 🟢 **Memory / Concentration — best fit for kids' art; every card is a drawing**
- 🟢 Connect Four — safe default, satisfying win detection
- 🟢 Gomoku (5-in-a-row)
- 🟢 Tic-Tac-Toe — fine as a 5-minute warm-up, thin as the centrepiece
- 🟢 Mancala
- 🟢 War (cards)
- 🟢 Snakes & Ladders — low interactivity; check they actually want it
- 🟠 Othello / Reversi — multi-direction flip logic eats time
- 🟠 Battleship — hot-seat UI or vs-computer only
- 🟠 Sudoku — one hard-coded puzzle only, no generator
- 🟠 Checkers — loose rules, no forced-capture enforcement
- 🟠 Gobblet Gobblers — 3×3 only; stacking, covering and uncovering add real
  state and UX complexity
- 🔴 Chess with full rules — a check/checkmate engine is too big
- 🔴 Risk / Monopoly — too much persistent state

## Platformer
- 🟠 Dave-style — one screen, a few platforms, reach the flag. No scrolling
  world, no levels

## Always 🔴 — disqualify on sight
Online/networked multiplayer · user accounts or logins · a backend or
database · real-money anything · procedural world generation · physics
engines · genre pivots mid-build · anything needing `npm install` or a build
step.

## On multiplayer — the most common request

Cross-device multiplayer **is** technically feasible for turn-based games (a
serverless function + a hosted key-value store + QR-code join), and
infeasible for real-time games like Pong because of latency.

It is still the wrong call for a one-day kids' workshop: new infrastructure
is pure risk with no visible payoff. **Local same-keyboard two-player is
10 minutes and gets 90% of the joy.** Have that sentence ready.
