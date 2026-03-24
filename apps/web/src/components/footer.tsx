const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground text-sm">
          &copy; {CURRENT_YEAR} Vercel, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
