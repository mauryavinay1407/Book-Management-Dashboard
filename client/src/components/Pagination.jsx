// Pagination component to handle page navigation
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // function to handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center mt-6 gap-2">
      
       {/* button to go to previous page */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Previous
      </button>
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {/* button to go to next page */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
