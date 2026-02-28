import { SessionProvider } from "next-auth/react";
import DashboardSection from "@/components/dashboard/dashboard-section";

const DashBoardPage = () => {
  return (
    <div>
      <SessionProvider>
        <DashboardSection />
      </SessionProvider>
    </div>
  );
};

export default DashBoardPage;
