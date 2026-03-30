# @repo/ui - Shared Design System

Shared React component library for the Vercel Swag Store monorepo. Built on [shadcn/ui](https://ui.shadcn.com/) (New York style) with [Radix UI](https://www.radix-ui.com/) primitives, [CVA](https://cva.style/) variants, and [Tailwind CSS 4](https://tailwindcss.com/) design tokens.

## Components

| Component | Variants | Description |
| --- | --- | --- |
| `Button` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` × `default`, `sm`, `lg`, `icon` | CTA button with `asChild` slot support via Radix `Slot` |
| `Badge` | `default`, `secondary`, `outline`, `success`, `warning`, `danger` | Inline status / category label |
| `Skeleton` | - | Pulse placeholder for loading states |

## Utilities

| Export | Description |
| --- | --- |
| `cn(...inputs)` | Merge class names with `clsx` + `tailwind-merge` |

## Design Tokens

`src/styles/globals.css` defines the full oklch color palette (light + dark) consumed by all components:

- **Surfaces** - `--background`, `--card`, `--popover`
- **Typography** - `--foreground`, `--muted-foreground`
- **Actions** - `--primary`, `--secondary`, `--destructive`
- **Borders** - `--border`, `--input`, `--ring`
- **Charts** - `--chart-1` … `--chart-5`
- **Sidebar** - `--sidebar`, `--sidebar-primary`, `--sidebar-accent`
- **Radius** - `--radius` (`0.625rem`)

Dark mode is applied via `@media (prefers-color-scheme: dark)` in the base tokens; the web app overrides with a class-based `.dark` variant.

## Package Exports

```jsonc
{
  "./globals.css":    "./src/styles/globals.css",
  "./lib/*":          "./src/lib/*.ts",
  "./components/*":   "./src/components/*.tsx",
  "./hooks/*":        "./src/hooks/*.ts"
}
```

Usage in consuming apps:

```tsx
import { Button } from '@repo/ui/components/button';
import { Badge } from '@repo/ui/components/badge';
import { Skeleton } from '@repo/ui/components/skeleton';
import { cn } from '@repo/ui/lib/utils';
import '@repo/ui/globals.css';
```

## Source Layout

```
src/
├── components/
│   ├── button.tsx       # Button + buttonVariants (CVA)
│   ├── badge.tsx        # Badge + badgeVariants (CVA)
│   └── skeleton.tsx     # Skeleton (pulse animation)
├── lib/
│   └── utils.ts         # cn() - clsx + tailwind-merge
└── styles/
    └── globals.css      # oklch design tokens (light + dark)
```

## Adding Components

shadcn/ui CLI is pre-configured via `components.json` (New York style, RSC-compatible):

```bash
pnpm --filter @repo/ui dlx shadcn@latest add <component>
```

Or use the Turborepo generator:

```bash
pnpm --filter @repo/ui generate:component
```

## Dependencies

| Package | Purpose |
| --- | --- |
| `class-variance-authority` | Component variant definitions |
| `clsx` | Conditional class strings |
| `tailwind-merge` | Merge conflicting Tailwind classes |
| `@radix-ui/react-slot` | `asChild` polymorphic slot pattern |
| `lucide-react` | Icon library |
| `tw-animate-css` | Tailwind animation utilities |

## Type-Check

```bash
pnpm --filter @repo/ui check-types
```
