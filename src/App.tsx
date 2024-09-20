import React, { useState } from "react";
import { Provider } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import WishList from "./components/WishList/WishList";
import store from "./redux/store/store";
import "./App.css";
import { Book } from "./redux/slices/SearchResultsSlice";

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1>Book Store</h1>
        </header>
        <div className="container">
          <div>
            <SearchBar setSelectedBook={setSelectedBook} />
            <SearchResults book={selectedBook ? [selectedBook] : undefined} />
          </div>
          <WishList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
