import { NextResponse } from "next/server";
import type { LibraryResponse } from "@/database/types/library";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const author = searchParams.get("author");

  if (!title && !author) {
    return NextResponse.json([], { status: 200 });
  }

  const libraryUrl = process.env.LIBRARY_URL;
  const libraryKey = process.env.LIBRARY_KEY;

  if (!libraryUrl || !libraryKey) {
    return NextResponse.json({ error: "Library API 환경변수가 설정되지 않았습니다." }, { status: 500 });
  }

  const baseUrl = new URL(libraryUrl);

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

  const data = await res.json();

  const books = data.docs.map((item: LibraryResponse) => ({
    id: Number(item.EA_ISBN),
    title: item.TITLE,
    author: item.AUTHOR,
    publisher: item.PUBLISHER,
    update_date: item.UPDATE_DATE
      ? `${item.UPDATE_DATE?.slice(0, 4)}년${item.UPDATE_DATE?.slice(4, 6)}월${item.UPDATE_DATE?.slice(6, 8)}일`
      : null,
  }));

  return NextResponse.json(books);
}
