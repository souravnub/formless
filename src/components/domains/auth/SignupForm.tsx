"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createRequest, getRequestByEmail } from "@/actions/userRequests";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/actions/users";

const SignupForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPass") as string;
    const reqAlreadyExists = await getRequestByEmail(email);
    const userAlreadyExists = await getUserByEmail(email);

    if (
      reqAlreadyExists &&
      "email" in reqAlreadyExists &&
      reqAlreadyExists.email === email
    ) {
      return toast({
        variant: "destructive",
        title: "Invalid inputs",
        description: "User with this email already exists",
      });
    }

    if (
      userAlreadyExists &&
      "email" in userAlreadyExists &&
      userAlreadyExists.email === email
    ) {
      return toast({
        variant: "destructive",
        title: "Invalid inputs",
        description: "User with this email already exists",
      });
    }

    if (!name || !email || !password || !confirmPassword) {
      return toast({
        variant: "destructive",
        title: "Invalid inputs",
        description: "Please provide all the credentials",
      });
    }

    if (password !== confirmPassword) {
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

      if (!res?.success) {
        return toast({
          variant: "destructive",
          title: "Error",
          description: res?.message,
        });
      }

      toast({
        variant: "default",
        title: "Success",
        description: "Successfully created request",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="grid w-full items-center gap-4" onSubmit={handleSignup}>
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
        <div className="relative">
          <Input id="password" type={passwordType} name="password" />
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
      </div>
      <div>
        <Label htmlFor="password">Confirm Password</Label>
        <div className="relative">
          <Input id="confirmPass" type={passwordType} name="confirmPass" />
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
};

export default SignupForm;
