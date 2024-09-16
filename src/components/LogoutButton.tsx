'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    const handleLogout = () => {
        signOut();
    };

    return <Button onClick={handleLogout}>Log out</Button>;
}

export { LogoutButton };