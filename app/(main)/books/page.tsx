import { SessionProvider } from "next-auth/react";
import BookSection from "@/components/books/books-section";

export interface BookEntity {
  bookId: string;
  title: string;
  writer: string;
  genre: string;
  coverURL: string;
  description: string;
}

const BookPage = () => {
  return (
    <SessionProvider>
      <div>
        <BookSection />
      </div>
    </SessionProvider>
  );
};

export default BookPage;
