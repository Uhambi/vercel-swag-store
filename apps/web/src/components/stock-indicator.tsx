import { getProductStock } from '@/lib/api';
import { Badge } from '@repo/ui/components/badge';

export async function StockIndicator({ slug }: { slug: string }) {
  const { data: stock } = await getProductStock(slug);

  if (!stock.inStock) {
    return <Badge variant="danger" className="w-fit">Out of Stock</Badge>;
  }

  if (stock.lowStock) {
    return (
      <Badge variant="warning" className="w-fit">
        Low Stock ({stock.stock})
      </Badge>
    );
  }

  return (
    <Badge variant="success" className="w-fit">
      In Stock ({stock.stock})
    </Badge>
  );
}

