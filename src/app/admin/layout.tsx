import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";
import { auth } from "@/lib/auth";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const links = [
    { name: "Overview", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Forms", href: "/admin/forms" },
    { name: "Submissions", href: "/admin/submissions" },
    { name: "Reports", href: "/admin/reports" },
];

const AdminPageRootLayout = async ({ children }: { children: ReactNode }) => {
    const a = await auth();
    return (
        <div>
            <header className="py-3 flex justify-between items-center container">
                <div className="text-lg font-semibold">Dashboard</div>

                <ul className="flex gap-8">
                    {links.map((link) => {
                        return (
                            <li>
                                <Button
                                    className="px-0 text-base"
                                    asChild
                                    variant="link">
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
            </header>

            {children}
        </div>
    );
};

export default AdminPageRootLayout;
