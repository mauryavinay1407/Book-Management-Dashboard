import { Link } from 'react-router-dom';
import { FaBook, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setBookModalMode, toggleBookModal } from '../redux/bookSlice';

function Navbar() {
  const dispatch = useDispatch();

  // handle opening the add book modal
  function handleOpenAddBookModal() {
    dispatch(setBookModalMode('add'));
    dispatch(toggleBookModal());
  }

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="text-blue-600 text-2xl" />
            <span className="font-bold text-xl">Book Dashboard</span>
          </Link>
           {/* button to add a new book */}
          <button
            onClick={handleOpenAddBookModal}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <FaPlus />
            <span>Add Book</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
