# Faith on Fire — Website

A TanStack Start + React + TypeScript + Tailwind v4 + shadcn/ui monorepo for the
Faith on Fire men's brotherhood website. Scaffolded with
`shadcn@latest init --preset b6F9vW9Tc --template start --monorepo --pointer`.

## Getting started

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000` (Vite will pick the next free port if
3000 is busy). To build and preview a production bundle:

```bash
pnpm build
pnpm --filter web preview
```

Useful workspace-wide commands (run from the repo root, powered by Turborepo):

```bash
pnpm typecheck   # tsc --noEmit across all packages
pnpm lint        # eslint across all packages
pnpm format      # prettier --write
```

## Netlify deployment

This repo is configured for Netlify via `netlify.toml`:

- Build command: `pnpm build`
- Publish directory: `apps/web/dist/client`
- Node: `22`
- pnpm: `10.33.4`

TanStack Start prerenders the linked marketing pages during `pnpm build` and
generates `sitemap.xml` for `https://www.faithonfire.world`. The Netlify Vite
plugin also creates a server handler for TanStack Start server functions, which
the Join form uses to send email through Resend.

## Project structure

```
faith-on-fire/
├─ apps/web/                    # the TanStack Start app
│  ├─ public/                   # static assets (favicons, manifest, brand assets, PDFs)
│  └─ src/
│     ├─ routes/                # file-based routes (__root, index, blueprint, community, …)
│     ├─ components/            # page-level / app-specific components (header, footer, cards…)
│     └─ data/site.ts           # ALL site copy — nav, pillars, blueprint modules, resources, etc.
└─ packages/ui/                 # shared shadcn/ui component library (@workspace/ui)
   └─ src/styles/globals.css    # design tokens / Tailwind theme (see "Brand colors" below)
```

Adding more shadcn components:

```bash
pnpm dlx shadcn@latest add <component> -c apps/web
```

## Brand assets

The Faith on Fire logo asset pack has already been copied into the project:

- `apps/web/public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `favicon-48x48.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`,
  `android-chrome-512x512.png`, `mstile-150x150.png`, `site.webmanifest`
  — wired up in `apps/web/src/routes/__root.tsx` (`head().links`).
- `apps/web/public/assets/brand/` — full logo, icon-only mark, and white/
  transparent variants (`faith-on-fire-full-transparent.png`,
  `faith-on-fire-logo-transparent.png`, `faith-on-fire-icon-transparent.png`,
  plus `-white` variants in png/jpg/webp). The header uses
  `faith-on-fire-logo-transparent.png`; the hero and footer use
  `faith-on-fire-full-white.png`.

If you receive an updated asset pack, drop the files into
`apps/web/public/assets/brand/` (logo variants) and `apps/web/public/`
(favicons/manifest), overwriting the existing files — file names are already
referenced throughout the codebase, so no code changes should be needed for a
like-for-like asset refresh.

The **Faith on Fire Ebook** and **Workbook** are paid products, so the Resources
page does not expose downloadable PDF links.

## Brand colors & theme

All design tokens live in **`packages/ui/src/styles/globals.css`**:

- `:root` / `.dark` — Tailwind v4 CSS variables (`--background`, `--primary`,
  `--secondary`, `--accent`, etc.), set to the Faith on Fire palette (fire red
  `--primary`, flame orange `--secondary`, golden yellow `--accent`, warm
  cream `--background`, charcoal/ember `--foreground`).
- Brand-specific raw colors: `--fire-red`, `--flame-orange`, `--sun-gold`,
  `--ember-dark`, `--warm-cream` — also exposed as Tailwind colors
  (`bg-fire-red`, `text-sun-gold`, etc.) via the `@theme inline` block.
- Gradient/utility classes (in the `@layer utilities` block at the bottom of
  the file): `.gradient-fire`, `.gradient-flame`, `.gradient-ember`,
  `.gradient-warm`, `.text-gradient-fire`, `.glow-fire`.
- Fonts: **Oswald** (condensed, bold — used for all headings via
  `--font-heading`/`font-heading`) and **Inter** (body copy, `--font-body`),
  loaded via Google Fonts `<link>` tags in `__root.tsx`.

To adjust brand colors, edit the HSL values in `:root` — every other color
(buttons, borders, rings, chart colors, sidebar) derives from these via the
`@theme inline` mapping, so a handful of edits re-themes the whole site.

## Content

All real site copy (taglines, the three pillars, the 10 Blueprint modules,
resources, founder bio, testimonials, problem-section stats, etc.) lives in
`apps/web/src/data/site.ts`, sourced from the Faith on Fire Ebook and
Workbook. Edit that file to update copy without touching component code.

## Forms

The Contact page (`/contact`) form (`src/components/contact-form.tsx`) is fully
client-side validated with Zod, then submits to a TanStack Start server
function (`src/server/contact.ts`) that emails the message through Resend. The
email is sent to `RESEND_CONTACT_TO_EMAIL` and uses the sender's email as the
reply-to address.

## Environment

The e-book popup purchase button reads the SamCart checkout URL from:

```bash
VITE_SAMCART_EBOOK_URL=https://samcart.com/placeholder-faith-on-fire-ebook
RESEND_API_KEY=
RESEND_FROM_EMAIL="Faith on Fire <support@faithonfire.world>"
RESEND_CONTACT_TO_EMAIL=support@faithonfire.world
```

Set this in your local `.env` file and in Netlify environment variables when
the real SamCart link and Resend account are available. `RESEND_API_KEY` and
`RESEND_FROM_EMAIL` are required before the Contact form can send email.

In SamCart's product settings, also set the Return URL / Thank You Page to
`https://<your-domain>/ebook?purchased=1` so buyers are redirected back to
the site after checkout. The `/ebook` route reads that query param and shows
a confetti thank-you popup (`src/components/ebook-thank-you.tsx`) before
clearing it from the URL.

## SEO

Every route sets its own `<title>` and meta description via TanStack
Router's `head()` option on the route definition. Site-wide Open Graph /
Twitter Card defaults are set in `apps/web/src/routes/__root.tsx`.
