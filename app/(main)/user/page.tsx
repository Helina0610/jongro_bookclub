import { SessionProvider } from "next-auth/react";
import React from "react";
import UserSection from "@/components/user/user-section";

const UserPage = () => {
  return (
    <SessionProvider>
      <UserSection />
    </SessionProvider>
  );
};

export default UserPage;
