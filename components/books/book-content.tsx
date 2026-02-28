"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ReplyResponse } from "@/database/types/reply";
import { useBooks } from "@/lib/hooks/use-book";
import { EditReply } from "../reply/reply-item";
import ReplyList from "../reply/reply-list";
import { Button } from "../ui/button";

type BookContentType = {
  bookSn: string;
};

const BookContent = ({ bookSn }: BookContentType) => {
  const { data: session } = useSession();
  const [replyList, setReplyList] = React.useState<ReplyResponse[] | null>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const user_sn = session?.user?.id;

  const { books } = useBooks({ bookSn: bookSn });

  const fetchReply = React.useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.set("book_sn", bookSn);
      if (user_sn) params.set("use_sn", user_sn);

      const res = await fetch(`/api/reply?${params.toString()}`, {
        method: "GET",
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error ?? "저장 실패");
        return;
      }

      const replys = await res.json();
      setReplyList(replys);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [bookSn, user_sn]);

  React.useEffect(() => {
    fetchReply();
  }, [fetchReply]);

  if (books.length === 0) return;
  const book = books[0];
  const { title, author, publisher, book_cover, book_category, book_description, wish_yn, book_type } = book;
  const tags = book_category?.split(">") ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="relative w-80 aspect-2/3 overflow-hidden rounded-lg">
            <Image src={book_cover ?? ""} alt={title ?? ""} fill className="object-cover" />
          </div>
        </div>

        {/* Book Info */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <Button variant={"ghost"}>
              <Heart className="h-5 w-5" fill={wish_yn === "Y" ? "currentColor" : "none"} />
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            {author} · {publisher}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="default">{book_type}</Badge>
            <Separator orientation="vertical" />
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="leading-relaxed text-muted-foreground text-sm">2026-02-14</p>
          <Separator className="my-2" />
          <div>
            <h2 className="text-xl font-semibold mb-2">책 소개</h2>
            <p className="leading-relaxed text-muted-foreground">{book_description}</p>
          </div>
        </div>
      </div>
      {/* 댓글 작성 */}
      {user_sn && <EditReply bookSn={book.book_sn} userSn={user_sn} />}

      {/* 댓글 리스트 */}
      {replyList && <ReplyList replyList={replyList} />}
    </div>
  );
};

export default BookContent;
