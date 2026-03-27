'use client';

import { Button } from '@repo/ui/components/button';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { removeItemAction, updateItemAction } from '@/actions/cart';
import { QuantityStepper } from '@/components/quantity-stepper';
import { formatPrice } from '@/lib/api';
import type { CartItem as CartItemType } from '@/lib/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity, lineTotal, productId } = item;
  const image = product.images[0];
  const [isPending, startTransition] = useTransition();

  function handleDecrement() {
    if (quantity <= 1) {
      return;
    }
    startTransition(async () => {
      await updateItemAction(productId, quantity - 1);
    });
  }

  function handleIncrement() {
    startTransition(async () => {
      await updateItemAction(productId, quantity + 1);
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await removeItemAction(productId);
    });
  }

  return (
    <div
      className={`flex gap-4 rounded-lg border border-border bg-card p-4 transition-opacity ${isPending ? 'opacity-50' : ''}`}
    >
      {/* Product Image */}
      <Link
        className="relative size-20 shrink-0 overflow-hidden rounded-md bg-secondary sm:size-24"
        href={`/products/${product.slug}`}
      >
        {image ? (
          <Image
            alt={product.name}
            className="object-cover"
            fill
            loading="eager"
            sizes="96px"
            src={image}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-muted-foreground text-xs">No image</span>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        {/* Top row: name + unit price */}
        <div className="flex items-start justify-between gap-2">
          <Link
            className="line-clamp-2 font-medium text-foreground text-sm transition-colors hover:text-primary"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
          <span className="shrink-0 font-semibold text-foreground text-sm tabular-nums">
            {formatPrice(lineTotal)}
          </span>
        </div>

        {/* Bottom row: quantity controls + remove */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {quantity > 1 && (
              <span className="mr-2 text-muted-foreground text-xs tabular-nums">
                {formatPrice(product.price)} each
              </span>
            )}
            <QuantityStepper
              decrementDisabled={isPending || quantity <= 1}
              incrementDisabled={isPending}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              quantity={quantity}
              size="sm"
            />
          </div>

          <Button
            aria-label={`Remove ${product.name} from cart`}
            className="cursor-pointer"
            disabled={isPending}
            onClick={handleRemove}
            size="sm"
            variant="ghost"
          >
            <Trash2 className="size-4" />
            <span className="sr-only sm:not-sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
