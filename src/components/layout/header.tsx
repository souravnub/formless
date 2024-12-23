import React from "react";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import NotificationDialog from "../domains/notifications/notificationDialog";
import { TTSButton } from "../TTSContext";

const links = [
  { name: "Overview", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Forms", href: "/admin/forms" },
  { name: "Submissions", href: "/admin/submissions" },
  { name: "Requests", href: "/admin/requests" },
  { name: "Reports", href: "/admin/reports" },
  { name: "Logs", href: "/admin/logs" },
];

const Header = async () => {
  const a = await auth();
  return (
    <div className="bg-accent/50">
      <header className="py-3 flex justify-between items-center container">
        <div className="text-lg font-semibold">Dashboard</div>
        <TTSButton />
        <ul className="flex gap-8">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Button className="px-0" asChild variant="link">
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{a?.user.name}</span>
          <NotificationDialog />
          <LogoutButton />
        </div>
      </header>
    </div>
  );
};

export default Header;
