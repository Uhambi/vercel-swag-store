'use client';

import { useCallback, useTransition } from 'react';

export function useAction() {
  const [isPending, startTransition] = useTransition();

  const execute = useCallback((action: () => Promise<void>) => {
    startTransition(action);
  }, []);

  return { isPending, execute };
}
