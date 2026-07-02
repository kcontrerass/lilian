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
  - Colors: `lilian-purple`, `lilian-orange`, `lilian-teal`, `lilian-pink`, `lilian-beige` and their `-dark`/`-light` variants
- PostCSS config uses `@tailwindcss/postcss` (Tailwind v4 plugin).

## Fonts

Fonts load via `next/font/google` in `app/layout.tsx` and are exposed as CSS variables. The classes `font-chronica`, `font-owl-cute`, and `font-gotham` are configured in `@theme`.

## Components & routing

- `app/layout.tsx` is the root server layout (Spanish metadata, font variables).
- `app/page.tsx` is the home page and is a client component (`"use client"`).
- Shared UI lives in `components/` and is imported as `@/components/<Name>`.
- Anchor links on the page reference `#catalogo`, `#historia`, `#galeria`, `#testimonios`.

## Images & assets

- Static assets live in `public/assets/` and are referenced by `/assets/<filename>`.
- Remote images are only allowed from `images.unsplash.com` (see `next.config.ts`).
- Several `Image` components use `fill` + `object-cover`/`object-contain`; ensure the parent has a defined size.

## Linting

- ESLint uses the flat config format (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- `npm run lint` runs `eslint` directly. There is no separate `typecheck` script; rely on `next build` for TypeScript validation.
