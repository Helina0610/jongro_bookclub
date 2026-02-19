import { SessionProvider } from "next-auth/react";
import ManagementSection from "@/components/management/management-section";

const ManagementPage = () => {
  return (
    <SessionProvider>
      <ManagementSection />
    </SessionProvider>
  );
};

export default ManagementPage;
