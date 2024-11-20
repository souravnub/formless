"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

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
      redirect: false,
    });
    if (res?.error) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description:
          "The credentials provided were incorrect. Please Try with valid credentials",
      });
    }
    router.push("/");
  }

  return (
    <form
      className="grid w-full items-center gap-4"
      onSubmit={handleLoginFormAction}
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="name" name="email" disabled={isLoading} />
      </div>
      <div className="relative">
        <Label htmlFor="password">Password</Label>

        <Input
          className="w-full"
          disabled={isLoading}
          id="password"
          type={passwordType}
          name="password"
        />

        <Label
          onClick={() => {
            setHidden(!hidden);
            setPasswordType(hidden ? "text" : "password");
          }}
          className=" absolute right-2 bottom-1 hover:cursor-pointer hover:bg-black hover:text-white p-2  rounded-xl"
        >
          {hidden ? "show" : "hide"}
        </Label>
      </div>

      <Button type="submit" disabled={isLoading} className="px-8 w-min">
        {isLoading ? "loading..." : "Login"}
      </Button>

      <div>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
