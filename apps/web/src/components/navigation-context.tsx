'use client';

import { createContext, useContext } from 'react';

interface NavigationTransitionContextValue {
  isPending: boolean;
  navigate: (url: string, opts?: { scroll?: boolean }) => void;
}

const NavigationTransitionContext =
  createContext<NavigationTransitionContextValue | null>(null);

export const NavigationTransitionProvider = NavigationTransitionContext.Provider;

export function useNavigationTransition() {
  return useContext(NavigationTransitionContext);
}
