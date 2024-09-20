// components/WishList/WishList.tsx
import { useSelector, useDispatch } from "react-redux";
import { deleteFromWishList } from "../../redux/slices/SearchResultsSlice";
import { Book } from "../../redux/slices/SearchResultsSlice";
import { RootState } from "../../redux/store/store";

export default function WishList() {
  const dispatch = useDispatch();
  const wishList = useSelector((state: RootState) => state.books.wishList);

  return (
    <div className="wishList">
      <h1>WishList</h1>
      <ul>
        {wishList?.map((book: Book) => (
          <div className="wishList-item" key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button
              onClick={() => {
                dispatch(deleteFromWishList(book.id));
              }}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
