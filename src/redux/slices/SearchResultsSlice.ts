// redux/slices/SearchResultsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
  publishedDate: string;
  imageLinks?: {
    thumbnail: string;
  };
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}
interface BooksState {
  books: Book[];
  wishList: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  wishList: [],
  status: "idle",
  error: null,
};

export const fetchBooks = createAsyncThunk<Book[], string>(
  "books/fetchBooks",
  async (query) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    return data.items;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Book>) => {
      state.wishList.push(action.payload);
    },
    deleteFromWishList: (state, action: PayloadAction<string>) => {
      state.wishList = state.wishList.filter(
        (book) => book.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

export const { addToWishList, deleteFromWishList } = booksSlice.actions;

export default booksSlice.reducer;
