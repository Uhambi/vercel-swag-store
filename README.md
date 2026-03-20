# Vercel Swag Store

Next.js 16 storefront demonstrating modern React patterns, caching strategies, and server-side architecture on Vercel.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run both apps in dev mode
pnpm dev

# Type check all packages
pnpm check-types

# Build all packages
pnpm build

# Format and lint
pnpm format
pnpm lint
```

## Project Structure

```
nextjs-foundations-starter/
├── apps/
│   └── web/                    # Marketing site (localhost:3000)
├── packages/
│   └── ui/                     # Shared UI components
├── turbo.json                  # Turborepo configuration
├── biome.jsonc                 # Biome linting/formatting
└── package.json
```

## Apps

- **web** (`apps/web`) - Marketing site running on port 3000

## Packages

- **@repo/ui** - Shared React components

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Linting and formatting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT
