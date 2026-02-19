import { SessionProvider } from "next-auth/react";
import CommunitySection from "@/components/community/community-section";

const CommunityPage = () => {
  return (
    <SessionProvider>
      <CommunitySection />
    </SessionProvider>
  );
};

export default CommunityPage;
