import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/SearchResultsSlice";
import _ from "lodash";
import { RootState, AppDispatch } from "../../redux/store/store";
import { Book } from "../../redux/slices/SearchResultsSlice";

interface SearchBarProps {
  setSelectedBook: (book: Book | null) => void;
}

export default function SearchBar({ setSelectedBook }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [showAutoComplete, setShowAutoComplete] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<number>(0);

  // Use AppDispatch instead of the default dispatch
  const dispatch = useDispatch<AppDispatch>();

  const { books } = useSelector((state: RootState) => state.books);
  const searchElRef = useRef<HTMLDivElement>(null);

  const handleShowAutocomplete = () => {
    setShowAutoComplete(true);
  };

  const handleHideAutocomplete = () => {
    setShowAutoComplete(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const debouncedOnSearch = useMemo(
    () =>
      _.debounce((query: string) => {
        dispatch(fetchBooks(query));
      }, 1000),
    [dispatch]
  );

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, book: Book) => {
    const selectedBookTitle = e.currentTarget.textContent;
    if (selectedBookTitle) {
      setInputValue(selectedBookTitle);
    } else {
      setInputValue(inputValue);
    }

    setSelectedBook(book);
    handleHideAutocomplete();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveOption((prev) => {
        return prev < books.length - 1 ? prev + 1 : prev;
      });
    } else if (e.key === "ArrowUp") {
      setActiveOption((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    } else if (e.key === "Enter") {
      setSelectedBook(books[activeOption]);
      handleHideAutocomplete();
    } else if (e.key === "Escape") {
      handleHideAutocomplete();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchElRef.current &&
        !searchElRef.current.contains(e.target as Node)
      ) {
        handleHideAutocomplete();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    debouncedOnSearch(inputValue);
    return () => {
      debouncedOnSearch.cancel();
    };
  }, [inputValue, debouncedOnSearch]);

  return (
    <div className="search-bar-container">
      <div className="search-bar" ref={searchElRef}>
        <input
          value={inputValue}
          onClick={handleShowAutocomplete}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search for a Book"
        />
        <span>
          <button
            onClick={() => {
              dispatch(fetchBooks(inputValue));
            }}>
            Search
          </button>
        </span>
        {showAutoComplete ? (
          <div className="auto-search">
            <ul>
              {books?.map((book: Book, index: number) => (
                <li
                  className={`option ${
                    index === activeOption ? "active-option" : ""
                  }`}
                  key={book.id}
                  onClick={(e) => handleClick(e, book)}>
                  {book.volumeInfo.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
