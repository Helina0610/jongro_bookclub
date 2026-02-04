import Image from "next/image";
import type { BookEntity } from "@/app/books/page";
import SectionTitle from "@/components/common/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
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
            <CardTitle className="px-6 pt-6">2026 독서모임 현황</CardTitle>
            <CardContent>
              {/* <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
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
              </div> */}
              {/* 참여 정보 */}
              <div className="grid gap-4">
                <div>
                  <Field className="w-full">
                    <FieldLabel htmlFor="progress-upload">
                      <span>참여율</span>
                      <span className="ml-auto">66%</span>
                    </FieldLabel>
                    <Progress value={66} id="progress-upload" />
                  </Field>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="relative aspect-square w-full overflow-hidden rounded-md border">
                      <Image src="/완독도장.png" alt={`stamp-${index}`} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Log */}
          <Card>
            <CardTitle className="px-6 pt-6">My Log</CardTitle>

            <CardContent className="space-y-4">
              {/* Log Item */}
              <div className="flex gap-4 rounded-lg border p-3 hover:bg-muted/50 transition">
                {/* Book Cover */}
                <div className="relative w-20 shrink-0 overflow-hidden rounded-md aspect-2/3">
                  <Image src="/bookcover/눈과돌멩이.jpg" alt="눈과돌멩이" fill className="object-cover" />
                </div>

                {/* Log Content */}
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">눈과 돌멩이</div>
                  <p className="text-sm text-muted-foreground line-clamp-4 h-2/3">
                    Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt
                    deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in
                    quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis
                    nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur.
                    Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
                  </p>
                  <span className="text-xs text-muted-foreground">2026-02-01</span>
                </div>
              </div>

              {/* Log Item 2 */}
              <div className="flex gap-4 rounded-lg border p-3 hover:bg-muted/50 transition">
                <div className="relative w-20 shrink-0 overflow-hidden rounded-md aspect-2/3">
                  <Image src="/bookcover/우아한유령.jpg" alt="우아한유령" fill className="object-cover" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">눈과 돌멩이</div>
                  <p className="text-sm text-muted-foreground line-clamp-4 h-2/3">
                    Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt
                    deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in
                    quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis
                    nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur.
                    Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
                  </p>
                  <span className="text-xs text-muted-foreground">2026-02-02</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
