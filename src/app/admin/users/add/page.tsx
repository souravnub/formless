"use client";
import { createUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import React, { FormEvent, useState } from "react";

const AddUserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();

    async function handleAddUser(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        const res = await createUser({
            name,
            email,
            role: role as "USER" | "SUPERVISOR",
            password,
        });
        setIsLoading(false);

        toast({
            variant: !res.success ? "destructive" : "default",
            description: res.message,
        });
    }

    return (
        <form
            onSubmit={handleAddUser}
            className="container max-w-sm space-y-2 pt-10">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                />
            </div>

            <div>
                <Label htmlFor="pass">Password</Label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="pass"
                    name="password"
                />
            </div>

            <div>
                <Label>Role</Label>
                <RadioGroup
                    name="role"
                    defaultValue={role}
                    onValueChange={setRole}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SUPERVISOR" id="SUPERVISOR" />
                        <Label htmlFor="SUPERVISOR">Supervisor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="USER" id="USER" />
                        <Label htmlFor="USER">User</Label>
                    </div>
                </RadioGroup>
            </div>

            <Button disabled={isLoading} className="!mt-6">
                {!isLoading ? "Create user" : "Creating User..."}
            </Button>
        </form>
    );
};

export default AddUserPage;
