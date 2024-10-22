"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createRequest } from "@/actions/userRequests";
import { redirect } from "next/navigation";


const SignupForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPass") as string;

        if (!name || !email || !password || !confirmPassword) {
            return toast({
                variant: "destructive",
                title: "Invalid inputs",
                description: "Please provide all the credentials",
            });
        }

        if(password !== confirmPassword) {
            return toast({
                variant: "destructive",
                title: "Invalid inputs",
                description: "Passwords do not match",
            });
        }
        setIsLoading(true);
        try {
            const data = { name, email: email.toLowerCase(), password };
            const res = await createRequest(data);

            if (!res.success) {
                return toast({
                    variant: "destructive",
                    title: "Error",
                    description: res.message,
                });
            }   
            redirect("/login");
        } catch (error) {
        console.log(error);
        }
    };
    
    return (
        <form
            className="grid w-full items-center gap-4"
            onSubmit={handleSignup}
            >
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
            </div>    
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
            </div>
            <div>
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="confirmPass" type="password" name="confirmPass" />
            </div>

            <Button type="submit" disabled={isLoading} className="px-8 w-min">
                {isLoading ? "loading..." : "Make Request"}
            </Button>

            <div>
                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </form>
    );
;}

export default SignupForm;