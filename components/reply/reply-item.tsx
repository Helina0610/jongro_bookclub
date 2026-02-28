"use client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import type { ReplyResponse } from "@/database/types/reply";
import { formatDateTime } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";

type ReplyItemType = {
  reply: ReplyResponse;
};

const ReplyItem = ({ reply }: ReplyItemType) => {
  const [edit, setEdit] = React.useState(false);
  const { data: session } = useSession();

  if (edit) {
    if (!session?.user?.id) return null; // 또는 fallback UI

    return (
      <EditReply
        reply={reply}
        bookSn={reply.book_sn?.toString() ?? ""}
        userSn={session.user.id}
        onSuccess={() => setEdit(false)}
      />
    );
  }

  return (
    <div key={reply.reply_sn} className="flex gap-4">
      <div className="flex flex-col items-center gap-1">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/두산망곰잠옷.jpg" alt={reply.user_name} />
          <AvatarFallback>{reply.user_name?.slice(0, 1) ?? "U"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 rounded-lg border px-4 py-3">
        {/* Row 1: Content + Menu */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-relaxed flex-1">{reply.reply_content}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEdit(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                수정
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Row 2: User + Time */}
        <p className="mt-2 text-xs text-muted-foreground">
          {reply.user_name} · {formatDateTime(reply.reply_update_date)}
        </p>
      </div>
    </div>
  );
};

export default ReplyItem;

type EditReplyType = {
  bookSn: string;
  parentReplySn?: number; // 대댓글 대비 (옵션)
  userSn: string;
  reply?: ReplyResponse;
  onSuccess?: () => void;
};

export const EditReply = ({ bookSn, userSn, reply, onSuccess }: EditReplyType) => {
  const isEdit = Boolean(reply?.reply_sn);
  const [content, setContent] = React.useState(reply?.reply_content ?? "");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (userSn) formData.append("user_sn", userSn);
    formData.append("book_sn", bookSn);

    let res: Response;
    if (isEdit) {
      if (!reply) {
        alert("수정할 댓글 정보가 없습니다.");
        return;
      }

      formData.append("reply_sn", reply.reply_sn.toString());
      res = await fetch("/api/reply", {
        method: "PUT",
        body: formData,
      });
    } else {
      res = await fetch("/api/reply", {
        method: "POST",
        body: formData,
      });
    }

    if (!res.ok) {
      const error = await res.json();
      alert(error.error ?? "저장 실패");
      return;
    }

    alert(isEdit ? "수정되었습니다" : "등록되었습니다");
    onSuccess?.();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/두산망곰잠옷.jpg" alt="@user" />
            </Avatar>
          </div>
          <div className="w-full">
            <InputGroup>
              <InputGroupTextarea
                id="reply_content"
                name="reply_content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>0/280</InputGroupText>
                <InputGroupButton type="submit" variant="default" size="sm" className="ml-auto">
                  {isEdit ? "Update" : "Post"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </form>
    </div>
  );
};
