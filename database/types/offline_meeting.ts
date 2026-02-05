import type { ColumnType, Generated } from "kysely";

export type OfflineMeetingTable = {
  meeting_sn: Generated<number>;
  meeting_date: ColumnType<Date, string | undefined, never>;
  meeting_location: string;
  korean_book_sn: string;
  other_book_sn: string;
  join_user_sn: string;
};

export interface OfflineMeetingResponse {
  meeting_sn: number;
  meeting_date: string | null;
  meeting_location: string | null;
  korean_book_sn: string | null;
  other_book_sn: string | null;
  join_user_sn: string | null;
}
