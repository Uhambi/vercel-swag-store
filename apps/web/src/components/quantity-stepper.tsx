'use client';

import { Minus, Plus } from 'lucide-react';
import type { ReactNode } from 'react';

const focusStyles = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70';
const sizeConfig = {
  sm: { button: 'size-8', display: 'w-8', icon: 'size-3.5' },
  default: { button: 'size-9', display: 'w-10', icon: 'size-4' },
} as const;

interface QuantityStepperProps {
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  label?: ReactNode;
  onDecrement: () => void;
  onIncrement: () => void;
  quantity: number;
  size?: keyof typeof sizeConfig;
}

export function QuantityStepper({
  decrementDisabled = false,
  incrementDisabled = false,
  label,
  onDecrement,
  onIncrement,
  quantity,
  size = 'default',
}: QuantityStepperProps) {
  const cfg = sizeConfig[size];

  return (
    <div className="flex items-center gap-1">
      {label && <>{label}</>}
      <button
        aria-label="Decrease quantity"
        className={`flex ${cfg.button} cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40 ${focusStyles}`}
        disabled={decrementDisabled}
        onClick={onDecrement}
        type="button"
      >
        <Minus className={cfg.icon} />
      </button>
      <span
        className={`flex ${cfg.display} items-center justify-center font-medium text-foreground text-sm tabular-nums`}
      >
        {quantity}
      </span>
      <button
        aria-label="Increase quantity"
        className={`flex ${cfg.button} cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40 ${focusStyles}`}
        disabled={incrementDisabled}
        onClick={onIncrement}
        type="button"
      >
        <Plus className={cfg.icon} />
      </button>
    </div>
  );
}
