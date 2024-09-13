"use client";
import { deleteUser, searchUsers } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RoleType } from "@prisma/client";
import React, { FormEvent, useEffect, useState } from "react";

const RemoveUserPage = () => {
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<{ id: string; name: string; email: string; password: string; role: RoleType; }[] | undefined>(undefined);
    const [search, setSearch] = useState("");
    
    const { toast } = useToast();


    const fetchUsers = async (query: string) => {
        const res = await searchUsers(query);
        console.log(res);
        if (res.success) {
            setUsers(res.data);
        } else {
            toast({
                variant: "destructive",
                description: res.message,
            });
        };
    };

    const handleSearch = (query: string) => {
        fetchUsers(query);
    };

    useEffect(() => {
        if(search) {
            handleSearch(search);
        } else {
            setUsers([]);
        }
    }, [search]);

    async function handleRemoveUser(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        const r = await deleteUser(userId);
        setIsLoading(false);

        toast({
            variant: !r.success ? "destructive" : "default",
            description: r.message,
        });
    }

    return (
        <form
            onSubmit={handleRemoveUser}
            className="container max-w-sm space-y-2 pt-10">
            <div>
                <Label htmlFor="search">Search User</Label>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    name="search"
                    className="w-full p-2 border rounded"
                    placeholder="Search user by name or email"
                />
                
                <Label htmlFor="userId">Select User</Label>
                <select
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full p-2 border rounded"
                
                >
                <option value="">Select a user</option>
                {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name} | {user.email}
                    </option>
                ))}
                </select>
            </div>

            <Button disabled={isLoading || !userId}>
                {isLoading ? "Removing user..." : "Remove user"}
            </Button>
        </form>

        


        
    );   
};


export default RemoveUserPage;
