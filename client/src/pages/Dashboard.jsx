import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGetBooksQuery } from '../redux/bookApi';
import { useSelector } from 'react-redux';
import BookFormModal from '../components/modals/BookFormModal';
import UndoDelete from '../components/UndoDelete';
import Table from '../components/Table';
import { genreOptions } from '../../data';
import Pagination from '../components/Pagination';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGenre, setCurrentGenre] = useState('all');
  const [currentStatus, setCurrentStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { isBookModalOpen, showUndoDelete } = useSelector((state) => state.books);

  const { data, isLoading } = useGetBooksQuery(
    {
      search: searchQuery.trim(),
      genre: currentGenre === 'all' ? '' : currentGenre,
      status: currentStatus === 'all' ? '' : currentStatus,
      _page: currentPage,
      _limit: 10, 
    },
    {
      // to refetch the book data
      refetchOnMountOrArgChange: true,
    }
  );

  const books = data?.books || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 10); // Assuming _limit is 10

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-6 mt-12">
      {/* Search by title or author */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* filter by genre and status */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <select
            className="border rounded-md px-4 py-2"
            value={currentGenre}
            onChange={(e) => setCurrentGenre(e.target.value)}
          >
            <option value="all">All Genres</option>
            {genreOptions.map((genre) => {
              return (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              );
            })}
          </select>

          <select
            className="border rounded-md px-4 py-2"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <Table isLoading={isLoading}/>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* to open add/edit book modal */}
      {isBookModalOpen && <BookFormModal />}

      {/* Undo delete popup */}
      {showUndoDelete && <UndoDelete />}
    </div>
  );
}

export default Dashboard;
