import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export const usePagination = (initialItems = [], itemsPerPage = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const [allItems, setAllItems] = useState(initialItems);

  const totalPages = useMemo(() => {
    return Math.ceil(allItems.length / itemsPerPage);
  }, [allItems, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allItems.slice(startIndex, startIndex + itemsPerPage);
  }, [allItems, currentPage, itemsPerPage]);

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage });
  };

  return {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
    setAllItems,
  };
};
