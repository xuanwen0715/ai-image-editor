# Nano Banana – AI Image Editor (CODEX)

This repository contains a Next.js 16 landing page and demo UI for an AI-powered image editor. It showcases an upload/prompt-driven editor and a component library built with Tailwind CSS and shadcn/ui.

## Overview

- App type: Next.js App Router (React 19, TypeScript)
- Purpose: Marketing page + interactive client-side editor demo (no backend integration)
- Styling: Tailwind CSS v4, CSS variables, shadcn/ui components
- Analytics: @vercel/analytics

## Tech Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, PostCSS
- shadcn/ui + Radix primitives, lucide-react icons
- Utilities: clsx, tailwind-merge

## How To Run

- Preferred package manager: pnpm (lockfile present)
- Install: `pnpm install`
- Dev server: `pnpm dev` (runs Next.js on localhost)
- Build: `pnpm build`
- Start: `pnpm start` (after build)
- Lint: `pnpm lint`

No environment variables are required for a basic local run.

## Directory Structure

- `app/` — App Router pages and global layout/styles
  - `app/layout.tsx` — Root layout and metadata
  - `app/page.tsx` — Home page composing sections
  - `app/globals.css` — Tailwind v4 setup and CSS variables
- `components/` — Page sections and UI primitives
  - `components/editor.tsx` — Client-side editor demo (upload + prompt UI)
  - `components/ui/*` — shadcn/ui components
- `hooks/` — Reusable hooks
- `lib/` — Utilities (e.g., `lib/utils.ts` with `cn` helper)
- `public/` — Static assets and sample images
- `styles/` — Additional global styles (Tailwind)

## Notable Config

- `next.config.mjs:1` — Images unoptimized; TypeScript build errors ignored
- `tsconfig.json:1` — Strict mode enabled; `@/*` path alias to project root
- `postcss.config.mjs:1` — Tailwind via `@tailwindcss/postcss`
- `components.json:1` — shadcn/ui configuration and aliases

## Key Files

- `app/layout.tsx:1` — Sets site metadata: "Nano Banana - AI Image Editor"
- `app/page.tsx:1` — Assembles `Header`, `Hero`, `Features`, `Editor`, `Showcase`, `Testimonials`, `FAQ`, `Footer`
- `components/editor.tsx:1` — Implements file upload preview and prompt textarea; "Generate Now" is UI only

## Assets

- `public/` includes sample portraits and scenes for the demo UI (e.g., `portrait-photo-before.jpg`, `same-person-in-anime-art-style.jpg`, `same-city-street-at-golden-hour-sunset.jpg`).

## Development Notes

- Editor logic is client-side only; there’s no image-generation backend.
- If you later add an API route, prefer `app/api/*` with edge/runtime settings as needed.
- Tailwind tokens are defined in `app/globals.css` using CSS variables for light/dark.

## Common Tasks

- Add backend generation:
  1) Create `app/api/generate/route.ts` (POST) to accept prompt + image
  2) Wire `components/editor.tsx` button to call the API and display results
- Customize theme: Adjust CSS variables in `app/globals.css`
- Trim bundle: Remove unused `components/ui/*` primitives

## Scripts (package.json)

- `dev` — Start Next.js dev server
- `build` — Production build
- `start` — Start production server
- `lint` — Run ESLint

## Troubleshooting

- If fonts or icons differ, confirm network access and that Tailwind is processing `app/globals.css`.
- For TypeScript warnings during `next build`, note `ignoreBuildErrors: true` in `next.config.mjs`.
