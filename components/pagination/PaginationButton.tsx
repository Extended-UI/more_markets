import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems }) => {
  const { currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(totalItems);
  
  function usePagination(totalItems: number) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(totalItems / 5);
  
    function goToNextPage() {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }
  
    function goToPreviousPage() {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    }
  
    return { currentPage, totalPages, goToNextPage, goToPreviousPage };
  }
  return (
    <div className="flex items-center justify-center space-x-2">
      <button onClick={goToPreviousPage} className="p-2">
        <FontAwesomeIcon icon="caret-left" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index} className={`p-2 ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-transparent'}`}>
          {index + 1}
        </button>
      ))}
      <button onClick={goToNextPage} className="p-2">
        <FontAwesomeIcon icon="caret-right" />
      </button>
    </div>
  );
};

export default Pagination;
