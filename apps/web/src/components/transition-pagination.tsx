'use client';

import { Pagination, type PaginationProps } from '@/components/pagination';
import { useRouterTransition } from '@/components/router-transition-provider';

export function TransitionPagination(
  props: Omit<PaginationProps, 'onNavigate'>,
) {
  const { navigate } = useRouterTransition();
  return <Pagination {...props} onNavigate={navigate} />;
}
