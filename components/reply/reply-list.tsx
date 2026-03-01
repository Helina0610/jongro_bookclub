import type { ReplyUsersResponse } from "@/database/types/reply";
import PaginationComponent from "@/lib/pagination-component";
import ReplyItem from "./reply-item";

type ReplyListType = {
  replyList: ReplyUsersResponse[];
  refetch: () => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const ReplyList = ({ replyList, refetch, page, totalPages, onPageChange }: ReplyListType) => {
  return (
    <div className="flex flex-col gap-4">
      {replyList.map((reply) => (
        <ReplyItem key={reply.reply_sn} reply={reply} refetch={refetch} />
      ))}

      <PaginationComponent page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};
export default ReplyList;
