import type { BookEntity } from "@/app/books/page";
import BookList from "@/components/books/books-list";
import SearchInputButton from "../common/search-input-button";
import SectionTitle from "../common/section-title";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const bookList: BookEntity[] = [
  {
    bookId: "1",
    title: "안녕이라그랬어",
    writer: "김애란",
    genre: "한국소설",
    coverURL: "/bookcover/안녕이라그랬어.jpg",
    description: " ",
  },
  {
    bookId: "2",
    title: "눈과돌멩이",
    writer: "위수정 외",
    genre: "심리학",
    coverURL: "/bookcover/눈과돌멩이.jpg",
    description: "",
  },
];

const WishListSection = () => {
  return (
    <div className="space-y-6">
      <SectionTitle title="Wish List" />

      {/* 🔍 Search Section */}
      <div className="rounded-md border border-dashed px-4 py-8 sm:px-6 sm:py-12 transition-colors duration-200">
        <h3 className="mb-4 text-lg sm:text-xl font-bold tracking-tight text-center">도서 검색</h3>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
          <Select>
            <SelectTrigger className="w-full sm:max-w-48">
              <SelectValue placeholder="검색조건" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="author">작가</SelectItem>
                <SelectItem value="publisher">출판사</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="w-full sm:w-auto">
            <SearchInputButton />
          </div>
        </div>
      </div>

      {/* 📚 Book List */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        <BookList bookList={bookList} />
      </div>
    </div>
  );
};

export default WishListSection;
