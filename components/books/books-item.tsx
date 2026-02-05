import Image from "next/image";
import type { BookEntity } from "@/app/(main)/books/page";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type BookItemType = {
  book: BookEntity;
};

const BookItem = ({ book }: BookItemType) => {
  const { title, coverURL, genre, writer, bookId } = book;
  return (
    <Card key={book.bookId} className="w-full transition hover:shadow-md p-2">
      <a href={`/books/${bookId}`}>
        <CardContent className="p-2">
          <div className="relative w-full overflow-hidden rounded-md aspect-3/2 sm:aspect-2/3">
            <Image src={coverURL} alt={title} fill className="object-cover" />
          </div>
        </CardContent>
        <CardFooter className="">
          <div className="space-y-1 text-start">
            <div className="text-sm font-medium">{title}</div>
            <div className="text-xs text-muted-foreground">{writer}</div>
            <div className="text-xs text-muted-foreground">{genre}</div>
          </div>
        </CardFooter>
      </a>
    </Card>
  );
};

export default BookItem;
