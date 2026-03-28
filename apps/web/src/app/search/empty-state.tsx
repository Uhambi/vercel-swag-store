export function SearchEmptyState({
  q,
  category,
}: {
  q: string;
  category: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
        <span aria-label="No results" className="text-3xl" role="img">
          🔍
        </span>
      </div>
      <div>
        <h2 className="font-semibold text-foreground text-lg">
          No products found
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {q ? (
            <>
              No results for &ldquo;{q}&rdquo;
              {category ? ` in ${category}` : ''}. Try a different search term.
            </>
          ) : (
            <>No products in this category.</>
          )}
        </p>
      </div>
    </div>
  );
}
