import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { UsersTable } from "@/database/types/users";
import type { OfflineMeetingTable } from "./types/offline_meeting";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  }),
});

export const db = new Kysely<BookClubDatabase>({
  dialect,
});

export interface BookClubDatabase {
  "bookclub.user": UsersTable;
  "bookclub.offline_meeting": OfflineMeetingTable;
}
