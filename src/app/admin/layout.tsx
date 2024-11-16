import Header from "@/components/layout/header";
import TTS from "@/components/TTS";
import { ReactNode } from "react";

const AdminPageRootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <TTS>
      <Header />
      <main>{children}</main>
    </TTS>
  );
};

export default AdminPageRootLayout;
