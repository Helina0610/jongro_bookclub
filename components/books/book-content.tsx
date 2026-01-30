import Image from "next/image";
import type { BookEntity } from "@/app/books/page";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type BookContent = {
  book: BookEntity;
};

const BookContent = ({ book }: BookContent) => {
  const { bookId, coverURL, genre, title, writer, description } = book;
  const tags = ["한국소설"];
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative w-80 aspect-2/3 overflow-hidden rounded-lg">
            <Image src={coverURL} alt={book.title} fill className="object-cover" />
          </div>
        </div>

        {/* Book Info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-muted-foreground text-lg">
            {writer} · {"까치"}
          </p>

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant={"outline"}>
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <div>
            <h2 className="text-xl font-semibold mb-2">책 소개</h2>
            <p className="leading-relaxed text-muted-foreground">{book.description}</p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default BookContent;
