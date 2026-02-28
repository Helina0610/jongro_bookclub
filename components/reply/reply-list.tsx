import type { ReplyResponse } from "@/database/types/reply";
import ReplyItem from "./reply-item";

type ReplyListType = {
  replyList: ReplyResponse[];
};

const ReplyList = ({ replyList }: ReplyListType) => {
  return (
    <div className="flex flex-col gap-4">
      {replyList.map((reply) => (
        <ReplyItem key={reply.reply_sn} reply={reply} />
      ))}
    </div>
  );
};

export default ReplyList;
