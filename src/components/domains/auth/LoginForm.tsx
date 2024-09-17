"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLoginFormAction(e: FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!email || !password) {
            return toast({
                variant: "destructive",
                title: "Invalid inputs",
                description: "Please provide all the credentials",
            });
        }
        setIsLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
        });
        setIsLoading(false);
        if (res?.error) {
            return toast({
                variant: "destructive",
                title: "Invalid Credentials",
                description:
                    "The credentials provided were incorrect. Please Try with valid credentials",
            });
        }
    }

    return (
        <form
            className="grid w-full items-center gap-4"
            onSubmit={handleLoginFormAction}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="name" name="email" />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
            </div>

            <Button type="submit" disabled={isLoading} className="px-8 w-min">
                {isLoading ? "loading..." : "Login"}
            </Button>
        </form>
    );
};

export default LoginForm;
