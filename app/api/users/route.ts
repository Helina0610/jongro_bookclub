import type { Updateable } from "kysely";
import { NextResponse } from "next/server";
import { db } from "@/database/postgres";
import type { UsersTable } from "@/database/types/users";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const user_list = await db.selectFrom("bookclub.user").selectAll().execute();
    return NextResponse.json(user_list);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(`${e.name}: ${e.message}`, { status: 503 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const user_id = formData.get("user_id");
    const user_name = formData.get("user_name");
    const user_pw = formData.get("user_pw"); //TODO 암호화
    const profile_image = formData.get("profile_image");
    const profile_context = formData.get("profile_context");
    const profile_sns = formData.get("profile_sns");

    // 필수 값 검증
    if (typeof user_id !== "string" || typeof user_pw !== "string" || typeof user_name !== "string") {
      return new Response("Invalid user_id or user_pw", { status: 400 });
    }

    // ✅ File → Uint8Array 변환
    let safeProfileImage: Uint8Array | null = null;

    if (profile_image instanceof File) {
      const buffer = await profile_image.arrayBuffer();
      safeProfileImage = new Uint8Array(buffer);
    }

    // optional string 값
    const safeProfileContext = typeof profile_context === "string" ? profile_context : null;
    const safeProfileSns = typeof profile_sns === "string" ? profile_sns : null;

    await db
      .insertInto("bookclub.user")
      .values({
        user_id,
        user_pw,
        user_name,
        profile_image: safeProfileImage,
        profile_context: safeProfileContext,
        profile_sns: safeProfileSns,
        update_date: new Date(),
      })
      .execute();

    return Response.json({ message: "User created" }, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const user_sn_raw = formData.get("user_sn");
    const user_id = formData.get("user_id");
    const user_pw = formData.get("user_pw");
    const profile_image = formData.get("profile_image");
    const profile_context = formData.get("profile_context");
    const profile_sns = formData.get("profile_sns");

    // user_sn 검증
    if (typeof user_sn_raw !== "string") {
      return new Response("Invalid user_sn", { status: 400 });
    }

    const user_sn = Number(user_sn_raw);
    if (Number.isNaN(user_sn)) {
      return new Response("user_sn must be a number", { status: 400 });
    }

    // 필수 값 검증
    if (typeof user_id !== "string" || typeof user_pw !== "string") {
      return new Response("Invalid user_id or user_pw", { status: 400 });
    }

    // ✅ DB UPDATE 전용 타입
    const updateValues: Updateable<UsersTable> = {
      user_id,
      user_pw,
      update_date: new Date(),
    };

    // File → Uint8Array (보낸 경우만)
    if (profile_image instanceof File) {
      const buffer = await profile_image.arrayBuffer();
      updateValues.profile_image = new Uint8Array(buffer);
    }

    if (typeof profile_context === "string") {
      updateValues.profile_context = profile_context;
    }

    if (typeof profile_sns === "string") {
      updateValues.profile_sns = profile_sns;
    }

    await db.updateTable("bookclub.user").set(updateValues).where("bookclub.user.user_sn", "=", user_sn).execute();

    return Response.json({ message: "User updated" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Unknown error", { status: 500 });
  }
}
