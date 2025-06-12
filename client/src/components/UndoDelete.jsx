import { useEffect, useState } from 'react';
import { useUndoDeleteMutation } from '../redux/bookApi';
import { useDispatch, useSelector } from 'react-redux';
import { setDeletedBook, setShowUndoDelete } from '../redux/bookSlice';
import { MdUndo } from 'react-icons/md';

const UndoDelete = () => {
  const dispatch = useDispatch();

  const { deletedBook, showUndoDelete } = useSelector((state) => state.books);
  const [undoDeletedBook] = useUndoDeleteMutation();
  const [countdown, setCountdown] = useState(5);

  // to show the undo delete notification till 5 seconds
  useEffect(() => {
    if (showUndoDelete) {
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // automatically hide and permanent dekete the book after 5 seconds
      const timer = setTimeout(() => {
        dispatch(setShowUndoDelete(false));
        dispatch(setDeletedBook(null));
        toast.success('Book deleted successfully');
        clearInterval(interval);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [showUndoDelete, dispatch]);

  // handle undo delete action
  const handleUndoDelete = async () => {
    if (deletedBook) {
      try {
        await undoDeletedBook(deletedBook).unwrap();
        dispatch(setDeletedBook(null));
        dispatch(setShowUndoDelete(false));
      } catch (error) {
        console.error('Failed to undo delete:', error);
      }
    }
  };

  if (!showUndoDelete) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-up">
      <p className="flex items-center gap-2">
        Deleting book...
        <span className="text-blue-400 font-medium">{countdown}s</span>
      </p>
      <button
        onClick={handleUndoDelete}
        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <span className="font-medium">Undo</span>
        <MdUndo size={20} />
      </button>
    </div>
  );
};

export default UndoDelete;
