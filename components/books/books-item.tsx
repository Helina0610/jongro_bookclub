import Image from "next/image";
import React from "react";
import type { BookEntity } from "@/app/books/page";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type BookItemType = {
  book: BookEntity;
};

const BookItem = ({ book }: BookItemType) => {
  const { title, coverURL, genre, writer, bookId } = book;
  return (
    <Card>
      <a href={`/books/${bookId}`}>
        <CardContent className="flex justify-center">
          <div className="relative w-40 aspect-2/3 overflow-hidden rounded">
            <Image src={coverURL} alt={title} fill className="object-cover" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm space-y-1">
            <div className="font-medium">{title}</div>
            <div className="text-muted-foreground">{writer}</div>
            <div className="text-xs text-muted-foreground">{genre}</div>
          </div>
        </CardFooter>
      </a>
    </Card>
  );
};

export default BookItem;
