import { Badge } from '@repo/ui/components/badge';
import type { StockInfo } from '@/lib/types';

interface StockIndicatorProps {
  stock: StockInfo;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  if (!stock.inStock) {
    return (
      <Badge className="w-fit" variant="danger">
        Out of Stock
      </Badge>
    );
  }

  if (stock.lowStock) {
    return (
      <Badge className="w-fit" variant="warning">
        Low Stock ({stock.stock})
      </Badge>
    );
  }

  return (
    <Badge className="w-fit" variant="success">
      In Stock ({stock.stock})
    </Badge>
  );
}
