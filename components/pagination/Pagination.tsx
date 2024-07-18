import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import usePagination from '@/hooks/usePagination';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage = 5 }) => {
  const { setCurrentPage, currentPage, totalPages, goToNextPage, goToPreviousPage } = usePagination(totalItems, itemsPerPage);

  // Calculate the indices for the displayed items on the current page
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='w-full flex justify-between my-4 mr-4'>
      <div className='text-sm text-[#888888]'>
        Showing {startIndex} to {endIndex} of {totalItems} entries
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button onClick={goToPreviousPage} className={`w-10 h-10 border ${currentPage === 1 ? 'border-gray-800' : 'border-gray-500'} rounded-lg opacity-100 flex items-center justify-center`}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 border rounded-lg bg-[#212121] ${currentPage === index + 1 ? 'border-gray-300' : 'border-gray-800'} flex items-center justify-center`}>
            {index + 1}
          </button>
        ))}
        <button onClick={goToNextPage} className={`w-10 h-10 border ${currentPage === totalPages ? 'border-gray-800' : 'border-gray-500'} rounded-lg opacity-100 flex items-center justify-center`}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
