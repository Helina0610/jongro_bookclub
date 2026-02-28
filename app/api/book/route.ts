import { NextResponse } from "next/server";
import { db } from "@/database/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const author = searchParams.get("author");
    const wishYn = searchParams.get("wishYn");
    const bookType = searchParams.get("bookType");
    const bookSn = Number(searchParams.get("bookSn"));

    let query = db.selectFrom("bookclub.books").selectAll();

    if (title) {
      query = query.where("bookclub.books.title", "like", `%${title}%`);
    }

    if (author) {
      query = query.where("bookclub.books.author", "like", `%${author}%`);
    }

    if (wishYn) {
      query = query.where("bookclub.books.wish_yn", "=", "Y");
    }

    if (bookType) {
      if (bookType === "국내도서" || bookType === "해외도서") {
        query = query.where("bookclub.books.book_type", "=", bookType);
      } else if (bookType === "릴레이독서") {
        query = query.where("bookclub.books.wish_yn", "=", "Y");
      }
    }

    if (bookSn) {
      query = query.where("bookclub.books.book_sn", "=", bookSn);
    }

    const bookList = await query.execute();

    return NextResponse.json(bookList);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString() ?? "";
    const author = formData.get("author")?.toString() ?? "";
    const publisher = formData.get("publisher")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const bookType = formData.get("book_type")?.toString() ?? "";
    const relayBookYn = formData.get("rely_book_yn")?.toString() ?? "N";
    const book_isbn = formData.get("book_isbn")?.toString() ?? "";
    const book_cover = formData.get("book_cover")?.toString() ?? "";
    const book_category = formData.get("book_category")?.toString() ?? "";

    if (!title || !book_isbn || !bookType) {
      return NextResponse.json({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    await db
      .insertInto("bookclub.books")
      .values({
        title,
        author,
        book_isbn,
        publisher,
        book_cover: book_cover,
        book_description: description,
        book_type: bookType,
        wish_yn: "Y",
        rely_book_yn: relayBookYn,
        update_date: new Date(),
        book_category: book_category,
      })
      .execute();

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}
