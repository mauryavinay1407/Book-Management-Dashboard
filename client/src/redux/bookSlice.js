import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],   // to store the list of books
    selectedBookId: null,  // to track the currently selected book for editing
    isBookModalOpen: false, // to check the book modal is open or not
    mode: 'add', // to track the mode of the book modal (add or edit)
    deletedBook: null, // to store the book that was deleted
    showUndoDelete: false, // to control the undo delete popup
  },

  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSelectedBookId: (state, action) => {
      state.selectedBookId = action.payload;
    },
    toggleBookModal: (state) => {
      state.isBookModalOpen = !state.isBookModalOpen;
    },
    setBookModalMode: (state, action) => {
      state.mode = action.payload;
    },
    setDeletedBook: (state, action) => {
      state.deletedBook = action.payload;
    },
    setShowUndoDelete: (state, action) => {
      state.showUndoDelete = action.payload;
    },
  },
});

export const {
  setBooks,
  setSelectedBookId,
  toggleBookModal,
  setBookModalMode,
  setDeletedBook,
  setShowUndoDelete,
} = bookSlice.actions;

export default bookSlice.reducer;
