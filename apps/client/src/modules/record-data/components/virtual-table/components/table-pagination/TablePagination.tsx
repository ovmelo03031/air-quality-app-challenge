import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import { getPaginationItemClasses } from '@/core/lib/utils';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

function TablePagination({ currentPage, totalPages }: TablePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (pageNumber: number) => () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', pageNumber.toString());
    setSearchParams(newParams);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return '/';

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className={getPaginationItemClasses(currentPage === i)}
            onClick={handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  const disabledNext = !totalPages || currentPage === totalPages;
  const disabledPrevious = !totalPages || currentPage === 1;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={getPaginationItemClasses(disabledPrevious)}
            onClick={handlePageChange(Math.max(1, currentPage - 1))}
            aria-disabled={disabledPrevious}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            className={getPaginationItemClasses(disabledNext)}
            onClick={handlePageChange(Math.min(totalPages, currentPage + 1))}
            aria-disabled={disabledNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TablePagination;
