import React from "react";
import SectionTitle from "../common/section-title";

const ManagementSection = () => {
  return (
    <div>
      {/* 사용자 관리 */}
      <div>
        <SectionTitle title="사용자 관리" />
      </div>
      {/* 공지글 관리 */}
      <div>
        <SectionTitle title="공지글 관리" />
      </div>
    </div>
  );
};

export default ManagementSection;
