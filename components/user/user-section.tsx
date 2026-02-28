"use client";
import { useSession } from "next-auth/react";
import SectionTitle from "@/components/common/section-title";
import UserOfflineMeeting from "./user-offline_meeting";
import UserProfile from "./user-profile";
import UserReply from "./user-reply";

const UserSection = () => {
  const { data: session } = useSession();

  return (
    <div>
      <SectionTitle title={"My Page"} />
      {/* 프로파일 */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 pt-5">
        <UserProfile />
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Stamp List */}
          <UserOfflineMeeting />

          {/* My Log */}
          <UserReply />
        </div>
      </div>
    </div>
  );
};

export default UserSection;
