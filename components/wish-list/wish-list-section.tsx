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
    <div>
      <SectionTitle title="Wish List" />
      <div>
        <div>
          <div className="rounded-md border border-dashed px-6 py-20 transition-colors duration-200 cursor-pointer">
            <h3 className="mb-4 text-xl font-bold tracking-tight text-center">도서 검색</h3>
            <div className="mt-2 flex gap-2 items-center justify-center">
              <Select>
                <SelectTrigger className="w-full max-w-48">
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
              <div className="w-2xl">
                <SearchInputButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 mt-5 gap-2.5">
        <BookList bookList={bookList} />
      </div>
    </div>
  );
};

export default WishListSection;
