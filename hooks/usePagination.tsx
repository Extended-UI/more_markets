import { useState } from "react";

interface UsePaginationReturn {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

function usePagination(
  totalItems: number,
  itemsPerPage: number = 5
): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((current) => (current < totalPages ? current + 1 : current));
  };

  const goToPreviousPage = () => {
    setCurrentPage((current) => (current > 1 ? current - 1 : current));
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
}

export default usePagination;
