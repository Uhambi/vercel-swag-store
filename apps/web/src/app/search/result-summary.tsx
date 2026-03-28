export function ResultSummary({
  startItem,
  endItem,
  total,
  q,
  category,
}: {
  startItem: number;
  endItem: number;
  total: number;
  q: string;
  category: string;
}) {
  const isSearching = Boolean(q) || Boolean(category);

  if (!isSearching) {
    return (
      <p className="mb-6 text-muted-foreground text-sm">
        Showing {startItem}–{endItem} of {total} products
      </p>
    );
  }

  return (
    <p className="mb-6 text-muted-foreground text-sm">
      Showing {startItem}–{endItem} of {total} result
      {total === 1 ? '' : 's'}
      {q ? <> for &ldquo;{q}&rdquo;</> : null}
      {category ? ` in ${category}` : ''}
    </p>
  );
}
