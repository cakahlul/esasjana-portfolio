# CLAUDE.md

This file gives Claude Code the project context needed to work on this repository productively. Read it first before starting any work.

## What this project is

A personal portfolio and blog for **Esa Sjana** — a software engineer & creative technologist. The site has four surfaces:

1. **Portal home** (`/`) — bento-style landing page routing visitors to all sections
2. **Projects** (`/projects`, `/projects/[slug]`) — showcase of built work
3. **Experience** (`/experience`) — resume-style timeline
4. **Blog** (`/blog`, `/blog/[slug]`) — MDX posts

Design direction: **bold and animation-heavy** while remaining **fast to open**. Theme toggle with persistence. Blog content as MDX in repo.

## Tech stack (authoritative — keep in sync with package.json)

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** | Turbopack dev, RSC default, View Transitions |
| Language | TypeScript 5 | Target ES2022, strict mode |
| Package manager | **pnpm** | See `packageManager` field; do not use npm/yarn |
| Styling | Tailwind CSS 3.4 | CSS-variable HSL tokens, `darkMode: 'class'` |
| Tailwind plugins | `@tailwindcss/typography`, `tailwindcss-animate` | |
| UI primitives | **shadcn/ui** (new-york style) on Radix | Files live in `components/ui/`, owned in-repo |
| Icons | `lucide-react` | |
| Theme | `next-themes` with class strategy, persistence, `disableTransitionOnChange` | |
| Fonts | `geist` npm package (Geist Sans + Geist Mono) as CSS vars | **Not** `next/font/google` — network blocked in some envs |
| MDX pipeline | `next-mdx-remote/rsc` + `gray-matter` + remark/rehype + `shiki` | RSC-native, zero client JS for content |
| MDX plugins | `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` | |
| Validation | `zod` | Frontmatter schema validation |
| SEO | Native Next 15 `sitemap.ts`, `robots.ts`, `manifest.ts`, `next/og` dynamic OG | |
| Lint/format | ESLint (`next/core-web-vitals`) + Prettier + `prettier-plugin-tailwindcss` + `eslint-config-prettier` | |
| Bundle audit | `@next/bundle-analyzer` via `ANALYZE=true pnpm build` | |

## Folder layout

```
app/                  # Next.js App Router
  layout.tsx          # Root — theme, fonts, Nav, Footer, CommandPalette
  page.tsx            # Home (portal)
  projects/           # /projects + /projects/[slug]
  experience/
  blog/               # /blog + /blog/[slug] + /blog/rss.xml
  contact/
  api/og/             # Edge runtime OG image generator
  sitemap.ts | robots.ts | manifest.ts
  not-found.tsx | error.tsx | loading.tsx

components/
  ui/                 # shadcn/ui primitives (button, card, dialog, sheet, dropdown-menu, command)
  layout/             # Nav, Footer, Container, ThemeProvider, ThemeToggle, CommandPalette
  mdx/                # MDXComponents map (custom link, image, callout)

content/
  blog/               # *.mdx posts (frontmatter validated at build via zod)

lib/
  blog.ts             # getAllPosts, getPostBySlug, getAllTags, getPostSlugs
  mdx.ts              # renderMDX (RSC compile with remark/rehype/shiki)
  schema.ts           # zod PostFrontmatterSchema + Project/Experience types
  seo.ts              # buildMetadata helper
  utils.ts            # cn, formatDate
  data/
    site.ts           # siteConfig (name, url, description, links)
    projects.ts       # Typed Project[] seed data
    experience.ts     # Typed Experience[] seed data

hooks/                # (empty — for Phase 4)
public/               # Static assets
```

## Key files — always read before modifying

- `app/layout.tsx` — theme, fonts, Nav, Footer, CommandPalette wrapping
- `app/globals.css` — CSS variable tokens for light/dark themes
- `tailwind.config.ts` — design tokens, plugins, font family CSS vars
- `lib/data/site.ts` — siteConfig (site name, url, links)
- `lib/blog.ts` — blog content pipeline; frontmatter schema enforced here
- `lib/schema.ts` — zod schemas and TypeScript types for all content

## Commands

