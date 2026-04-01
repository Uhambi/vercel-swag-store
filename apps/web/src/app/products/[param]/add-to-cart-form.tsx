'use client';

import { Button } from '@repo/ui/components/button';
import { useState } from 'react';
import { addItemAction } from '@/actions/cart';
import { QuantityStepper } from '@/components/quantity-stepper';
import { useCartAction } from '@/hooks/use-cart-action';

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
  const [quantity, setQuantity] = useState(1);
  const [reservedQty, setReservedQty] = useState(0);
  const { isPending, execute } = useCartAction();

  const effectiveStock = Math.max(0, stock - reservedQty);
  const effectiveInStock = inStock && effectiveStock > 0;

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(effectiveStock, q + 1));
  }

  function handleSubmit() {
    execute(async () => {
      const cart = await addItemAction(productId, quantity);
      if (cart) {
        setReservedQty((prev) => prev + quantity);
        setQuantity(1);
      }
      return cart;
    });
  }

  function getButtonLabel() {
    if (isPending) {
      return 'Adding…';
    }
    if (!effectiveInStock) {
      return 'Out of Stock';
    }
    return 'Add to Cart';
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity Stepper */}
      <QuantityStepper
        decrementDisabled={!effectiveInStock || quantity <= 1}
        incrementDisabled={!effectiveInStock || quantity >= effectiveStock}
        label={<span className="mr-2 text-muted-foreground text-sm">Qty</span>}
        onDecrement={decrement}
        onIncrement={increment}
        quantity={quantity}
      />

      {/* Add to Cart Button */}
      <Button
        className="w-full cursor-pointer"
        disabled={!effectiveInStock || isPending}
        onClick={handleSubmit}
        size="lg"
      >
        {getButtonLabel()}
      </Button>
    </div>
  );
}
