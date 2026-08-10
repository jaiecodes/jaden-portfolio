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
| Data | `src/assets/data/projects.json` | Single source of truth for all project content |
| Hooks | `src/hooks/` | Custom React hooks; filter state synced to URL params |
| Features | `src/features/` | Feature-scoped component trees (projects, about, work) |
| Pages | `src/pages/` | Thin page components that compose feature components |
| UI | `src/components/ui/` | Shared primitives (Header, Badge, Input, Dropdown, etc.) |
| Utils | `src/components/utils/` | Utility components (e.g. ScrollToTop) |

### Routing (App.tsx)

- `/` → `ProjectPage` — filterable project gallery
- `/project/:id` → `ProjectDetail` — individual project view
- `/about` → `AboutPage`
- `/work` → `WorkPage`
- `/resume` → placeholder (not yet built)

### Project data flow

`projects.json` → `ProjectService` (loads + queries) → `useProjectFilters` hook (syncs state to URL search params) → `ProjectPage` / `ProjectDetail`

Filter state lives entirely in URL query params (`?q=`, `?cat=`, `?tag=`), making filters bookmarkable. `ProjectDetail` reads the same params to determine the "next project" navigation sequence within the current filtered set.

**To add a project:** add an entry to `src/assets/data/projects.json` matching the `ProjectData` interface in `src/domain/models/Project.ts`. No code changes needed.

### Typography system

Defined in `src/index.css` using Tailwind v4's `@layer base`. Use semantic HTML tags — styles are applied globally:

- `h1`, `h2` → **Chillax** (page/section titles)
- `h3`, `h4` → **Borel** (section labels, uppercase)
- `h5`, `h6`, `button` → **Satoshi Bold** (uppercase, tracked)
- `body` / `.body-primary` → Satoshi Regular (fluid 18–24px)
- `.body-secondary` → Satoshi Regular, `text-zinc-400` (16–18px)
- `.caption-btn` / `.caption-btn-sm` → Satoshi Bold, uppercase, extra tracked

Utility classes `.font-borel`, `.font-satoshi`, `.font-chillax` override the font family inline when needed.

### Tailwind CSS v4

Tailwind is loaded via the `@tailwindcss/vite` Vite plugin — there is no `tailwind.config.js`. All customization goes in `src/index.css` using `@layer` and `@theme` directives.

### Deployment (Vercel)

Deployed to Vercel, which handles SPA fallback routing natively — no special config needed. `BrowserRouter` works as-is.
