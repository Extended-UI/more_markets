import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage = 1,
  setCurrentPage,
}) => {
  // Calculate the indices for the displayed items on the current page
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-[14px] text-[#888888]">
        Showing {startIndex} to {endIndex} of {totalItems} entries
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={goToPreviousPage}
          className={`w-14 h-14 border ${
            currentPage === 1 ? "border-gray-800" : "border-gray-500"
          } rounded-lg opacity-100 flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-14 h-14 border rounded-lg bg-[#212121] ${
              currentPage === index + 1 ? "border-gray-300" : "border-gray-800"
            } flex items-center justify-center`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`w-14 h-14 border ${
            currentPage === totalPages ? "border-gray-800" : "border-gray-500"
          } rounded-lg opacity-100 flex items-center justify-center`}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
