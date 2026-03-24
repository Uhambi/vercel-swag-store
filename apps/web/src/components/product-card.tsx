import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/api';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/60 hover:shadow-black/30 hover:shadow-xl"
      href={`/products/${product.slug}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {image ? (
          <Image
            alt={product.name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={image}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="line-clamp-2 font-medium text-foreground text-sm transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="font-semibold text-foreground text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
