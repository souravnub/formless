//REFERENCES
// How to copy text to clipboard https://www.geeksforgeeks.org/how-to-copy-text-to-the-clipboard-in-next-js/ LINES 40-45
// CHATGPT prompt: How to make <TableBody> scrollable? LINES 60-80
// How to manipulate cursor in Tailwind https://tailwindcss.com/docs/cursor tc function LINE 56
// CHATPGT prompt: i want to show admin roles first, then supervisors, then employees,if there are multiple people per role I want to sort by name
// CHATGPT prompt: What are all the props for the toast from sonner shadcn? LINES 47-55
"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/actions/users";
import { toast, Toaster } from "sonner";

type RoleType = "SUPERVISOR" | "USER" | "ADMIN";
interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}

const CopyPastUserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      data.data && setUsers(data.data);
    };
    fetchData();
  }, []);

  const tc = (text: string) => {
    return (
      <TableCell
        className="relative hover:bg-black hover:text-white hover:cursor-pointer border border-white rounded-full"
        onClick={() => {
          navigator.clipboard.writeText(text);
          toast(`Copied  "${text}"  to clipboard`, {
            duration: 1300,
            style: {
              fontSize: "18px",
              backgroundColor: "black",
              color: "white",
              fontFamily: "sans-serif",
            },
          });
        }}
      >
        <div className="flex flex-row justify-between items-center">{text}</div>
      </TableCell>
    );
  };

  return (
    <Card className="mb-2 min-w-[90%]">
      <CardHeader>Users to copy and paste</CardHeader>
      <CardContent>
        <div className="overflow-y-auto max-h-[600px]">
          <Table className="border">
            <TableCaption>All Users</TableCaption>
            <TableHeader className="bg-accent/70">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                [...users] // Copy the users array to avoid mutating the original
                  .sort((a, b) => {
                    const roleOrder = { ADMIN: 1, SUPERVISOR: 2, USER: 3 }; //create custom order object to sort by
                    const diff = roleOrder[a.role] - roleOrder[b.role];
                    if (diff !== 0) return diff; // if roles are different, return the difference

                    return a.name.localeCompare(b.name); // if roles are the same, sort by name
                  })
                  .map(({ id, name, email, role }) => (
                    <TableRow key={id}>
                      {tc(name)}
                      {tc(email)}
                      {tc(role)}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default CopyPastUserTable;
