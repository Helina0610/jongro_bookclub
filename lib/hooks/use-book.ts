"use client";

import * as React from "react";
import type { BooksResponse } from "@/database/types/books";

type UseBooksParams = {
  bookSn?: string | null;
  title?: string | null;
  wishYn?: string | null;
  bookType?: string | null;
  rely_book_yn?: string | null;
};

export function useBooks({ title, wishYn, bookType, bookSn, rely_book_yn }: UseBooksParams) {
  const [books, setBooks] = React.useState<BooksResponse[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchBooks = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (title) params.append("title", title);
      if (wishYn) params.append("wishYn", wishYn);
      if (bookType) params.append("bookType", bookType);
      if (bookSn) params.append("bookSn", bookSn);

      const res = await fetch(`/api/book?${params.toString()}`);

      if (!res.ok) {
        throw new Error("책 목록 조회 실패");
      }

      const data: BooksResponse[] = await res.json();
      setBooks(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [title, wishYn, bookType, bookSn]);

  React.useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    refetch: fetchBooks,
  };
}
