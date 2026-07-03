# Agent notes for Lilian

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This repo uses **Next.js 16.2.10** + **React 19** + **Tailwind CSS v4**. APIs and conventions may differ from older training data. Before writing Next.js code, read the local App Router guide at `node_modules/next/dist/docs/01-app/index.md` and heed any deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack & project shape

- Single Next.js app using the **App Router** (`app/`). No monorepo, no test framework, no CI workflows.
- Package manager: `npm` (lockfile present). Node types target `^20`, so use Node 20+.
- Path alias: `@/*` maps to repo root (`./`).

## Everyday commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # also acts as the typecheck step
npm run lint     # ESLint flat config via eslint-config-next
```

Verification order: `npm run lint && npm run build`.

## Styling & Tailwind v4

- Tailwind is imported in `app/globals.css` with `@import "tailwindcss";`.
- Custom design tokens are declared in `app/globals.css` inside an `@theme` block:
  - Fonts: `font-chronica`, `font-owl-cute`, `font-gotham`
  - Brand colors: `lilian-purple`, `lilian-orange`, `lilian-teal`, `lilian-pink`, `lilian-beige` and their `-dark`/`-light` variants
  - Semantic tokens: `brand-primary`, `brand-secondary`, `brand-accent`, `brand-gold`, `brand-coral`, `brand-cream`, `brand-muted` and their `-dark`/`-light` variants
  - Color values match the official brand palette: primary `#ff8f2d`, secondary `#3d246a`, accent `#30beb3`, gold `#e9c468`, coral `#e96f50`, cream `#f9f2dc`, muted `#ceebec`
- PostCSS config uses `@tailwindcss/postcss` (Tailwind v4 plugin).

## Fonts

- `font-chronica` (Chronica Pro) loads via `next/font/local` in `app/layout.tsx`, sourced from all 18 weight/style files in `public/fonts/` (weights 100–900, normal + italic). Match Chronica Pro's official weight scale when referencing a specific weight: 100 Thin, 200 Ultra Light, 300 Light, 350 Book, 400 Regular, 500 Medium, 700 Bold, 800 Black, 900 Heavy.
- `font-owl-cute` (Owl Cute Regular 400) loads via `next/font/local` from `public/fonts/Owl Cute Regular 400.ttf`.
- `font-gotham` (Montserrat) loads via `next/font/google`, since no local font files exist for it.
- All three are exposed as CSS variables and configured as `font-chronica`, `font-owl-cute`, `font-gotham` in `@theme`.

## Components & routing

- `app/layout.tsx` is the root server layout (Spanish metadata, font variables).
- `app/page.tsx` is the home page and should remain a thin orchestrator of feature sections. Business logic and section markup live inside `features/`.
- Shared UI lives in `components/` and is imported as `@/components/<Name>`.
- Anchor links on the page reference `#catalogo`, `#historia`, `#galeria`, `#testimonios`.

## Clean Architecture rule

This project follows a **feature-based Clean Architecture** as the default organization pattern:

- Each page section or domain lives in `features/<feature-name>/` with a flat structure:
  - `components/` — presentational components and section orchestrators.
  - `hooks/` — custom hooks for feature-specific logic (state, effects, computations).
  - `constants.ts` — feature-specific text, asset paths, anchors, and config.
  - `types.ts` — feature-specific TypeScript types and interfaces.
- `components/` is reserved for genuinely shared UI (e.g., `Header`, future `Footer`, `Button`).
- `lib/constants.ts` is reserved for constants used by more than one feature (navigation links, CTA, brand).
- `app/page.tsx` should only import and render feature sections; it must not contain section markup, data definitions, or business logic.
- Keep components small and focused on one responsibility.
- Extract logic into custom hooks instead of leaving it inline in components.
- Avoid magic strings: text, asset paths, anchors, and labels must live in `constants.ts`.
- Prefer Server Components by default; add `"use client"` only when interactivity or browser APIs are required.
- Do not add external libraries unless explicitly requested.

## Images & assets

- Static assets live in `public/assets/` and are referenced by `/assets/<filename>`.
- Remote images are only allowed from `images.unsplash.com` (see `next.config.ts`).
- Several `Image` components use `fill` + `object-cover`/`object-contain`; ensure the parent has a defined size.

## Linting

- ESLint uses the flat config format (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- `npm run lint` runs `eslint` directly. There is no separate `typecheck` script; rely on `next build` for TypeScript validation.

## Documentation rule (Context7)

Always use **Context7** to query official, up-to-date documentation before writing or modifying code. Do not rely on training memory or assumptions about library APIs.

- Resolve the correct Context7 library ID first (e.g., `/vercel/next.js` for Next.js, `/tailwindlabs/tailwindcss` for Tailwind CSS).
- Query Context7 for the specific topic (hooks, components, config, styling, accessibility, etc.).
- Prefer official docs and code snippets from Context7 over general knowledge.
- Apply this rule to every framework, library, or platform used in the project (Next.js, React, Tailwind CSS, TypeScript, etc.).
