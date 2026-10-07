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
| Data | `src/assets/data/*.json` | Content: `projects.json`, `about.json`, `resume.json`, `heroThemes.json` |
| Hooks | `src/hooks/` | State and side effects (URL-synced filters, layout measurement) |
| Features | `src/features/<feature>/` | `<Feature>Page.tsx` composes the page from `components/` and services |
| UI kit | `src/components/ui/` | Shared primitives and the design system (see below) |
| Utils | `src/components/utils/` | Utility components (e.g. ScrollToTop) |

Every feature follows the same shape — `projects/`, `about/`, `resume/`:

```
src/features/about/
  AboutPage.tsx          ← route component: PageFrame + sections, reads services
  components/            ← presentational sections and their parts
```

Page content never lives in components: it goes in a JSON file with an interface in `src/domain/models/` and a service in `src/domain/services/`.

### Routing (App.tsx)

- `/` → `ProjectPage` — filterable project gallery
- `/project/:id` → `ProjectDetail` — individual project view
- `/about` → `AboutPage` — content from `about.json` via `AboutService`
- `/resume` → `ResumePage` — content from `resume.json` via `ResumeService`. Entries link to a case study with `projectId`; ids that don't match a project are dropped, so cards never link to a blank page.

### Project data flow

`projects.json` → `ProjectService` (loads + queries) → `useProjectFilters` hook (syncs state to URL search params) → `ProjectPage` / `ProjectDetail`

Filter state lives entirely in URL query params (`?q=`, `?cat=`, `?tag=`), making filters bookmarkable. `ProjectDetail` reads the same params to determine the "next project" navigation sequence within the current filtered set.

**To add a project:** add an entry to `src/assets/data/projects.json` matching the `ProjectData` interface in `src/domain/models/Project.ts`. No code changes needed. Put its card icon in `public/icons/projects/` and set `icon` to its URL; it's drawn with its own colours (set `iconMask: true` for a single-colour shape to be painted with the brand gradient). Without `icon`, the card shows the gradient boat.

### Project hero and overview

Each project's hero lives in `src/assets/data/heroThemes.json` (model: `src/domain/models/HeroTheme.ts`), drawn to Figma's "Project Hero Page Designs" boards:

- `layers` animate between the desktop start and end frames (1800×1044 scene, scaled to the viewport width).
- `mobile` (`scale`, `start`, `end`) frames the same scene for portrait screens, matching the "Project Hero Page Designs - Mobile" board (375×812): the scene is scaled and panned from the start to the end offset while the layers animate. The canvas is fitted to the screen height and centred.
- `foreground` is the colour the hero ends on. The overview starts in it and fades into the page ink. `overviewSurface()` picks light-surface components (ink text, translucent panel, `--theme-dominant-on-light` accents) when dark text reads better on that colour.

### UI kit and theming

All styling decisions live in `src/index.css` and `src/components/ui/`. Use the kit rather than raw sizes, weights or hex colours.

**Page themes.** Every page has one dominant colour. `<PageFrame theme="projects" | "about" | "resume">` sets `data-theme`, and the matching block in `index.css` defines `--theme-dominant` and `--theme-stroke` (its angular rim paint). Kit components and the `theme` colour (`text-theme`, `bg-theme/5`, `outline-theme`, `.stroke-theme`) follow it, so the same component reads gold on Projects, green on About, orange on Resume. To add a theme: add a `[data-theme="…"]` block in `index.css` and a member to `PageTheme` in `src/components/ui/theme.ts`. Fixed brand colours (`primary`, `secondary`, `accent`, `blush`, …) stay available for elements that deliberately stand apart from the page theme.

**Type scale.** Satoshi everywhere, one scale, weights 400/500/700/900 only. Each step is a `type-*` utility that steps up at `lg`; colour is never part of a step. Use `<Text variant="…">` (or the `type-*` class directly):

| Step | Mobile → lg | Weight | Use |
|---|---|---|---|
| `display` | 48 → 96 | 900 | Project hero titles, Up Next |
| `h1` | 32 → 48 | 700 | Section headings |
| `h2` | 24 → 32 | 700 | Card titles, dates, page labels |
| `title` | 24 → 32 | 400 | Entry / card names |
| `lead` | 20 → 32 | 400 | Intro paragraphs |
| `callout` | 18 → 24 | 700 | Summary copy inside cards |
| `label` | 16 → 24 | 700 | Organisations, group labels |
| `body` | 16 → 20 | 400 | Running text |
| `body-sm` | 16 | 400 | Dense text, inputs |
| `button` | 14 → 28 | 500 | Buttons |
| `pill` | 16 → 20 | 700 | Skill pills, tag tiles |
| `tag` | 14 → 16 | 700 | Tech tags |
| `overline` | 12 → 14 | 700 | Kickers, captions (tracked) |

Headings and buttons have no element styles — an unstyled `<h2>` looks like body text — so pick the step by role, and the tag by document outline. Exceptions: the header keeps its brand faces (Borel wordmark, Chillax nav), and the fixed-size project card (`.card-*`) and project hero title use the scale's desktop sizes without stepping.

**Components.** `PageFrame` (page shell: theme, gutters, header clearance), `Text`, `Button` / `buttonClass()` (`chip`, `pill`, `outline` variants), `Board` (tinted panel with a rim), `Pill`, `StrokeFrame` / `strokeStyle()` (gradient rims on any sides), `GradientIcon`, `ArrowIcon`.

### Tailwind CSS v4

Tailwind is loaded via the `@tailwindcss/vite` Vite plugin — there is no `tailwind.config.js`. All customization goes in `src/index.css` using `@layer` and `@theme` directives.

### Deployment (Vercel)

Deployed to Vercel. `vercel.json` rewrites every path to `index.html` so `BrowserRouter` deep links (`/about`, `/project/:id`) load instead of 404ing; static files in `public/` are still served first.

Two feedback builds are deployed from the CLI as separate Vercel projects (production URLs are public, unlike preview URLs): `jaden-portfolio-a` (branch `version-a`) and `jaden-portfolio-b` (branch `version-b`); `main` holds the latest shared code. Redeploy from the matching checkout with `npx vercel deploy --prod`.
