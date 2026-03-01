import { NextResponse } from "next/server";
import { db } from "@/database/postgres";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const book_sn = searchParams.get("book_sn");
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 10);

    if (!book_sn) {
      return NextResponse.json({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    const offset = (page - 1) * pageSize;

    const [{ count }] = await db
      .selectFrom("bookclub.reply")
      .select(({ fn }) => fn.count<number>("reply_sn").as("count"))
      .where("book_sn", "=", Number(book_sn))
      .execute();

    const replyList = await db
      .selectFrom("bookclub.reply as r")
      .innerJoin("bookclub.users as u", "r.user_sn", "u.user_sn")
      .select([
        "r.reply_sn",
        "r.reply_content",
        "r.parent_reply_sn",
        "r.reply_group_sn",
        "r.reply_depth",
        "r.book_sn",
        "r.user_sn",
        "r.update_date as reply_update_date",
        "u.user_name",
        "u.user_id",
        "u.profile_image",
        "u.update_date as user_update_date",
      ])
      .where("r.book_sn", "=", Number(book_sn))
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
