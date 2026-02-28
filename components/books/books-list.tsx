import BookItem from "@/components/books/books-item";
import type { BooksResponse } from "@/database/types/books";

type BookList = {
  bookList: BooksResponse[];
};

const BookList = ({ bookList }: BookList) => {
  return (
    <>
      {bookList.map((book) => (
        <BookItem key={book.book_sn} book={book} />
      ))}
    </>
  );
};

export default BookList;
