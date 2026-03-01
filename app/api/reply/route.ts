import { NextResponse } from "next/server";
import { db } from "@/database/postgres";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const book_sn = searchParams.get("book_sn");
//     const user_sn = searchParams.get("user_sn");

//     let query = db.selectFrom("bookclub.reply as r");

//     if (book_sn) {
//       query = query
//         .innerJoin("bookclub.books as b", "r.book_sn", "b.book_sn")
//         .select([
//           "r.reply_sn",
//           "r.reply_content",
//           "r.parent_reply_sn",
//           "r.reply_group_sn",
//           "r.reply_depth",
//           "r.book_sn",
//           "r.user_sn",
//           "r.update_date as reply_update_date",
//           "b.book_sn",
//           "b.title",
//           "b.author",
//           "b.publisher",
//           "b.book_isbn",
//           "b.book_cover",
//           "b.book_description",
//           "b.book_type",
//           "b.wish_yn",
//           "b.rely_book_yn",
//           "b.book_category",
//           "b.update_date as book_update_date",
//         ])
//         .where("r.book_sn", "=", Number(book_sn))
//         .orderBy("r.reply_sn", "asc");
//     }

//     if (user_sn) {
//       query = query
//         .innerJoin("bookclub.users as u", "r.user_sn", "u.user_sn")
//         .select([
//           "r.reply_sn",
//           "r.reply_content",
//           "r.parent_reply_sn",
//           "r.reply_group_sn",
//           "r.reply_depth",
//           "r.book_sn",
//           "r.user_sn",
//           "r.update_date as reply_update_date",
//           "u.user_name",
//           "u.user_id",
//           "u.profile_image",
//           "u.update_date as user_update_date",
//         ])
//         .where("r.user_sn", "=", Number(user_sn))
//         .orderBy("r.reply_sn", "asc");
//     }

//     const replyList = await query.execute();
//     return NextResponse.json(replyList);
//   } catch (e) {
//     if (e instanceof Error) {
//       return NextResponse.json({ error: e.message }, { status: 500 });
//     }
//   }
// }

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const reply_content = formData.get("reply_content")?.toString() ?? "";
    const book_sn = Number(formData.get("book_sn"));
    const user_sn = Number(formData.get("user_sn"));

    const parent_reply_sn = formData.get("parent_reply_sn") ? Number(formData.get("parent_reply_sn")) : null;

    if (!book_sn || !user_sn) {
      return NextResponse.json({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    // 원댓글
    if (!parent_reply_sn) {
      const inserted = await db
        .insertInto("bookclub.reply")
        .values({
          reply_content,
          parent_reply_sn: null,
          reply_group_sn: null, // 임시
          reply_depth: 0,
          book_sn,
          user_sn,
          update_date: new Date(),
        })
        .returning(["reply_sn"])
        .executeTakeFirst();

      if (!inserted) throw new Error("댓글 생성 실패");

      // group = 자기 자신
      await db
        .updateTable("bookclub.reply")
        .set({ reply_group_sn: inserted.reply_sn })
        .where("reply_sn", "=", inserted.reply_sn)
        .execute();

      return NextResponse.json({ success: true });
    }

    // 대댓글
    const parent = await db
      .selectFrom("bookclub.reply")
      .select(["reply_group_sn", "reply_depth"])
      .where("reply_sn", "=", parent_reply_sn)
      .executeTakeFirst();

    if (!parent) {
      return NextResponse.json({ error: "부모 댓글이 존재하지 않습니다." }, { status: 400 });
    }

    await db
      .insertInto("bookclub.reply")
      .values({
        reply_content,
        parent_reply_sn,
        reply_group_sn: parent.reply_group_sn,
        reply_depth: (parent.reply_depth ?? 0) + 1,
        book_sn,
        user_sn,
        update_date: new Date(),
      })
      .execute();

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const reply_sn = Number(formData.get("reply_sn"));

    const reply_content = formData.get("reply_content")?.toString() ?? "";
    const book_sn = Number(formData.get("book_sn"));
    const user_sn = Number(formData.get("user_sn"));

    if (!reply_sn || !book_sn || !user_sn || !reply_content) {
      return NextResponse.json({ error: "필수 값이 누락되었습니다." }, { status: 400 });
    }

    await db
      .updateTable("bookclub.reply")
      .set({
        reply_content,
        update_date: new Date(),
      })
      .where("reply_sn", "=", reply_sn)
      .where("user_sn", "=", user_sn)
      .execute();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Unknown error", { status: 500 });
  }
}