```bash
pnpm dev            # Turbopack dev server
pnpm build          # Production build
pnpm start          # Production server
pnpm lint           # ESLint (reports only, no fix)
pnpm typecheck      # tsc --noEmit
pnpm format         # Prettier write
pnpm format:check   # Prettier check
pnpm analyze        # Bundle analyzer (ANALYZE=true)
```

## Performance budget (enforce before merging changes)

- Home route first load JS **< 150 KB** gzipped (currently ~102 KB)
- LCP < 2.5s mobile · CLS < 0.1 · INP < 200ms
- Lighthouse ≥ 90 mobile / ≥ 95 desktop
- Every page must be a **Server Component by default**; only mark `'use client'` on interactive leaves (theme toggle, nav scroll state, forms, motion wrappers, R3F scenes)

## Rules & conventions

- **Always use pnpm**. Do not run `npm install` — it will corrupt the lockfile.
- **Always use `@/` path alias** for imports (not relative).
- **Always use the `cn()` helper** from `lib/utils` for conditional Tailwind classes.
- **Always use `buildMetadata()`** from `lib/seo` when creating page metadata.
- **Blog frontmatter is zod-validated** in `lib/blog.ts` — invalid frontmatter fails the build. Required fields: `title`, `description`, `date`, `tags`.
- **Server Components by default.** Add `'use client'` only when you genuinely need hooks, events, or browser APIs.
- **Images** use `next/image` — never raw `<img>`. Always provide `alt` and `sizes`.
- **Links** internal → `next/link`. External → `<a target="_blank" rel="noopener noreferrer">`.
- **Dynamic routes** must export `generateStaticParams` for SSG.
- **Fonts**: use `GeistSans` / `GeistMono` from `geist/font/sans` and `geist/font/mono`. Never `next/font/google` (network-blocked in some envs).
- **Dark mode**: all colors via CSS vars (`hsl(var(--foreground))`, etc.) or Tailwind tokens (`bg-background`, `text-foreground`). Never hard-code hex.
- **Respect `prefers-reduced-motion`** in every animated component — must have a non-animated fallback.
- Keep commits focused per phase. Follow the existing `feat: Phase N —` prefix.

## Branches & PR workflow

- Development branch: `claude/portfolio-tech-stack-review-5bLf2`
- Base branch: `main`
- Never push to `main` directly
- PRs created via GitHub MCP server (`mcp__github__create_pull_request`)
- One PR covers foundation phases; subsequent phases can either extend or create new PRs

## Implementation phases (overall plan)

The full plan lives at `/root/.claude/plans/cozy-questing-eich.md` (Claude-side, not in the repo). Summary:

- **Phase 1 ✅** — Foundation: Next 15, React 19, pnpm, Prettier, shadcn/ui base, Tailwind tokens, next-themes, Geist fonts
- **Phase 2 ✅** — IA & content pipeline: all routes, MDX blog, seed data, SEO (sitemap/robots/manifest/OG/RSS), error boundaries
- **Phase 3 ✅** — Chrome & theme UI: Nav (sticky, blur, active indicator, mobile sheet), Footer, ThemeToggle (sun/moon dropdown), Cmd+K CommandPalette, Container, CLAUDE.md
- **Phase 4 ⏳** — Animation system: Framer Motion primitives (Reveal, Parallax, SplitText, Marquee, MagneticButton, CursorFollower), Lenis smooth scroll, R3F hero blob, hooks (use-reduced-motion, use-magnetic, use-active-section), SVG timeline for experience, blog reading progress + TOC
- **Phase 5 ⏳** — Forms, analytics, polish: contact form (RHF + zod + Server Action + Resend), Vercel Analytics + Speed Insights, Lighthouse & axe audits
- **Phase 6 ⏳** — Real content, E2E, deploy: real posts/projects/experience/copy/images, Playwright smoke tests (home, blog, theme toggle), final deploy

## Update protocol for this file

**Every time a phase completes, update CLAUDE.md**:
1. Bump the phase checkboxes (⏳ → ✅)
2. Add any new deps, conventions, or folders introduced in the phase
3. Update the tech stack table if anything changed
4. Keep folder layout diagram in sync with what's actually in the repo
5. Add new commands if `package.json` scripts changed

Keep this file **concise and scannable** — bullet points over prose, facts over narrative.
