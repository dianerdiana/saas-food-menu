import { useMemo } from 'react';

type PaginationItem = number | 'ellipsis';

type UsePaginationParams = {
  currentPage: number; // 1-based
  totalPages: number;
  siblingCount?: number; // default 2
};

export const usePagination = ({ currentPage, totalPages, siblingCount = 2 }: UsePaginationParams) => {
  const paginationRange = useMemo<PaginationItem[]>(() => {
    if (totalPages <= 0) return [];

    const totalNumbers = siblingCount * 2 + 5;

    // Jika total halaman sedikit, tampilkan semua
    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    // Case 1: Ellipsis hanya di kanan
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis', totalPages];
    }

    // Case 2: Ellipsis hanya di kiri
    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1,
      );
      return [1, 'ellipsis', ...rightRange];
    }

    // Case 3: Ellipsis di kiri & kanan
    const middleRange = Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i);

    return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
  }, [currentPage, totalPages, siblingCount]);

  return {
    paginationRange,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
};
