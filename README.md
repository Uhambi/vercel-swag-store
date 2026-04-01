# Vercel Swag Store

E-commerce storefront demo built with **Next.js 16**, **React 19**, and **Turborepo**. Uses Server Components, Suspense streaming, `use cache`, and Server Actions. Deployed on Vercel.

Based on the [Next.js Foundations starter](https://github.com/vercel/nextjs-foundations-starter) from the [Vercel Academy - Next.js Foundations](https://vercel.com/academy/nextjs-foundations) course.

## Quick Start

```bash
# Prerequisites: Node.js 24, pnpm 10
pnpm install

# Development (all workspaces)
pnpm dev            # → http://localhost:3000

# Production build
pnpm build

# Type-check all packages
pnpm check-types

# Lint & format (Biome)
pnpm lint
pnpm format
pnpm check          # lint + format in one pass
```

## Workspaces

| Workspace | Package | Description |
| --- | --- | --- |
| `apps/web` | `@repo/web` | Next.js storefront - pages, API integration, cart logic |
| `packages/ui` | `@repo/ui` | Shared component library (Button, Badge, Skeleton) |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + CSS custom properties |
| State management | [Zustand](https://zustand-demo.pmnd.rs/) |
| UI primitives | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | [Geist Sans](https://vercel.com/font) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (light / dark) |
| Monorepo | [Turborepo 2](https://turbo.build/repo) + [pnpm 10](https://pnpm.io/) |
| Linting | [Biome 2](https://biomejs.dev/) via [Ultracite](https://github.com/haydenbleasel/ultracite) preset |
| Hosting | [Vercel](https://vercel.com/) |

## Scripts Reference

| Command | Scope | Description |
| --- | --- | --- |
| `pnpm dev` | all | Start all workspaces in dev mode |
| `pnpm build` | all | Production build via Turborepo |
| `pnpm start` | all | Start production server |
| `pnpm check-types` | all | TypeScript type-check every package |
| `pnpm lint` | root | Biome lint |
| `pnpm format` | root | Biome format (auto-fix) |
| `pnpm check` | root | Biome lint + format in one pass |

## License

MIT
