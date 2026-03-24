'use client';

import { Button } from '@repo/ui/components/button';
import { Minus, Plus } from 'lucide-react';
import { useState, useTransition } from 'react';
import { addItemAction } from '@/actions/cart';

interface AddToCartFormProps {
  inStock: boolean;
  productId: string;
  stock: number;
}

export function AddToCartForm({
  productId,
  inStock,
  stock,
}: AddToCartFormProps) {
  const maxQty = Math.min(stock, 10);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(maxQty, q + 1));
  }

  function handleSubmit() {
    startTransition(async () => {
      await addItemAction(productId, quantity);
      setQuantity(1);
    });
  }

  function getButtonLabel() {
    if (isPending) {
      return 'Adding…';
    }
    return inStock ? 'Add to Cart' : 'Out of Stock';
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Stepper */}
      <div className="flex items-center gap-1">
        <span className="mr-2 text-muted-foreground text-sm">Qty</span>
        <button
          aria-label="Decrease quantity"
          className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          disabled={!inStock || quantity <= 1}
          onClick={decrement}
          type="button"
        >
          <Minus className="size-4" />
        </button>
        <span className="flex w-10 items-center justify-center font-medium text-foreground text-sm tabular-nums">
          {quantity}
        </span>
        <button
          aria-label="Increase quantity"
          className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          disabled={!inStock || quantity >= maxQty}
          onClick={increment}
          type="button"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <Button
        className="w-full cursor-pointer"
        disabled={!inStock || isPending}
        onClick={handleSubmit}
        size="lg"
      >
        {getButtonLabel()}
      </Button>
    </div>
  );
}
