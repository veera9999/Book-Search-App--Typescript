import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "../slices/SearchResultsSlice";

const store = configureStore({
  reducer: {
    books: searchResultsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
