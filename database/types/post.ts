import type { ColumnType, Generated } from "kysely";

export type PostsTable = {
  post_sn: Generated<number>;
  post_title: ColumnType<string | null, string | null, string | null>;
  post_content: ColumnType<string | null, string | null, string | null>;
  post_image: ColumnType<string | null, string | null, string | null>;
  user_sn: ColumnType<number | null, number | null, number | null>;
  update_date: ColumnType<Date, Date, Date>;
};

export interface PostsUsersResponse {
  id: number;
  post_sn: number;
  post_title: string | null;
  post_content: string | null;
  post_image?: string | null;
  update_date: string | null;
  user_sn: string | null;
  user_id: string | null;
}
