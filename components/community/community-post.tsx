"use client";
import React from "react";
import type { PostsUsersResponse } from "@/database/types/post";
import TanstackTable from "../common/table/tanstack-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { PostsTableColumns } from "./tables/post-table-columns";

const posts: PostsUsersResponse[] = [
  {
    id: 1,
    post_sn: 1,
    post_title: "2025년도 연말 독서모임 어워즈 결과",
    post_content:
      "한 해 동안 가장 활발히 활동해주신 분들과 인기 도서를 선정했습니다. 참여해주신 모든 분들께 감사드립니다!",
    update_date: "2025.12.13",
    user_id: "홍주",
    user_sn: "1",
  },
  {
    id: 2,
    post_sn: 2,
    post_title: "2026년 1월 독서모임 안내",
    post_content: "2026년 첫 독서모임은 1월 셋째 주에 진행될 예정입니다. 자세한 일정과 장소는 추후 공지하겠습니다.",
    update_date: "2025.12.28",
    user_id: "홍주",
    user_sn: "1",
  },
  {
    id: 3,
    post_sn: 3,
    post_title: "12월 선정 도서 공지",
    post_content: "12월 독서모임 선정 도서는 『눈과 돌멩이』입니다. 미리 읽고 자유롭게 의견을 나눠주세요.",
    update_date: "2025.12.05",
    user_id: "홍주",
    user_sn: "1",
  },
  {
    id: 4,
    post_sn: 4,
    post_title: "독서모임 후기 공유 이벤트",
    post_content: "독서모임 후기를 남겨주신 분들 중 추첨을 통해 소정의 상품을 드립니다. 많은 참여 부탁드려요!",
    update_date: "2025.11.20",
    user_id: "홍주",
    user_sn: "1",
  },
];
const CommunityPost = () => {
  const [selectedPost, setSelectedPost] = React.useState<PostsUsersResponse | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleRowClick = (post: PostsUsersResponse) => {
    setSelectedPost(post);
    setOpen(true);
  };
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-25">제목</TableHead>

            <TableHead className="hidden sm:table-cell">내용</TableHead>
            <TableHead>작성일</TableHead>
            <TableHead className="hidden sm:table-cell text-right">작성자</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.post_sn} onClick={() => handleRowClick(post)}>
              <TableCell className="font-medium">{post.post_title}</TableCell>
              <TableCell className="hidden sm:table-cell">{post.post_content}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{post.update_date}</TableCell>
              <TableCell className="hidden sm:table-cell text-right">{post.user_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedPost && <PostDialog open={open} setOpen={setOpen} post={selectedPost} />}

      {/* <TanstackTable initialColumns={PostsTableColumns} initialData={posts} /> */}

      <div className="h-4" />
    </div>
  );
};

export default CommunityPost;

type PostDialogType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  post: PostsUsersResponse;
};

const PostDialog = ({ open, setOpen, post }: PostDialogType) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader className="space-y-2">
          {/* 제목 */}
          <DialogTitle className="text-lg font-semibold leading-tight">{post.post_title}</DialogTitle>

          {/* 메타 정보 */}
          <DialogDescription className="text-xs text-muted-foreground">
            {post.user_id} · {post.update_date}
          </DialogDescription>
        </DialogHeader>

        {/* 본문 */}
        <div className="mt-4 rounded-md border bg-muted/40 p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{post.post_content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
