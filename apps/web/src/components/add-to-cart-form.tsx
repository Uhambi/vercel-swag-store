'use client';

import { useTransition, useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Minus, Plus } from 'lucide-react';
import { addItemAction } from '@/actions/cart';

interface AddToCartFormProps {
  productId: string;
  inStock: boolean;
  stock: number;
}

export function AddToCartForm({ productId, inStock, stock }: AddToCartFormProps) {
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

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Stepper */}
      <div className="flex items-center gap-1">
        <span className="mr-2 text-sm text-muted-foreground">Qty</span>
        <button
          type="button"
          onClick={decrement}
          disabled={!inStock || quantity <= 1}
          className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus className="size-4" />
        </button>
        <span className="flex w-10 items-center justify-center text-sm font-medium tabular-nums text-foreground">
          {quantity}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={!inStock || quantity >= maxQty}
          className="flex size-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        disabled={!inStock || isPending}
        onClick={handleSubmit}
        className="w-full cursor-pointer"
      >
        {isPending ? 'Adding…' : inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  );
}

