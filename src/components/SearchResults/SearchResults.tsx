import BookCard from "./BookCard";
import { addToWishList } from "../../redux/slices/SearchResultsSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { RootState } from "../../redux/store/store";
import { Book } from "../../redux/slices/SearchResultsSlice";

interface SearchResultsProps {
  book?: Book[];
}

export default function SearchResults({ book }: SearchResultsProps) {
  const { status } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {book?.map((book) => (
          <BookCard
            book={book}
            addToWishList={() => dispatch(addToWishList(book))}
            key={book.id}
          />
        ))}
      </ul>
    </div>
  );
}
