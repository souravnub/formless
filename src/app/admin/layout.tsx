import Header from "@/components/layout/header";
import React, { ReactNode } from "react";

const AdminPageRootLayout = async ({ children }: { children: ReactNode }) => {
   return (
      <div>
         <Header />
         <main>{children}</main>
      </div>
   );
};

export default AdminPageRootLayout;
