import { Book } from "../../redux/slices/SearchResultsSlice";

interface BookCardProps {
  book: Book;
  addToWishList: (book: Book) => void;
}

export default function BookCard({ book, addToWishList }: BookCardProps) {
  if (!book) {
    return null;
  }

  const { imageLinks, title, authors } = book.volumeInfo;

  return (
    <div
      className="book-card"
      onClick={() => {
        addToWishList(book);
      }}>
      {imageLinks?.thumbnail ? (
        <img src={imageLinks.thumbnail} alt={title} />
      ) : (
        <div>No Image Available</div>
      )}
      <h4>Title: {title || "Title Not Available"}</h4>
      <p>Author: {authors?.join(", ") || "Author Not Available"}</p>
    </div>
  );
}
