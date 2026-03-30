# @repo/web - Vercel Swag Store

The main Next.js 16 storefront application. Renders the product catalogue, search, and cart - powered by React 19 Server Components with Suspense streaming.

## Pages

| Route | Description                                                        |
| --- |--------------------------------------------------------------------|
| `/` | Home - hero section, promo banner, featured products grid          |
| `/search` | Browse & search - full-text search, category filters, pagination   |
| `/products/[param]` | Product detail - images, description, stock indicator, add-to-cart |
| `/cart` | Shopping cart - line items, quantity controls, order summary       |

## Key Patterns

- **Server Components** - every page is a Server Component by default; data is fetched on the server with zero client JS overhead.
- **Suspense streaming** - each async section (`<PromoBanner>`, `<FeaturedProducts>`, `<StockSection>`) is wrapped in `<Suspense>` so the shell streams immediately while data loads.
- **`use cache`** - product & cart data use the `use cache` directive with `cacheLife()` for ISR-style freshness.
- **Server Actions** - cart mutations (`addItemAction`, `updateItemAction`, `removeItemAction`) run server-side and call `updateTag('cart')` to revalidate.
- **`useTransition` navigations** - `RouterTransitionProvider` wraps `router.push` in `startTransition` for non-blocking route changes with a pending UI.
- **Dark / Light theming** - `next-themes` + CSS custom properties (oklch); toggle in the header.
- **Open Graph & Twitter Cards** - every page exports rich `openGraph` / `twitter` metadata; `metadataBase` is set from `VERCEL_PROJECT_PRODUCTION_URL`.

## Source Layout

```
src/
├── actions/
│   └── cart.ts                    # Server Actions - add / update / remove cart items
├── app/
│   ├── layout.tsx                 # Root layout - Geist font, theme, header/footer, OG metadata
│   ├── globals.css                # Tailwind 4 + design tokens (oklch)
│   ├── error.tsx                  # Error boundary
│   ├── global-error.tsx           # Root error boundary
│   ├── not-found.tsx              # 404 page
│   ├── (home)/
│   │   ├── page.tsx               # Home page
│   │   ├── hero.tsx               # Hero banner ("Ship Fast. Look Good.")
│   │   ├── promo-banner.tsx       # Active promotion strip
│   │   ├── featured-products.tsx  # Featured products grid
│   │   └── skeletons.tsx          # Loading skeletons for home sections
│   ├── search/
│   │   ├── page.tsx               # Search page - query, category, pagination params
│   │   ├── search-form.tsx        # Debounced search input + category pills
│   │   ├── search-results.tsx     # Product grid with pagination
│   │   ├── search-shell.tsx       # Shared shell (server) with category data
│   │   ├── search-shell-client.tsx # Client shell - URL form state sync
│   │   ├── result-summary.tsx     # "N results for …" summary line
│   │   ├── empty-state.tsx        # No-results illustration
│   │   ├── skeletons.tsx          # Loading skeletons for search
│   │   └── use-search-query.ts    # Hook - derive search params from URL
│   ├── products/[param]/
│   │   ├── page.tsx               # Product detail - generateStaticParams + generateMetadata
│   │   ├── product-content.tsx    # Image gallery + description
│   │   ├── add-to-cart-form.tsx   # Add-to-cart form with quantity
│   │   ├── stock-section.tsx      # Suspense wrapper for stock indicator
│   │   ├── stock-indicator.tsx    # Real-time stock badge (in-stock / low / out)
│   │   └── loading.tsx            # Instant loading skeleton
│   └── cart/
│       ├── page.tsx               # Cart page - items list + order summary
│       ├── cart-item.tsx          # Single cart line (quantity stepper, remove)
│       ├── empty-cart.tsx         # Empty-state illustration
│       └── loading.tsx            # Instant loading skeleton
├── components/                    # Shared presentational components
│   ├── header.tsx                 # Navigation bar + cart badge + theme toggle
│   ├── footer.tsx                 # Site footer
│   ├── nav-link.tsx               # Active-aware navigation link
│   ├── mobile-menu.tsx            # Slide-out mobile navigation
│   ├── product-card.tsx           # Reusable product card (home & search)
│   ├── quantity-stepper.tsx       # +/− stepper used in cart
│   ├── pagination.tsx             # Page navigation (server)
│   ├── transition-pagination.tsx  # Page navigation with useTransition
│   ├── router-transition-provider.tsx  # useTransition context for navigations
│   ├── theme-provider.tsx         # next-themes provider wrapper
│   └── theme-toggle.tsx           # Light / dark mode toggle button
├── hooks/
│   ├── use-action.ts              # useTransition wrapper for Server Actions
│   ├── use-debounce.ts            # Debounced value hook (search input)
│   └── use-click-outside.ts      # Click-outside detector (mobile menu)
└── lib/
    ├── api.ts                     # REST client - products, categories, promotions, cart
    ├── cart.ts                    # Cart token management (cookies)
    ├── format.ts                  # formatPrice helper
    └── types.ts                   # Shared TypeScript interfaces
```

## Getting Started

```bash
# From the monorepo root
pnpm dev            # starts all workspaces; web → http://localhost:3000

# Or run only this app
pnpm --filter @repo/web dev
```

## Environment Variables

| Variable | Required | Default |
| --- | --- | --- |
| `API_URL` | No | `https://vercel-swag-store-api.vercel.app/api` |
| `API_BYPASS_TOKEN` | No | — |
| `VERCEL_PROJECT_PRODUCTION_URL` | No | Auto-set on Vercel deploys |

## Build

```bash
pnpm --filter @repo/web build   # outputs to apps/web/.next
pnpm --filter @repo/web start   # serve the production build
```
