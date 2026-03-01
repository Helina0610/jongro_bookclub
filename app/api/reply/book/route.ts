import { NextResponse } from "next/server";
import { db } from "@/database/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_sn = searchParams.get("user_sn");
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 10);

    if (!user_sn) {
      return NextResponse.json({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    const offset = (page - 1) * pageSize;

    const [{ count }] = await db
      .selectFrom("bookclub.reply")
      .select(({ fn }) => fn.count<number>("reply_sn").as("count"))
      .where("user_sn", "=", Number(user_sn))
      .execute();

    const replyList = await db
      .selectFrom("bookclub.reply as r")
      .innerJoin("bookclub.books as b", "r.book_sn", "b.book_sn")
      .select([
        "r.reply_sn",
        "r.reply_content",
        "r.parent_reply_sn",
        "r.reply_group_sn",
        "r.reply_depth",
        "r.book_sn",
        "r.user_sn",
        "r.update_date as reply_update_date",
        "b.book_sn",
        "b.title",
        "b.author",
        "b.publisher",
        "b.book_isbn",
        "b.book_cover",
        "b.book_description",
        "b.book_type",
        "b.wish_yn",
        "b.rely_book_yn",
        "b.book_category",
        "b.update_date as book_update_date",
      ])
      .where("r.user_sn", "=", Number(user_sn))
      .limit(pageSize)
      .offset(offset)
      .execute();

    return NextResponse.json({
      list: replyList,
      pagination: {
        total: Number(count),
        page,
        pageSize,
        totalPages: Math.ceil(Number(count) / pageSize),
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}
