import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';

type TablePaginationProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
  paginationRange: any[];
  currentPage: number;
};

export function TablePagination({
  currentPage,
  hasPrevious,
  hasNext,
  onPageChange,
  paginationRange,
}: TablePaginationProps) {
  const onClickPrevious = () => {
    if (hasPrevious) onPageChange(currentPage - 1);
  };
  const onClickNext = () => {
    if (hasNext) onPageChange(currentPage + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onClickPrevious}
            aria-disabled={!hasPrevious}
            className='aria-disabled:bg-primary/20 px-2.5! text-primary hover:text-white hover:bg-primary hover:aria-disabled:text-primary aria-disabled:cursor-default'
          />
        </PaginationItem>

        {paginationRange.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`e-${index}`}>
              <span className='px-3'>…</span>
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink isActive={item === currentPage} onClick={() => onPageChange(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={onClickNext}
            aria-disabled={!hasNext}
            className='aria-disabled:bg-primary/20 px-2.5! text-primary hover:text-white hover:bg-primary hover:aria-disabled:text-primary aria-disabled:cursor-default'
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
