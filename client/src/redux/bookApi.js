import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setBooks, setDeletedBook, setShowUndoDelete } from './bookSlice';
import { BASE_URL } from '../../config';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({
        search = '',
        genre = '',
        status = '',
        _page = 1,
        _limit = 10,
      }) => {
        const params = new URLSearchParams();

        // pagination and sorting params
        params.append('_page', _page);
        params.append('_limit', _limit);
        params.append('_sort', 'id');
        params.append('_order', 'desc');

        // Filter params
        if (genre) params.append('genre', genre);
        if (status) params.append('status', status);

        return {
          url: `books?${params.toString()}`,
          method: 'GET',
        };
      },
      async transformResponse(response, meta) {
        // Get total count from headers
        const totalCount = parseInt(
          meta.response.headers.get('x-total-count') || '0'
        );
        return {
          books: response,
          totalCount,
        };
      },
      async onQueryStarted({ search = '' }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Filter locally for title/author search
          const filtered = data.books.filter(
            (book) =>
              book.title.toLowerCase().includes(search.toLowerCase()) ||
              book.author.toLowerCase().includes(search.toLowerCase())
          );

          // Dispatch the filtered books to the store
          dispatch(setBooks(filtered));
        } catch (error) {
          console.error('Failed to fetch books:', error);
          dispatch(setBooks([]));
        }
      },
      providesTags: ['Book'],
    }),

    // add new book to the store
    addBook: builder.mutation({
      query: (data) => ({
        url: 'books',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

    // update old book details from the store using id
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),

    // delete old book details from the store using id
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const book = getState().books.books.find((b) => b.id === id);

        dispatch(setDeletedBook(book));
        dispatch(setShowUndoDelete(true));

        try {
          await queryFulfilled;
          console.log(`Book is deleted successfully`);
        } catch (error) {
          dispatch(setDeletedBook(null));
          dispatch(setShowUndoDelete(false));
        }
      },
      invalidatesTags: ['Book'],
    }),

    // undo deleted book
    undoDelete: builder.mutation({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useUndoDeleteMutation,
} = bookApi;
