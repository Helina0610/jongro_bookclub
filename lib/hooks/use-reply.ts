// lib/hooks/use-reply.ts
import React from "react";
import type { PaginationResponse } from "@/database/types/pagination";
import type { ReplyBooksResponse, ReplyUsersResponse } from "@/database/types/reply";

interface UseReplyParams {
  bookSn?: string;
  userSn?: string;
  enabled?: boolean;
  page: number;
  pageSize: number;
}

type UseReplyReturn<T> = {
  replyList: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  pagination: PaginationResponse | null;
};

export function useReply<T extends ReplyUsersResponse | ReplyBooksResponse>({
  bookSn,
  userSn,
  page = 1,
  pageSize = 10,
  enabled = true,
}: UseReplyParams): UseReplyReturn<T> {
  const [replyList, setReplyList] = React.useState<T[] | null>(null);
  const [pagination, setPagination] = React.useState<PaginationResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchReply = React.useCallback(async () => {
    // 조건이 하나도 없으면 호출 X
    if (!bookSn && !userSn) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      let url = "/api/reply";
      if (bookSn) {
        params.set("book_sn", bookSn);
        url = `${url}/user`; // booksn을 조건으로 reply와 user 정보 가져오기
      }
      if (userSn) {
        params.set("user_sn", userSn);
        url = `${url}/book`; // userSN 을 조건으로 reply 와 book 정보 가져오기
      }

      params.set("page", String(page));
      params.set("pageSize", String(pageSize));

      const res = await fetch(`${url}?${params.toString()}`);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "댓글 조회 실패");
      }

      const data = await res.json();
      setReplyList(data.list);
      setPagination(data.pagination);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [bookSn, userSn, page, pageSize]);

  React.useEffect(() => {
    if (enabled) {
      fetchReply();
    }
  }, [enabled, fetchReply]);

  return { replyList, pagination, loading, error, refetch: fetchReply };
}
