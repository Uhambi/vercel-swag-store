'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useTransition,
} from 'react';

interface RouterTransitionContextValue {
  isPending: boolean;
  navigate: (url: string, opts?: { scroll?: boolean }) => void;
}

const RouterTransitionContext = createContext<RouterTransitionContextValue>({
  isPending: false,
  navigate: () => undefined,
});

export function RouterTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (url: string, opts?: { scroll?: boolean }) => {
      startTransition(() => {
        router.push(url, opts);
      });
    },
    [router],
  );

  return (
    <RouterTransitionContext.Provider value={{ isPending, navigate }}>
      {children}
    </RouterTransitionContext.Provider>
  );
}

export function useRouterTransition() {
  return useContext(RouterTransitionContext);
}
