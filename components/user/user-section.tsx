import Image from "next/image";
import React from "react";
import type { BookEntity } from "@/app/books/page";
import SectionTitle from "@/components/common/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import BookList from "../books/books-list";
import TanstackTable from "../common/tanstack-table";

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
  {
    bookId: "3",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
  {
    bookId: "4",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
  {
    bookId: "5",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
  {
    bookId: "6",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
  {
    bookId: "7",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
  {
    bookId: "8",
    title: "소유냐 존재냐",
    writer: "에리히 프롬",
    genre: "심리학",
    coverURL: "/bookcover/소유냐존재냐.jpg",
    description: "",
  },
];

const UserSection = () => {
  return (
    <div>
      <SectionTitle title={"My Page"} />
      {/* 프로파일 */}
      <div className="grid grid-cols-6 gap-4 pt-5">
        <div className="col-span-2 w-60">
          <div className="relative  aspect-square overflow-hidden rounded-full outline-1">
            <Image alt="사진" src="/두산망곰잠옷.jpg" fill></Image>
          </div>
          <div className="mr-3  m-3">
            <h1 className="text-2xl font-semibold leading-tight">망곰</h1>
            <p className="text-muted-foreground">@manggom</p>
            <p className="text-sm text-muted-foreground max-w-md">
              책 읽는 걸 좋아하는 개발자 📚 종로책방 커뮤니티 회원
            </p>
            <p className="text-sm text-muted-foreground">📞 010-1111-2222</p>
            <div className="mt-3">
              <Button variant={"default"} className="w-80">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          {/* Stamp List */}
          <Card>
            <CardTitle className="px-6 pt-6">Book List</CardTitle>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                {bookList.map((book) => (
                  <Card key={book.bookId} className="w-40 sm:w-48 shrink-0 transition hover:shadow-md">
                    <a href={`/books/${book.bookId}`}>
                      <CardContent className="p-2">
                        <div className="relative w-full overflow-hidden rounded-md aspect-3/2 sm:aspect-2/3">
                          <Image src={book.coverURL} alt={book.title} fill className="object-cover" />
                        </div>
                      </CardContent>
                      <CardFooter className="">
                        <div className="space-y-1 text-start">
                          <div className="text-sm font-medium">{book.title}</div>
                          <div className="text-xs text-muted-foreground">{book.writer}</div>
                          <div className="text-xs text-muted-foreground">{book.genre}</div>
                        </div>
                      </CardFooter>
                    </a>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Log */}
          <Card>
            <CardTitle className="px-6 pt-6">My Log</CardTitle>
            <CardContent>
              <TanstackTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
