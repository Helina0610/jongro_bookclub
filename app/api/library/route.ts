import { NextResponse } from "next/server";
import type { LibraryBookItemResponse, LibraryResponse, SearchBook } from "@/database/types/library";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const author = searchParams.get("author");

  if (!title && !author) {
    return NextResponse.json([], { status: 200 });
  }

  // TODO : 환경 변수 변경하기
  const libraryUrl = process.env.LIBRARY_URL;
  const libraryKey = process.env.LIBRARY_KEY;

  if (!libraryUrl || !libraryKey) {
    return NextResponse.json({ error: "Library API 환경변수가 설정되지 않았습니다." }, { status: 500 });
  }

  const baseUrl = new URL(libraryUrl);

  // TODO : API 메뉴얼에 따라 파라미터 설정하기
  baseUrl.searchParams.set("cert_key", libraryKey);
  baseUrl.searchParams.set("result_style", "json");
  baseUrl.searchParams.set("page_no", "1");
  baseUrl.searchParams.set("page_size", "100");

  if (title) {
    baseUrl.searchParams.set("title", title);
  }

  if (author) {
    baseUrl.searchParams.set("author", author);
  }

  const res = await fetch(baseUrl.toString());

  if (!res.ok) {
    return NextResponse.json({ error: "외부 도서 API 호출 실패" }, { status: 502 });
  }

  const data: LibraryResponse = await res.json();

  if (!data.item) {
    return NextResponse.json([], { status: 200 });
  }

  const books: SearchBook[] = data.item.map((item: LibraryBookItemResponse) => ({
    id: Number(item.isbn),
    title: item.title,
    author: item.author,
    publisher: item.publisher,
    update_date: item.pubDate,
    cover: item.cover,
  }));

  return NextResponse.json(books);
}
