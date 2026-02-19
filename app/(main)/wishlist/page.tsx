import { SessionProvider } from "next-auth/react";
import React from "react";
import WishListSection from "@/components/wish-list/wish-list-section";

const WishListPage = () => {
  return (
    <div>
      <SessionProvider>
        <WishListSection />
      </SessionProvider>
    </div>
  );
};

export default WishListPage;
