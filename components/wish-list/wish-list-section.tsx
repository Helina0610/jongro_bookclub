"use client";

import { useState } from "react";
import type { BookEntity } from "@/app/(main)/books/page";
import BookList from "@/components/books/books-list";
import SearchInputButton from "../common/search-input-button";
import SectionTitle from "../common/section-title";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

/* ---------------- mock data ---------------- */

const bookList: BookEntity[] = [
  {
    bookId: "1",
    title: "안녕이라그랬어",
    writer: "김애란",
    genre: "한국소설",
    coverURL: "/bookcover/안녕이라그랬어.jpg",
    description: "",
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

type SearchBook = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  update_date: string;
};

/* ---------------- component ---------------- */

const WishListSection = () => {
  const [condition, setCondition] = useState<string>();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchBook[] | null>(null);

  /* 🔍 검색 API 호출 (mock) */
  const handleSearch = async () => {
    if (!keyword || !condition) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (condition === "title") {
        params.set("title", keyword);
      }

      if (condition === "author") {
        params.set("author", keyword);
      }

      if (condition === "publisher") {
        params.set("publisher", keyword);
      }

      const res = await fetch(`/api/library?${params.toString()}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("검색 API 호출 실패");
      }

      const books = await res.json();
      setSearchResult(books);
    } catch (e) {
      console.error(e);
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchResult(null);
    setKeyword("");
  };

  return (
    <div className="space-y-8">
      <SectionTitle title="Wish List" />

      {/* 🔍 Search Section */}
      <div className="rounded-md border border-dashed px-4 py-8 sm:px-6 sm:py-12">
        <h3 className="mb-4 text-lg sm:text-xl font-bold tracking-tight text-center">도서 검색</h3>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
          <Select onValueChange={setCondition}>
            <SelectTrigger className="w-full sm:max-w-40">
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

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full sm:w-80 rounded-md border px-3 py-2 text-sm"
          />

          <Button onClick={handleSearch}>검색</Button>
        </div>
      </div>

      {/* 🔍 검색 결과 */}
      {loading && <p className="text-center text-sm text-muted-foreground">검색 중입니다…</p>}

      {searchResult && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">검색 결과 ({searchResult.length})</h4>
            <Button variant="ghost" size="sm" onClick={resetSearch}>
              초기화
            </Button>
          </div>

          {searchResult.length === 0 ? (
            <div className="rounded-md border border-dashed p-6 text-center text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div
              className="grid gap-4
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5"
            >
              {searchResult.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border bg-background p-4 shadow-sm
                             transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="line-clamp-2 text-sm font-semibold">{book.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
                  <p className="text-xs text-muted-foreground truncate">{book.publisher}</p>
                  <p className="text-xs text-muted-foreground truncate">{book.update_date}</p>

                  <Button size="sm" variant="outline" className="mt-3 w-full">
                    Wish List 추가
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 📚 기존 Book List */}
      <h4 className="text-lg font-semibold">전체 위시도서</h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        <BookList bookList={bookList} />
      </div>
    </div>
  );
};

export default WishListSection;
