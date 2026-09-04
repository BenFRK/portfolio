# Improvements Log — Portfolio "BEN FRK"

Chronological log of every change applied to the project (audit → quick wins → dependencies →
architecture → GSAP hardening → CSS cleanup → docs). Verified with `tsc --noEmit`, `npm run lint`,
`npm run build`, and dev-server smoke tests at each stage.

---

## 1. Dependency upgrades

| Package | Before | After |
|---|---|---|
| `next` | 14.2.5 | **16.3.4** (App Router, Turbopack build) |
| `react` / `react-dom` | 18.x | **19.2.8** |
| `@types/react` / `@types/react-dom` | 18 | 19 |
| `eslint` | 8 (`.eslintrc.json`) | **9 flat config** (`eslint.config.mjs`) |
| `eslint-config-next` | 14.2.5 | **16.3.4** |
| `gsap` | 3.12.5 | **3.15.0** |
| `@gsap/react` | 2.1.1 | **2.1.2** |
| `sass` | 1.77.7 | **1.104.0** |

- `next lint` (removed in Next 16) → plain `eslint` script; `.eslintrc.json` deleted,
  flat config mirrors the `magicui` repo's `eslint.config.mjs`.
- `npm audit fix`: 7 → 1 residual dev-only advisory (`brace-expansion` via `glob`).
- `tsconfig.json` auto-updated by Next 16 (`jsx: react-jsx`, `target: ES2017`,
  `.next/dev/types` include). Confirmed `next dev --hostname 0.0.0.0` still supported.

## 2. Image fixes (critical bugs)

- All `next/image` `src` paths prefixed with `/` (`fb.svg` → `/fb.svg`, etc.) — relative
  paths without a leading slash break image optimization in production.
- Renamed files containing spaces: `vercel .svg` → `vercel.svg`, `Black Hole.png` →
  `black-hole.png`, `Black Hole (1).png` → `black-hole-1.png`.
- `Menu.tsx`: replaced bare `<img src="flower.png">` with `next/image` (fixes the
  `no-img-element` lint warning and gains optimization).

## 3. Fonts: Google Fonts → next/font

- Removed **6 duplicated** `@import url('https://fonts.googleapis.com/...Montserrat')`
  (one per SCSS file + globals.css). These were render-blocking and not self-hosted.
- `layout.tsx` now loads Montserrat via `next/font/google` with `variable: "--font-montserrat"`,
  applied to `<body>` — self-hosted, preloaded, no external request.
- Fix: `metadata.description` "Personnal portfolio" → "Personal portfolio".

## 4. Architecture: Server Components + code splitting

- Created `src/lib/gsap.ts` — single source of truth that calls `gsap.registerPlugin(ScrollTrigger)`
  **once** (was duplicated in 4 components and missing in Skills), uses ESM imports
  (`gsap/ScrollTrigger` instead of `gsap/dist/...`), re-exports `gsap`, `ScrollTrigger`, `Power4`.
- Created `src/app/part/LazySections.tsx` — loads the 5 GSAP sections with
  `next/dynamic(..., { ssr: false })`.
- `page.tsx` rewritten as a **Server Component** (`function Page()`, cleaned imports).
- **Result**: GSAP + ScrollTrigger + all 5 sections (~45 kB gzip) removed from the initial
  page HTML; initial load now carries only React runtime + layout + Menu.

## 5. Menu refactor (GSAP out of initial bundle)

- `Menu.tsx` no longer imports GSAP; open/close animation reimplemented with pure CSS
  keyframes (`menuSlideUp`, `menuFadeIn`) + `nth-child` stagger delays — same visual result.
- Buttons got explicit `type="button"`; state renamed to idiomatic `isOpen`/`setIsOpen`;
  used `next/image` for the flower asset.

## 6. GSAP hardening (scoping + cleanup)

- **Home.tsx**: global selectors `gsap.from("p")` / `gsap.from("a")` (which hit every
  `<p>`/`<a>` on the page) replaced with refs (`tagline`, `social` container, children array).
- **Contact.tsx**: the `repeat: -1` timeline created *during render* moved inside `useGSAP`
  (auto-revert on unmount); global `"a"` selector replaced with a `collectLink` ref callback
  targeting only the contact links; removed dead commented-out code.
- **Welcome.tsx**: `gsap.timeline()` moved inside `useGSAP`; dropped the invalid
  `Color: "white"` camelCase prop; typed `welcome` ref as `HTMLHeadingElement`.
- **Tech.tsx**: `txtglitch` timeline moved inside `useGSAP`; fixed a real bug where the
  **same ref** was attached to both the mobile and desktop `<Image>` (second one won) — split
  into `imaMobile` / `imaDesktop`, both now animated.
- Verified: 0 global string selectors remain; all 3 `timeline()` calls are inside `useGSAP`.

## 7. CSS cleanup & best practices

- `globals.css` rewritten:
  - **Design tokens**: `--color-primary` `rgb(88,6,6)`, `--color-primary-dark`,
    `--color-primary-light` — previously hard-coded ~15 times across SCSS modules.
  - `font-family: var(--font-montserrat)` set **once on `body`**; removed ~15 duplicated
    `font-family`/`font-optical-sizing`/`font-style` declarations across modules (inheritance).
  - Removed `* { margin/padding/scroll-behavior }` reset (Tailwind preflight already does it);
    `scroll-behavior: smooth` moved to `html` + **`prefers-reduced-motion: reduce`** support.
  - Flattened nested `@media` blocks on `body` (3× redundant `overflow-x: hidden`) to one rule.
- All SCSS modules:
  - Hard-coded bordeaux `rgb(88,6,6)`, `rgb(73,7,7)`, hover `rgb(248,158,158)` → CSS variables.
  - Dead commented-out blocks removed (Menu, Welcome, Tech); orphaned `details` selector removed.
  - Fixed `border: 5px sold red` typo (debug border, then removed entirely).
  - Removed invalid `gap: auto` in Skills.
  - Added `-webkit-backdrop-filter` for Safari; normalized spacing (`padding: 20px 20px` →
    `20px`, `border-radius:50%` → `50%`).
- `tailwind.config.ts`: `content` now targets the real source tree `./src/**/*` instead of
  non-existent `src/pages` / `src/components`.

## 8. New docs

- `.agents/PROJECT_CONTEXT.md` — this project's context/summary.
- `.agents/IMPROVEMENTS.md` — this log.

## Verification status

- `npx tsc --noEmit` ✅
- `npm run lint` ✅ (0 errors/warnings)
- `npm run build` ✅ (Turbopack, static prerender)
- Dev server HTTP 200, no hydration/runtime errors in logs ✅

## Known remaining / not done (out of scope)

- Metadata/SEO still minimal (no Open Graph, favicon, sitemap, robots, `metadataBase`).
- `.skills p` stays `opacity: 0` on mobile (title hidden) — preserved as-is, may be intent.
- `prefers-reduced-motion` only covers scroll-behavior; GSAP animations not yet gated.
- `brace-expansion` dev-only advisory remains (unfixable without breaking semver).