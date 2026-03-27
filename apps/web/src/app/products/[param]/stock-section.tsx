import { Skeleton } from '@repo/ui/components/skeleton';
import type { ApiResponse, StockInfo } from '@/lib/types';
import { AddToCartForm } from './add-to-cart-form';
import { StockIndicator } from './stock-indicator';

export async function StockSection({
  stockPromise,
}: {
  stockPromise: Promise<ApiResponse<StockInfo>>;
}) {
  let stock: StockInfo;
  try {
    const { data } = await stockPromise;
    stock = data;
  } catch {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <StockIndicator stock={stock} />
      <AddToCartForm
        inStock={stock.inStock}
        productId={stock.productId}
        stock={stock.stock}
      />
    </div>
  );
}

export function StockSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-28" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
