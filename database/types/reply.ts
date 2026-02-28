import type { ColumnType, Generated } from "kysely";
import type { UsersResponse } from "./users";

export type ReplyTable = {
  reply_sn: Generated<number>;
  reply_content: ColumnType<string | null, string | null, string | null>;
  parent_reply_sn: ColumnType<number | null, number | null, number | null>;
  reply_group_sn: ColumnType<number | null, number | null, number | null>;
  reply_depth: ColumnType<number | null, number | null, number | null>;
  book_sn: ColumnType<number | null, number | null, number | null>;
  user_sn: ColumnType<number | null, number | null, number | null>;
  update_date: ColumnType<Date, Date, Date>;
};

export interface ReplyResponse extends UsersResponse {
  reply_sn: number;
  reply_content: string | null;
  parent_reply_sn: number | null;
  reply_group_sn: number | null;
  reply_depth: number | null;
  book_sn: number | null;
  user_sn: string;
  reply_update_date: string;
}
