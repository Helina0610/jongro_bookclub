import Image from "next/image";
import type { BookEntity } from "@/app/books/page";
import BookList from "@/components/books/books-list";
import SearchSection from "@/components/books/search-section";
import SectionTitle from "@/components/common/section-title";
import { Card, CardContent, CardFooter } from "../ui/card";
import BookItem from "./books-item";

type BookSectionType = {
  bookList: BookEntity[];
};

const BookSection = ({ bookList }: BookSectionType) => {
  return (
    <div>
      {/* SearchSection */}
      <SectionTitle title="Book List" />
      <SearchSection />
      {/* gallery */}
      <div className=" mt-5 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 place-items-center ">
        <BookList bookList={bookList} />
      </div>
    </div>
  );
};

export default BookSection;
