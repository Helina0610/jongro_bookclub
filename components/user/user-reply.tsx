"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { ReplyBooksResponse } from "@/database/types/reply";
import { useReply } from "@/lib/hooks/use-reply";
import PaginationComponent from "@/lib/pagination-component";
import { formatDateTime } from "@/lib/utils";

const UserReply = () => {
  const { data: session } = useSession();
  const user_sn = session?.user?.id;

  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const { replyList, pagination, loading, error } = useReply<ReplyBooksResponse>({
    userSn: user_sn,
    page,
    pageSize,
  });

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;
  if (!replyList || replyList.length === 0) return <p>댓글이 없습니다.</p>;

  return (
    <Card>
      <CardTitle className="px-6 pt-6">My Log</CardTitle>

      <CardContent className="space-y-4">
        {replyList.map((reply) => (
          <div key={reply.reply_sn} className="flex gap-4 rounded-lg border p-3 hover:bg-muted/50 transition">
            <div className="relative w-20 shrink-0 overflow-hidden rounded-md aspect-2/3">
              <Image
                src={reply.book_cover || "/bookcover/default.jpg"}
                alt={reply.title ?? ""}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium">{reply.title}</div>
              <p className="text-sm text-muted-foreground line-clamp-4">{reply.reply_content}</p>
              <span className="text-xs text-muted-foreground">{formatDateTime(reply.reply_update_date)}</span>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {pagination && <PaginationComponent page={page} totalPages={pagination.totalPages} onPageChange={setPage} />}
      </CardContent>
    </Card>
  );
};

export default UserReply;
