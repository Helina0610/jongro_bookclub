"use client";
import React from "react";
import type { BookEntity } from "@/app/(main)/books/page";
import BookList from "@/components/books/books-list";
import SectionTitle from "@/components/common/section-title";
import { useBooks } from "@/lib/hooks/use-book";
import SearchFilter from "../common/search-filter";
import SearchInputButton from "../common/search-input-button";

export type BookSectionType = {
  bookList: BookEntity[];
};

const BookSection = () => {
  const [title, setTitle] = React.useState("");
  const [bookType, setBookType] = React.useState("");
  const [condition, setCondition] = React.useState<string>();

  const { books, loading, error } = useBooks({
    title,
    bookType,
  });

  return (
    <div>
      <SectionTitle title="Book List" />

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SearchFilter onBookTypeChange={setBookType} selectedBookType={bookType} />
          {/* <Button variant={"ghost"}>
            <Filter />
          </Button> */}
          {/* <Select onValueChange={setCondition}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="검색조건" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="title">릴레이 독서</SelectItem>
                <SelectItem value="author"></SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-full sm:max-w-xs">
          <SearchInputButton onInputChange={setTitle} />
        </div>
      </div>

      {error && <p className="text-red-500">{error.message}</p>}

      <div className="mt-5 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        <BookList bookList={books} />
      </div>
    </div>
  );
};

export default BookSection;
