import { ReactNode } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { LogoutButton } from "@/components/LogoutButton";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TTS from "@/components/TTS";
import { TTSButton } from "@/components/TTSContext";

const links = [
  { name: "Overview", href: "/user" },
  { name: "Forms", href: "/user/forms" },
  { name: "Submissions", href: "/user/submissions" },
];

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const a = await auth();

  return (
    <TTS>
      <header className="bg-accent/60 py-3">
        <div className="container flex justify-between items-center">
          <Link href={"/user"} className="text-lg font-semibold">
            Dashboard
          </Link>
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
            <LogoutButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </TTS>
  );
};

export default UserLayout;
