'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

const DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 3;

interface UseSearchQueryOptions {
  currentCategory: string;
  currentQuery: string;
  onSearch: (q: string, category: string) => void;
}

export function useSearchQuery({
  currentQuery,
  currentCategory,
  onSearch,
}: UseSearchQueryOptions) {
  const [query, setQuery] = useState(currentQuery);

  const isUserEditing = useRef(false);
  const searchInFlight = useRef(false);

  const { debounced: scheduleSearch, cancel: cancelSearch } = useDebounce(
    (value: string, category: string) => {
      isUserEditing.current = false;
      searchInFlight.current = true;
      onSearch(value, category);
    },
    DEBOUNCE_MS,
  );

  useEffect(() => {
    searchInFlight.current = false;

    if (!isUserEditing.current) {
      setQuery(currentQuery);
    } else if (currentQuery === '') {
      isUserEditing.current = false;
      setQuery('');
    }
  }, [currentQuery]);

  function onChange(value: string) {
    setQuery(value);

    if (value.trim().length >= MIN_SEARCH_LENGTH) {
      isUserEditing.current = true;
      scheduleSearch(value, currentCategory);
    } else if (value.trim().length === 0) {
      cancelSearch();
      const shouldClear = searchInFlight.current || currentQuery !== '';
      searchInFlight.current = false;
      if (shouldClear) {
        isUserEditing.current = true;
        onSearch('', currentCategory);
      } else {
        isUserEditing.current = false;
      }
    } else {
      cancelSearch();
      isUserEditing.current = true;
    }
  }

  const commit = useCallback(
    (displayValue?: string) => {
      cancelSearch();
      searchInFlight.current = false;
      isUserEditing.current = false;
      if (displayValue !== undefined) {
        setQuery(displayValue);
      }
    },
    [cancelSearch],
  );

  return { query, onChange, commit };
}
