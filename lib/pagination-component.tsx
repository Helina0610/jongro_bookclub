"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({ page, totalPages, onPageChange }: AppPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious onClick={() => page > 1 && onPageChange(page - 1)} />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink isActive={page === pageNumber} onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext onClick={() => page < totalPages && onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
