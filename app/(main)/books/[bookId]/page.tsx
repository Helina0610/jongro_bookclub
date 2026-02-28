import { SessionProvider } from "next-auth/react";
import BookContent from "@/components/books/book-content";

type BookDetailType = {
  params: {
    bookId: string;
  };
};

const BookDetail = async ({ params }: BookDetailType) => {
  const { bookId } = await params;

  return (
    <SessionProvider>
      <div>
        <BookContent bookSn={bookId} />
      </div>
    </SessionProvider>
  );
};

export default BookDetail;
