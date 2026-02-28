"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";
import BookList from "@/components/books/books-list";
import type { LibraryBookItemResponse } from "@/database/types/library";
import { useBooks } from "@/lib/hooks/use-book";
import SectionTitle from "../common/section-title";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

/* ---------------- component ---------------- */

const WishListSection = () => {
  const [condition, setCondition] = React.useState<string>();
  const [keyword, setKeyword] = React.useState("");
  const [apiLoading, setApiLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<LibraryBookItemResponse[] | null>(null);
  const [selectedBook, setSelectedBook] = React.useState<LibraryBookItemResponse | null>(null);

  const { books, loading, error, refetch } = useBooks({ wishYn: "Y" });

  /* 🔍 검색 API 호출 (mock) */
  const handleSearch = async () => {
    if (!keyword || !condition) return;

    setApiLoading(true);

    try {
      const params = new URLSearchParams();
      params.set("queryType", condition);
      params.set("query", keyword);

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
      setApiLoading(false);
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
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 페이지 새로고침 방지
            handleSearch();
          }}
        >
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
                </SelectGroup>
              </SelectContent>
            </Select>

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="w-full sm:w-80 rounded-md border px-3 py-2 text-sm"
            />

            <Button type="submit">검색</Button>
          </div>
        </form>
      </div>

      {/* 🔍 검색 결과 */}
      {apiLoading && <p className="text-center text-sm text-muted-foreground">검색 중입니다…</p>}

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
            <div className="overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[160px]  gap-3 pb-2  sm:auto-cols-[180px]  md:auto-cols-[200px]">
                {searchResult.map((book) => (
                  <Card
                    key={book.isbn}
                    className="flex h-full flex-col transition hover:-translate-y-1 hover:shadow-md p-2"
                  >
                    <CardContent className="p-2">
                      <div className="relative w-full overflow-hidden rounded-md aspect-3/4 bg-muted">
                        <Image
                          src={book.cover ?? "/images/book-placeholder.png"}
                          alt={book.title ?? "도서 커버"}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="px-2">
                      <div className="space-y-1 text-start">
                        <div className="line-clamp-2 text-sm font-medium">{book.title}</div>
                        <div className="text-xs text-muted-foreground">{book.author}</div>
                        <div className="text-xs text-muted-foreground truncate">{book.publisher}</div>
                      </div>
                    </CardFooter>
                    <Button
                      variant="outline"
                      className="mt-auto w-full"
                      onClick={() => {
                        setSelectedBook(book);
                        setOpen(true);
                      }}
                    >
                      Wish List 추가
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 📚 기존 Book List */}
      <h4 className="text-lg font-semibold">전체 위시도서</h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        <BookList bookList={books} />
      </div>

      {selectedBook && (
        <WishBookDialog
          book={selectedBook}
          open={open}
          setOpen={setOpen}
          onSuccess={refetch}
          resetSearch={resetSearch}
        />
      )}
    </div>
  );
};

export default WishListSection;

type WishBookDialogType = {
  book: LibraryBookItemResponse;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  resetSearch: () => void;
};

const WishBookDialog = ({ book, open, setOpen, onSuccess, resetSearch }: WishBookDialogType) => {
  // const [open, setOpen] = React.useState(false);
  const [relayBook, setRelayBook] = React.useState<string>();
  const [bookType, setBookType] = React.useState<string>();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookType) {
      alert("장르를 선택해 주세요");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("book_type", bookType);
    formData.append("book_isbn", book.isbn ?? "");
    formData.append("book_cover", book.cover ?? "");
    formData.append("book_category", book.categoryName ?? "");

    if (relayBook) {
      formData.append("rely_book_yn", relayBook);
    }

    const res = await fetch("/api/book", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.error ?? "저장 실패");
      return;
    }

    alert("저장되었습니다");
    setOpen(false); // 🔥 핵심
    onSuccess();
    resetSearch();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>책 편집</DialogTitle>
          <DialogDescription>추가 정보를 기입해 주세요</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* 🔽 이미지 + 폼 레이아웃 */}
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            {/* 왼쪽 이미지 */}
            <div className="relative w-full overflow-hidden rounded-md aspect-3/4 bg-muted">
              <Image
                src={book.cover ?? "/images/book-placeholder.png"}
                alt={book.title ?? "도서 커버"}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>

            {/* 오른쪽 필드 그룹 */}
            <FieldGroup className="gap-3">
              <Field>
                <Label htmlFor="title">책 제목</Label>
                <Input id="title" name="title" defaultValue={book.title ?? ""} />
              </Field>

              <Field>
                <Label htmlFor="author">저자</Label>
                <Input id="author" name="author" defaultValue={book.author ?? ""} />
              </Field>
              <Field>
                <Label htmlFor="publisher">출판사</Label>
                <Input id="publisher" name="publisher" defaultValue={book.publisher ?? ""} />
              </Field>
              <Field>
                <Label htmlFor="description">책 소개</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={book.description ?? ""}
                  className="overflow-scroll h-20"
                />
              </Field>

              <Field>
                <Label>장르</Label>
                <Select onValueChange={setBookType}>
                  <SelectTrigger>
                    <SelectValue placeholder="장르를 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="국내도서">국내도서</SelectItem>
                      <SelectItem value="해외도서">해외도서</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>릴레이독서</Label>
                <Select onValueChange={setRelayBook}>
                  <SelectTrigger>
                    <SelectValue placeholder="릴레이독서 여부" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Y">Y</SelectItem>
                      <SelectItem value="N">N</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full">
                취소
              </Button>
            </DialogClose>

            <Button type="submit" className="w-full">
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
