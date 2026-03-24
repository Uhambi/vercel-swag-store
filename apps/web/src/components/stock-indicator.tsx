import { Badge } from '@repo/ui/components/badge';
import { getProductStock } from '@/lib/api';

export async function StockIndicator({ slug }: { slug: string }) {
  const { data: stock } = await getProductStock(slug);

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
