import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookModal, setSelectedBookId, setBookModalMode} from '../../redux/bookSlice';
import { useAddBookMutation, useUpdateBookMutation } from '../../redux/bookApi';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { genreOptions } from '../../../data';

const BookFormModal = () => {
  const dispatch = useDispatch();
  const { isBookModalOpen, selectedBookId, books, mode } = useSelector(
    (state) => state.books
  );

  const bookToEdit = books.find((book) => book.id === selectedBookId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      year: '',
      status: '',
    },
  });

  // Populate form when editing
  // it will show the existing book details in the form when editing
  useEffect(() => {
    if (mode === 'edit' && bookToEdit) {
      setValue('title', bookToEdit.title);
      setValue('author', bookToEdit.author);
      setValue('genre', bookToEdit.genre);
      setValue('year', bookToEdit.year);
      setValue('status', bookToEdit.status);
    } else {
      reset();
    }
  }, [mode, bookToEdit, setValue, reset]);

  // handler to close the edit/add book modal
  const handleClose = () => {
    dispatch(toggleBookModal());
    dispatch(setSelectedBookId(null));
    dispatch(setBookModalMode('add'));
    reset();
  };

  const [addBook, { isLoading: isAdding }] = useAddBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  // submit handler for the form
  // it will call the addBook or updateBook mutation based on the mode
  const onSubmit = async (data) => {
    try {
      if (mode === 'edit') {
        await updateBook({ id: selectedBookId, ...data }).unwrap();
        toast.success('Book updated successfully!');
      } else {
        await addBook(data).unwrap();
        toast.success('Book added successfully!');
      }
      handleClose();
    } catch (error) {
      toast.error(`Failed to ${mode === 'edit' ? 'update' : 'add'} book`);
    }
  };

  if (!isBookModalOpen || (mode === 'edit' && !bookToEdit)) return null;

  const isLoading = isAdding || isUpdating;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
        onClick={handleClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <RxCross2 size={24} />
          </button>

          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            {mode === 'edit' ? 'Edit Book' : 'Add New Book'}
          </h3>

          {/* Form for adding or editing a book */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Book Title"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              {/* errors for title input */}
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Author Name"
                {...register('author', { required: 'Author is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              {/* errors for author input */}
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register('genre', { required: 'Genre is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Genre</option>
                {genreOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              {/* errors for genre option */}
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Publication Year"
                {...register('year', {
                  required: 'Year is required',
                  min: { value: 1900, message: 'Year must be after 1900' },
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              {/* errors for year option */}
              {errors.year && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Issued">Issued</option>
              </select>
              {/* errors for status option */}
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-medium text-white transition-all bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  {mode === 'edit' ? 'Updating...' : 'Adding...'}
                </span>
              ) : mode === 'edit' ? (
                'Update Book'
              ) : (
                'Add Book'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookFormModal;
