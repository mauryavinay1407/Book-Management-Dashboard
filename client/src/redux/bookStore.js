import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './bookApi';
import booksReducer from './bookSlice';


// configuring the Redux store with bookApi and booksReducer 
export default configureStore({
  reducer: {
    books: booksReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      bookApi.middleware
    ),
});
