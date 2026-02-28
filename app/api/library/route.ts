import { NextResponse } from "next/server";
import type { LibraryBookItemResponse, SearchBook } from "@/database/types/library";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const queryType = searchParams.get("queryType");
  const query = searchParams.get("query");

  if (!queryType || !query) {
    return NextResponse.json([], { status: 200 });
  }

  // TODO : 환경 변수 변경하기
  const aladinUrl = process.env.ALADIN_URL;
  const aladinKey = process.env.ALADIN_KEY;

  if (!aladinUrl || !aladinKey) {
    return NextResponse.json({ error: "Library API 환경변수가 설정되지 않았습니다." }, { status: 500 });
  }

  const baseUrl = new URL(aladinUrl);

  // TODO : API 메뉴얼에 따라 파라미터 설정하기
  baseUrl.searchParams.set("TTBKey", aladinKey);
  baseUrl.searchParams.set("SearchTarget", "Book");
  baseUrl.searchParams.set("Output", "JS");
  baseUrl.searchParams.set("Cover", "Big");
  baseUrl.searchParams.set("Start", "1");
  baseUrl.searchParams.set("MaxResults", "100");
  baseUrl.searchParams.set("QueryType", queryType);
  baseUrl.searchParams.set("Query", query);

  const res = await fetch(baseUrl.toString());

  if (!res.ok) {
    return NextResponse.json({ error: "외부 도서 API 호출 실패" }, { status: 502 });
  }

  let text = await res.text();
  text = text.trim();
  if (text.endsWith(";")) {
    text = text.slice(0, -1);
  }

  text = text.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

  const data = JSON.parse(text);

  if (!data.item) {
    return NextResponse.json([], { status: 200 });
  }

  const books: SearchBook[] = data.item.map((item: LibraryBookItemResponse) => ({
    isbn: item.isbn ?? "",
    title: item.title ?? "",
    author:
      item.author
        ?.split(",")
        .map((v) => v.trim())
        .filter((v) => !v.includes("옮김"))
        .map((v) => v.replace(/\s*지음$/, "")) ?? "",
    publisher: item.publisher ?? "",
    update_date: item.pubDate ?? "",
    cover: item.cover ?? "",
    categoryName: item.categoryName ?? "",
  }));

  return NextResponse.json(books);
}
