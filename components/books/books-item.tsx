import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { BooksResponse } from "@/database/types/books";

type BookItemType = {
  book: BooksResponse;
};

const BookItem = ({ book }: BookItemType) => {
  const { book_sn, book_cover, title, author, book_type } = book;
  return (
    <Card key={book_sn} className="w-full transition hover:shadow-md p-2">
      <a href={`/books/${book_sn}`}>
        <CardContent className="p-2">
          <div className="relative w-full overflow-hidden rounded-md aspect-3/2 sm:aspect-2/3">
            <Image src={book_cover ?? ""} alt={title ?? ""} fill className="object-cover" />
          </div>
        </CardContent>
        <CardFooter className="px-2">
          <div className="space-y-1 text-start">
            <div className="text-sm font-medium">{title}</div>
            <div className="text-xs text-muted-foreground">{author}</div>
            <div className="text-xs text-muted-foreground">{book_type}</div>
          </div>
        </CardFooter>
      </a>
    </Card>
  );
};

export default BookItem;
