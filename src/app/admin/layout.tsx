import Header from "@/components/layout/header";
import TTS from "@/components/TTS";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";
import { auth } from "@/lib/auth";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const links = [
  { name: "Overview", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Forms", href: "/admin/forms" },
  { name: "Submissions", href: "/admin/submissions" },
  { name: "Reports", href: "/admin/reports" },
  { name: "Requests", href: "/admin/requests" },
  { name: "Logs", href: "/admin/logs" },
];

const AdminPageRootLayout = async ({ children }: { children: ReactNode }) => {
  const a = await auth();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-accent/50">
        <header className="py-3 flex justify-between items-center w-full px-6">
          {/* Left Section */}
          <div className="text-lg font-semibold px-3">Dashboard</div>

          {/* Center Section */}
          <ul className="flex flex-1 justify-center gap-8">
            {links.map((link) => (
              <li key={link.name}>
                <Button className="px-0" asChild variant="link">
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{a?.user.name}</span>
            <LogoutButton />
          </div>
        </header>
      </div>

      {/* Main Content */}
      <TTS>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-grow flex">
            <SidebarTrigger />
            <div className="flex-grow p-6">{children}</div>
          </main>
        </SidebarProvider>
      </TTS>
    </div>
  );
};

export default AdminPageRootLayout;
