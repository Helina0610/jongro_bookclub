import type { BookEntity } from "@/app/books/page";
import BookItem from "@/components/books/books-item";

type BookList = {
  bookList: BookEntity[];
};

const BookList = ({ bookList }: BookList) => {
  return (
    <>
      {bookList.map((book) => (
        <BookItem key={book.bookId} book={book} />
      ))}
    </>
  );
};

export default BookList;
