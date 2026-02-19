import { NextResponse } from "next/server";
import { db } from "@/database/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const author = searchParams.get("author");

    let query = db.selectFrom("bookclub.books").selectAll();

    if (title) {
      query = query.where("bookclub.books.title", "like", `%${title}%`);
    }

    if (author) {
      query = query.where("bookclub.books.author", "like", `%${author}%`);
    }

    const bookList = await query.execute();

    return NextResponse.json(bookList);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}
