# Project Context — Portfolio "BEN FRK"

## Overview
Personal portfolio website for **FAAROUK Abdoullah Ben Alex** (alias Ben FRK), a web developer.
Single-page experience with a heavy GSAP-driven visual identity (scroll animations, skew/glitch
effects, pinned sections). Content lives entirely on one route (`/`).

## Location
- Repo: `BenFRK/portfolio` (branch `main`), git remote over SSH.
- The repo root also contains `magicui/`, an unrelated separate Next.js 16 playground project — ignore it when working on this portfolio.
- All app code lives under `portfolio/src/`.

## Stack
| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.4** (App Router, Turbopack) | `next dev --hostname 0.0.0.0`, build via Turbopack |
| React | **19.2.8** | |
| Language | TypeScript 5 (strict) | |
| Styling | **SCSS Modules** + Tailwind 3 | SCSS is the primary design system; Tailwind mostly for responsive utilities in JSX |
| Animation | **GSAP 3.15** + `@gsap/react` (useGSAP) + ScrollTrigger | Shared setup in `src/lib/gsap.ts` |
| Fonts | `next/font` (Montserrat) | Exposed as `--font-montserrat` CSS variable, set once on `body` |
| Lint | ESLint 9 **flat config** (`eslint.config.mjs`) | `npm run lint` (was `next lint`, removed in Next 16) |
| Colors | CSS custom properties in `globals.css` | `--color-primary`, `--color-primary-dark`, `--color-primary-light` |

## Architecture (App Router)

```
portfolio/src/
├── lib/gsap.ts               ← shared GSAP setup (registers ScrollTrigger once)
├── app/
│   ├── layout.tsx            ← root layout: metadata, next/font, <Menu/>
│   ├── page.tsx              ← Server Component, assembles the 5 sections
│   ├── globals.css           ← tokens, base styles, reduced-motion
│   ├── part/
│   │   ├── LazySections.tsx  ← client module: next/dynamic (ssr:false) for the 5 sections
│   │   ├── menu/             ← fixed nav, CSS-only open/close animation
│   │   ├── welcome/          ← hero "WELCOME" (GSAP)
│   │   ├── Home/             ← tagline + social links (GSAP)
│   │   ├── About/            ← bio + image cubes (GSAP)
│   │   ├── Skills/           ← skills grid, <Tech/> items (GSAP)
│   │   └── Contact/          ← contact block (GSAP)
│   └── Components/Tech.tsx   ← skill logo card ('use client')
└── ...configs                ← tsconfig, tailwind.config.ts, eslint.config.mjs, postcss.config.mjs
```

Key decisions:
- **`page.tsx` is a Server Component.** All five animated sections are client components
  loaded through `next/dynamic(..., { ssr: false })` in `LazySections.tsx`. Consequence:
  section content is **not** in the initial HTML — it appears after hydration. This is the
  accepted trade-off to keep GSAP + ScrollTrigger (~45 kB gzip) out of the initial bundle.
- **GSAP is scoped**: every animation uses refs (never global selectors like `gsap.from("p")`)
  and every `gsap.timeline()` is created inside a `useGSAP` callback, so it is reverted/
  cleaned up automatically on unmount.
- **Menu has no GSAP**: its open/close animation is pure CSS (keyframes), so the initial
  bundle does not depend on GSAP at all.

## Data / external calls
None. The site is fully static — no API routes, no data fetching, no env vars.

## Commands (run from `portfolio/`)
```bash
npm run dev      # dev server on 0.0.0.0 (Turbopack)
npm run build    # production build (Turbopack)
npm run start    # serve the production build
npm run lint     # ESLint (flat config)
npx tsc --noEmit # typecheck
```

## Gotchas
- Dev server binds `0.0.0.0`; if port 3000 is busy it falls back to 3001.
- `next dev`/`next build` may rewrite `tsconfig.json` (e.g. set `jsx: react-jsx`, add
  `.next/dev/types` to `include`) — expected behavior, do not revert.
- Images in `public/` must be referenced with a leading `/` (`/fb.svg`, not `fb.svg`) or
  `next/image` breaks at runtime. No spaces in asset filenames.
- `npm audit fix` leaves one dev-only `brace-expansion` advisory (via `glob`) that cannot
  be resolved without a breaking bump — it does not affect the production bundle.
- Animations that pin elements (ScrollTrigger `pin: true` in Welcome/About) can misbehave
  when sections mount late; if tweaking, test scroll behavior end-to-end.

## Related docs
- `IMPROVEMENTS.md` — log of all changes applied to the project.