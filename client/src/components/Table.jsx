import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteBookMutation, useGetBooksQuery } from '../redux/bookApi';
import {
  setBookModalMode,
  setSelectedBookId,
  toggleBookModal,
} from '../redux/bookSlice';
import Skeleton from './Skeleton';
import { toast } from 'sonner';

const Table = ({ isLoading }) => {
  const dispatch = useDispatch();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const { books } = useSelector((state) => state.books);

  // handle the edit book action
  const handleEdit = (book) => {
    dispatch(setBookModalMode('edit'));
    dispatch(setSelectedBookId(book.id));
    dispatch(toggleBookModal());
  };

  // delete book handler
  const handleDelete = async (book) => {
    try {
      await deleteBook(book.id).unwrap();
    } catch (error) {
      toast.error('Failed to delete book');
    }
  };

  // loading skeleton for the table
  const LoadingSkeleton = () =>
    Array(10)
      .fill(0)
      .map((_, index) => (
        <tr key={index} className="border-t">
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-48" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-24 rounded-full" />
          </td>
          <td className="px-6 py-4">
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
            </div>
          </td>
        </tr>
      ));

  return (
    <div className="overflow-x-auto rounded-md sm:rounded-lg shadow">
      <table className="min-w-full bg-white text-sm sm:text-base">
        
        {/* shows the headings for the books */}
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Genre
            </th>
            <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>


        {/* shows the data for the books */}
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <LoadingSkeleton />
          ) : books.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No books found
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                  {book.genre}
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                  {book.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      book.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
