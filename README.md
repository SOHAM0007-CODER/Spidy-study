# ADAPTLearn — Multiverse Learning

Neubrutalist adaptive-learning dashboard. React + Vite + Tailwind, mock data everywhere
except Interview Prep, which talks to the real Anthropic API.

## Run it

```bash
npm install
npm run dev
```

If you are dropping this into your existing `websprint` project, copy `src/`,
`index.html`, `tailwind.config.js` and `postcss.config.js` over the old ones, then:

```bash
npm install react-router-dom recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
```

## Interview Prep AI

1. Copy `.env.example` to `.env`
2. Paste your key: `VITE_ANTHROPIC_API_KEY=sk-ant-...`
3. Restart the dev server (Vite only reads `.env` at boot)

Without a key, every other page still works and Interview Prep shows a clear notice
instead of breaking. The key ships to the browser — fine for a demo, move it behind a
tiny server before anything public. `.env` is already gitignored.

Model is set in `src/lib/ai.js` (`MODEL` constant) if you need to change it.

## Design tokens

| Token | Value | Use |
|---|---|---|
| `ink` | `#101014` | All borders, all shadows, body text |
| `paper` | `#F5F0E6` | Page background (with halftone dots) |
| `red` | `#FF3B30` | Primary action, brand |
| `blue` | `#2D5BFF` | Secondary / featured |
| `yellow` | `#FFD426` | Streak, highlights, selected |
| `pink` | `#FF5CA8` | Revision |
| `sky` / `lime` | `#4CC9F0` / `#8AE234` | Stat accents, success |

Type: **Archivo Black** (display) / **Inter** (body) / **JetBrains Mono** (telemetry labels).

Neubrutalist rules used consistently: 3px black borders, hard offset shadows
(`shadow-nb` = `5px 5px 0`), zero border-radius, flat fills, no gradients. Buttons
physically press down on `:active` (shadow collapses, element translates).

## Routes

| Path | Page |
|---|---|
| `/` | Dashboard — velocity chart, recommendations, pre-learning calibration |
| `/courses` | Course portal, filters, featured mission, detail drawer |
| `/my-learning` | Enrolled/completed, telemetry overview, recent activity |
| `/revision` | Spaced repetition engine, study decks (empty-state toggle included) |
| `/projects` | Multiverse Labs — system flow + tech stack per project |
| `/interview-prep` | Live AI mock interview |
| `/analytics` | Cognitive telemetry, learning time bars, accuracy trend |
| `/people` | Agent leaderboard |
| `/profile` | Agent dossier, 1-year activity heatmap, achievement badges |
| `/settings` | Account fields, preference toggles |

## Known gaps

- Log out, Follow, Save changes and Reset are UI-only
- Course "Launch mission" opens nothing — no lesson player yet
- Projects have no detail page
- No auth, no persistence (refresh resets state)
