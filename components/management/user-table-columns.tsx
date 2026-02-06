"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { UsersResponse } from "@/database/types/users";

export const UserTableColumns: ColumnDef<UsersResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()} // ✅ 반드시 추가
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: "사용자 ID",
    cell: ({ row }) => {
      return (
        <a className="hover:underline hover:underline-offset-2" href={`/users/${row.original.user_id}`}>
          {row.original.user_id}
        </a>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "user_name",
    header: "사용자 이름",
  },
  {
    accessorKey: "profile_image",
    header: "프로필 사진",
  },
  {
    accessorKey: "profile_sns",
    header: "sns",
  },
  {
    accessorKey: "replay_book_sn",
    header: "릴레이독서",
  },
  {
    accessorKey: "update_date",
    header: "갱신일",
  },
];
