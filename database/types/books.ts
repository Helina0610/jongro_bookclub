import type { ColumnType, Generated } from "kysely";

export type BooksTable = {
  book_sn: Generated<number>;
  title: ColumnType<string | null, string | null, string | null>;
  author: ColumnType<string | null, string | null, string | null>;
  ea_isbn: ColumnType<string | null, string | null, string | null>;
  publihser: ColumnType<string | null, string | null, string | null>;
  subject: ColumnType<string | null, string | null, string | null>;
  title_url: ColumnType<string | null, string | null, string | null>;
  book_tb_cnt_url: ColumnType<string | null, string | null, string | null>;
  book_introduction_url: ColumnType<string | null, string | null, string | null>;
  book_summary_url: ColumnType<string | null, string | null, string | null>;
  book_type: ColumnType<string | null, string | null, string | null>;
  wish_yn: ColumnType<string | null, string | null, string | null>;
  rely_book_yn: ColumnType<string | null, string | null, string | null>;
  publish_date: ColumnType<Date, Date, Date>;
  update_date: ColumnType<Date, Date, Date>;
};

export interface BooksResponse {
  book_sn: string;
  title: string | null;
  author: string | null;
  ea_isbn: string | null;
  publihser: string | null;
  subject: string | null;
  title_url: string | null;
  book_tb_cnt_url: string | null;
  book_introduction_url: string | null;
  book_summary_url: string | null;
  book_type: string | null;
  wish_yn: string | null;
  rely_book_yn: string | null;
  publish_date: string | null;
  update_date: string | null;
}
