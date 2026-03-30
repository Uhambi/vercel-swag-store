# Architecture

Technical decisions and patterns adopted across the Vercel Swag Store monorepo.

## Monorepo

The project uses **Turborepo + pnpm workspaces** with two packages:

- `apps/web` (`@repo/web`) - Next.js storefront
- `packages/ui` (`@repo/ui`) - shared component library

The UI package is consumed via `workspace:*` protocol - no publish step, no versioning overhead. A single lockfile and a single Biome config enforce consistency across all code. Turborepo's task pipeline ensures `@repo/ui` is always type-checked before `@repo/web` builds (`dependsOn: ["^build"]`).

## Caching Strategy

All server data fetching uses the `'use cache: remote'` directive with explicit `cacheLife()` profiles.

The `remote` variant is used because the app is deployed on Vercel. Remote cache entries are stored on the Vercel edge network and shared across all regions and deployments. This avoids redundant API calls after each deploy and eliminates per-isolate cold cache misses.

### Cache Profiles

| Function | Location | Profile | Rationale |
| --- | --- | --- | --- |
| `getCachedProduct` | `products/[param]/page.tsx` | `hours` | Product metadata (name, description) is near-static catalog data |
| `ProductContent` | `products/[param]/product-content.tsx` | `hours` | Product body (images, price, description) - same as above |
| `getCachedCategories` | `search/search-shell.tsx` | `hours` | Category list changes only when the catalog is restructured |
| `FeaturedProducts` | `(home)/featured-products.tsx` | `minutes` | Featured selection can be rotated by the merchandising team |
| `PromoBanner` | `(home)/promo-banner.tsx` | `minutes` | Promotions have scheduled start / end times |
| `SearchResults` | `search/search-results.tsx` | `minutes` | Must reflect newly added products and stock changes |
| `getCachedCart` | `lib/cart.ts` | `minutes` + `cacheTag('cart')` | Short TTL for baseline freshness; on-demand invalidation via `updateTag('cart')` after every Server Action mutation |

Stock data (`getProductStock`) is intentionally **not cached** - it is fetched fresh on every request and streamed in via Suspense to show real-time availability.

### Cache Invalidation

Cart mutations (`addItemAction`, `updateItemAction`, `removeItemAction`) call `updateTag('cart')` after each write. This purges the `getCachedCart` entry across all edge nodes so the next read is guaranteed fresh.

### Component Caching

`cacheComponents: true` is enabled in `next.config.ts`. This allows Next.js to cache rendered Server Component trees alongside the data they consume.

## Server / Client Boundary

The default is Server Components - they fetch data and render HTML with zero client JS. Client components are opted-in with `'use client'` only where browser APIs or interactivity are required: forms, navigation transitions, theme toggling, search state management, and error boundaries.

## Data Flow

```
[External API]  ←  lib/api.ts (apiFetch)
                        ↓
              Server Components render
                        ↓
           Client Components (interactivity)
                        ↓
              Server Actions (mutations)
                        ↓
           updateTag('cart') → cache purge
```

### API Client

A single `apiFetch<T>()` wrapper in `lib/api.ts` handles all communication with the external REST API:

- Adds `x-vercel-protection-bypass` header for deployment protection
- Injects `x-cart-token` header for cart-scoped requests
- Parses typed error responses into `ApiError` instances

### Cart Token Lifecycle

The cart token is stored as a cookie (`cart-token`, `sameSite: lax`, `httpOnly: false`, 24h `maxAge`). `httpOnly: false` allows the cookie to be readable for client-side cart badge updates. The TTL matches the API-side cart expiry.

## Rendering Patterns

### Static Generation

`generateStaticParams` on the product detail page pre-renders all known product slugs at build time. New products are handled at runtime via the `use cache` layer.

### Suspense Streaming

Every page streams its shell immediately and resolves async sections independently:

| Page | Suspense boundaries |
| --- | --- |
| Home | `<PromoBanner>`, `<FeaturedProducts>` |
| Search | `<SearchShell>` (categories), `<SearchResults>` (products) |
| Product | `<StockSection>` (stock availability) |
| Header | `<CartCount>` (cart badge) |

Each boundary has a co-located skeleton component that renders during the loading phase.

### Loading Skeletons

`loading.tsx` files in `/cart` and `/products/[param]` provide instant loading states for full-page navigations via the App Router.

## Theming

Theming uses `next-themes` with `attribute="class"` and `defaultTheme="dark"`. System preference detection is disabled (`enableSystem={false}`).

Design tokens are defined as oklch CSS custom properties in two layers:

1. **Base tokens** - `@repo/ui/globals.css` - core palette shared across all packages
2. **App tokens** - `apps/web/globals.css` - imports the base and extends with app-specific overrides

The `ThemeToggle` component updates `meta[name="theme-color"]` dynamically to match the active theme.

## Navigation & Transitions

### Router Transitions

`RouterTransitionProvider` wraps `router.push` in React's `useTransition`. All navigations go through the `navigate()` function from this context, which keeps the current page interactive (no blocking) while the next route resolves.

### Server Action Transitions

The `useAction` hook wraps any Server Action call in `useTransition`, exposing `isPending` for optimistic UI states (e.g. "Adding..." on the cart button).

### Transition Pagination

`TransitionPagination` composes the server-rendered `Pagination` component with `useRouterTransition`, enabling non-blocking page changes in search results.

## UI Architecture

### shadcn/ui

Components are generated via the shadcn/ui CLI into `@repo/ui` - they are not a runtime dependency but source-owned copies. This gives full control over markup, styling, and behavior.

### Variant System

All components with visual variants use [CVA](https://cva.style/) (class-variance-authority). Variant types are inferred automatically via `VariantProps<typeof variants>`.

### Class Merging

The `cn()` utility chains `clsx` (conditional classes) → `tailwind-merge` (deduplication of conflicting Tailwind utilities). Every component uses `cn()` for its `className` prop.

## SEO & Social

- `metadataBase` is derived from `VERCEL_PROJECT_PRODUCTION_URL` (auto-set by Vercel) with a fallback
- Every page exports `metadata` with `title`, `description`, `openGraph`, and `twitter`
- Root layout defines `title.template` (`'%s | Vercel Swag Store'`) inherited by all pages
- Product pages use `generateMetadata` to produce dynamic OG tags with product images
- Cart and 404 pages set `robots: { index: false }` to prevent indexing
