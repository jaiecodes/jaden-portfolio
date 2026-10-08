# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost:5173)
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

There are no tests.

## Architecture

This is a React 19 + TypeScript portfolio site built with Vite, Tailwind CSS v4, React Router v7, Motion (Framer Motion successor), and React Three Fiber/drei for 3D.

The project follows the layered modularization pattern from [Modularizing React Applications](https://martinfowler.com/articles/modularizing-react-apps.html#DataModellingToEncapsulateLogic): domain logic lives in model classes and services (no React), hooks manage state/side effects, and components are purely presentational. **New domain logic belongs on a model class or service — not in hooks or components.**

### Layer structure

| Layer | Path | Role |
|---|---|---|
| Domain models | `src/domain/models/` | Pure data shapes + filtering logic (no React) |
| Domain services | `src/domain/services/` | Loads JSON, exposes query methods |
| Data | `src/assets/data/*.json` | Content: `projects.json`, `heroThemes.json`, `home.json`, `about.json`, `resume.json` |
| Hooks | `src/hooks/` | State and side effects (URL-synced filters, layout measurement) |
| Features | `src/features/<feature>/` | `<Feature>Page.tsx` composes the page from `components/` and services |
| UI kit | `src/components/ui/` | Shared primitives and the design system (see below) |
| Utils | `src/components/utils/` | Utility components (e.g. ScrollToTop) |

Every feature follows the same shape — `home/`, `projects/`, `about/`, `resume/`:

```
src/features/about/
  AboutPage.tsx          ← route component: PageFrame + sections, reads services
  components/            ← presentational sections and their parts
```

Page content never lives in components: it goes in a JSON file with an interface in `src/domain/models/` and a service in `src/domain/services/`.

### Routing (App.tsx)

- `/` → `HomePage` — the garden entry; scrolling dollies through the arch and lands on `/projects`
- `/projects` → `ProjectPage` — filterable project gallery
- `/project/:id` → `ProjectDetail` — project case study
- `/about` → `AboutPage` — content from `about.json` via `AboutService`
- `/resume` → `ResumePage` — content from `resume.json` via `ResumeService`. Entries link to a case study with `projectId`; ids that don't match a project are dropped, so cards never link to a blank page.

### Project data flow

`projects.json` → `ProjectService` (loads + queries) → `useProjectFilters` hook (syncs state to URL search params) → `ProjectPage` / `ProjectDetail`

Filter state lives entirely in URL query params (`?q=`, `?cat=`, `?tech=`, `?year=`, `?sort=`), making filters bookmarkable. `ProjectDetail` reads the same params to pick the "Up next" project within the current filtered set.

**To add a project:** add an entry to `src/assets/data/projects.json` matching `ProjectData` in `src/domain/models/Project.ts`, add its hero to `heroThemes.json`, and put its card art in `public/v2/card-art/` as `<name>.webp` (720×440) and `<name>@2x.webp` (1440×880). No code changes needed. A link with an empty `url` renders as "coming soon"; `video` links jump to the demo on the page. Highlight visuals and the demo video show their caption until given a `src`.

### Project case study

Each project page takes its colours from its hero (`palette` in `heroThemes.json`, applied with `paletteStyle()`), so every kit component on the page re-skins itself. The page background continues from the bottom of the hero end frame (`seam`).

The hero (Figma: "Project Heroes — Start / End frames") plays by itself when the page opens, with scrolling locked (`useScrollLock`) until it finishes: `layers` animate from the start to the end frame of the 1800×1044 scene, then the scrim and title rise in. It holds the end frame and replays the next time the page is opened. Each layer is placed at its start-frame box and animated with `x`/`y`/`rotate`/`scale`/`scaleX`/`scaleY`/`opacity`; `input` ranges (fractions of the art's playback) stagger layers (e.g. Wireless Sensing moves the person first, then the room). Phones fill the screen: the 390×560 Figma framing (`mobile.scale`, shifted `mobile.x`) is scaled to the screen height, and `mobile.startX` pans the camera from a start framing. While the hero is behind the header, the page sets the header's text colour (`useHeaderTone`) so the nav reads on pale art.

### UI kit and theming

All styling decisions live in `src/index.css` and `src/components/ui/`. Use the kit rather than raw sizes, weights or hex colours.

This is design kit 2.0 (Figma page "Designs 2.0", section "Components 2.0").

**Semantic tokens.** Components only use semantic colours, mirroring the Figma variables: `night/*` (`bg-night`, `bg-raised`, `border-line`, `bg-sunken`), `text/*` (`text-fg`, `text-muted`, `text-faint`) and `theme/*` (`text-t-primary`, `t-secondary`, `t-highlight`, `t-accent`, `t-on-primary`). A page sets them all: `<PageFrame theme="home" | "projects" | "about" | "resume">` uses the `[data-theme]` blocks in `index.css` (Projects gold, About green, Resume orange → green); project pages set them inline from their palette. To add a theme: add a `[data-theme="…"]` block and a `PageTheme` member in `src/components/ui/theme.ts`. Brand colours (`accent`, `secondary`, `primary`, `ember`, `blush`, …) and the angular rims (`.stroke-angular`, `.stroke-primary-angular`, `.stroke-card-angular`) stay fixed. 

**Day mode** (Figma node 679-4032, the sakura garden). The lantern and the menu's Screen Mode switch call `useScreenMode()` (`src/hooks/useScreenMode.ts`), which puts `data-mode="day"` on `<html>` and remembers it in localStorage (`index.html` applies it before paint). Day is only token values: `:root[data-mode="day"]` and `[data-mode="day"] [data-theme=…]` in `index.css` re-set the page tokens plus component tokens (`--header-fade`, `--glass`, `--scrim`, `--card-*`, `--year-*`, `--tag-*`, `--step-*`, `--drawer-rim`, `--switch-on`, …), so style new parts with tokens, not hex. Only the art changes by component: `Fireflies` become falling petals, `VineDivider` becomes a cherry branch, the garden and About stage use `public/v2/day/`, and the resume leaf becomes a blossom. Project case studies keep their night palettes in both modes (the header keeps its night look there).

**Type scale.** Satoshi for copy and labels, Chillax for headings, Borel for the wordmark and the About greeting. Each step is a `type-*` utility that steps down below `lg`; colour is never part of a step. Use `<Text variant="…" tone="…">` (or the class directly):

| Step | lg / mobile | Face | Use |
|---|---|---|---|
| `display` | 96 / 40 | Chillax 600 | Project hero titles |
| `h1` | 64 / 40 | Chillax 600 | Page and section titles, stats |
| `h2` | 40 / 28 | Chillax 500 | Problem, highlight titles, home intro |
| `h3` | 28 / 24 | Chillax 500 | Entry names, focus cards |
| `lead` | 24 / 20 | Satoshi 400 | Intros, reflections |
| `body` | 18 / 16 | Satoshi 400 | Running text |
| `body-sm` | 16 | Satoshi 400 | Captions, card blurbs |
| `label` | 16 | Satoshi 700 | Kickers (uppercase, +8% tracking) |
| `label-lg` | 18 | Satoshi 700 | Skill group names |
| `hero-label` | 20 / 16 | Satoshi 700 | Hero kicker |
| `chip` | 16 | Satoshi 500 | Tags, filter chips |
| `button` | 18 | Satoshi 500 | Buttons, nav |
| `card-title` | 26 / 20 | Satoshi 700 | Project card titles (uppercase) |
| `script` | 120 / 72 | Borel | "hi, i'm jaden" |
| `wordmark` | 36 / 26 | Borel | Header logo |

**Components.** `PageFrame` (theme, fireflies, gutters), `Header` (vine, nav, mobile menu), `VineDivider`, `Fireflies`, `Text`, `Button` / `buttonClass()` (`primary`, `ghost`), `ActionLink` (picks `<Link>` / `<a>`, shows empty links as pending), `FilterChip`, `Chip` (tech tag; `color` overrides the primary), `Icon`, `LanternIcon`, `StrokeFrame` / `strokeStyle()` (gradient rims on any sides).

### Tailwind CSS v4

Tailwind is loaded via the `@tailwindcss/vite` Vite plugin — there is no `tailwind.config.js`. All customization goes in `src/index.css` using `@layer` and `@theme` directives.

### Deployment (Vercel)

Deployed to Vercel. `vercel.json` rewrites every path to `index.html` so `BrowserRouter` deep links (`/about`, `/project/:id`) load instead of 404ing; static files in `public/` are still served first.

Two feedback builds are separate Vercel projects whose production branches are `version-a` (`jaden-portfolio-a`, design 1.0) and `version-b` (`jaden-portfolio-b`, design 2.0). Pushing either branch redeploys its site; pushing `main` only makes a preview.
