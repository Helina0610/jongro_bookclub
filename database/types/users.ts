import type { ColumnType, Generated } from "kysely";

export type UsersTable = {
  user_sn: Generated<number>;
  user_id: ColumnType<string, string, string>;
  user_name: ColumnType<string, string, string>;
  user_pw: ColumnType<string, string, string>;
  profile_image: ColumnType<Uint8Array | null, Uint8Array | null, Uint8Array | null>;
  profile_context: ColumnType<string | null, string | null, string | null>;
  profile_sns: ColumnType<string | null, string | null, string | null>;
  replay_book_sn: ColumnType<number | null, number | null, number | null>;
  update_date: ColumnType<Date, Date, Date>;
};

export interface UsersResponse {
  user_sn: string;
  user_id: string;
  user_name: string;
  user_pw: string;
  profile_image: string | null;
  profile_context: string | null;
  profile_sns: string | null;
  replay_book_sn: string | null;
  update_date: string;
}
