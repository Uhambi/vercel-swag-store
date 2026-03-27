'use client';

import { Button } from '@repo/ui/components/button';
import { useState, useTransition } from 'react';
import { addItemAction } from '@/actions/cart';
import { QuantityStepper } from '@/components/quantity-stepper';

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
      <QuantityStepper
        decrementDisabled={!inStock || quantity <= 1}
        incrementDisabled={!inStock || quantity >= maxQty}
        label={<span className="mr-2 text-muted-foreground text-sm">Qty</span>}
        onDecrement={decrement}
        onIncrement={increment}
        quantity={quantity}
      />

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
