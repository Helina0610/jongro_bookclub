import type { ColumnType, Generated } from "kysely";

export type UsersTable = {
  user_sn: Generated<number>;
  user_id: string;
  user_pw: string;
  profile_image: string;
  profile_context: string;
  profile_sns: string;
  replay_book_sn: string;
  update_date: ColumnType<Date, string | undefined, never>;
};

export interface UsersResponse {
  user_sn: string;
  user_id: string;
  user_pw: string;
  profile_image: string | null;
  profile_context: string | null;
  profile_sns: string | null;
  replay_book_sn: string | null;
  update_date: string | null;
}
