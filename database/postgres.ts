import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { UsersTable } from "@/database/types/users";
import type { BooksTable } from "./types/books";
import type { OfflineMeetingTable } from "./types/offline_meeting";
import type { PostsTable } from "./types/post";
import type { ReplyTable } from "./types/reply";

export const database_pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const dialect = new PostgresDialect({
  pool: database_pool,
});

export const db = new Kysely<BookClubDatabase>({
  dialect,
});

export interface BookClubDatabase {
  "bookclub.users": UsersTable;
  "bookclub.offline_meeting": OfflineMeetingTable;
  "bookclub.books": BooksTable;
  "bookclub.posts": PostsTable;
  "bookclub.reply": ReplyTable;
}
