import type { ColumnType, Generated } from "kysely";

export type BooksTable = {
  book_sn: Generated<number>;
  title: ColumnType<string | null, string | null, string | null>;
  author: ColumnType<string | null, string | null, string | null>;
  book_isbn: ColumnType<string | null, string | null, string | null>;
  publisher: ColumnType<string | null, string | null, string | null>;
  book_cover: ColumnType<string | null, string | null, string | null>;
  book_description: ColumnType<string | null, string | null, string | null>;
  book_type: ColumnType<string | null, string | null, string | null>;
  wish_yn: ColumnType<string | null, string | null, string | null>;
  rely_book_yn: ColumnType<string | null, string | null, string | null>;
  book_category: ColumnType<string | null, string | null, string | null>;
  update_date: ColumnType<Date, Date, Date>;
};

export interface BooksResponse {
  book_sn: string;
  title: string | null;
  author: string | null;
  book_isbn: string | null;
  publisher: string | null;
  book_cover: string | null;
  book_description: string | null;
  book_type: string | null;
  wish_yn: string | null;
  rely_book_yn: string | null;
  book_category: string | null;
  update_date: string | null;
}
