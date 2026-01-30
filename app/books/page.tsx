import BookSection from "@/components/books/books-section";

export interface BookEntity {
  bookId: string;
  title: string;
  writer: string;
  genre: string;
  coverURL: string;
  description: string;
}

const bookList: BookEntity[] = [
  {
    bookId: "1",
    title: "우아한 유령",
    writer: "장진영",
    genre: "한국소설",
    coverURL: "/bookcover/우아한유령.jpg",
    description: " ",
  },
  {
    bookId: "2",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
];

const BookPage = () => {
  return (
    <div>
      <BookSection bookList={bookList} />
    </div>
  );
};

export default BookPage;
