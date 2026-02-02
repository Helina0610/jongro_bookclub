import type { BookEntity } from "@/app/books/page";
import BookList from "@/components/books/books-list";
import SearchSection from "@/components/books/search-section";
import SectionTitle from "@/components/common/section-title";

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
      <div className="grid grid-cols-6 mt-5 gap-2.5">
        <BookList bookList={bookList} />
      </div>
    </div>
  );
};

export default BookSection;
