'use client';

import { useNavigationTransition } from '@/components/navigation-context';
import { Pagination, type PaginationProps } from '@/components/pagination';

export function TransitionPagination(
  props: Omit<PaginationProps, 'onNavigate'>,
) {
  const nav = useNavigationTransition();
  return <Pagination {...props} onNavigate={nav?.navigate} />;
}
