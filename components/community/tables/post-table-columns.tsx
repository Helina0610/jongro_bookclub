"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { PostsUsersResponse } from "@/database/types/post";

export const PostsTableColumns: ColumnDef<PostsUsersResponse>[] = [
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
    accessorKey: "post_title",
    header: "제목",
  },
  {
    accessorKey: "post_content",
    header: "내용",
  },
  {
    accessorKey: "update_date",
    header: "작성일자",
  },
  {
    accessorKey: "user_id",
    header: "작성자",
  },
];
