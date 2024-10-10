//REFERENCES
// How to copy text to clipboard https://www.geeksforgeeks.org/how-to-copy-text-to-the-clipboard-in-next-js/ LINE 43

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
import { useToast } from "@/hooks/use-toast";

type RoleType = "SUPERVISOR" | "USER" | "ADMIN";
interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}

const CopyPastUserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      data.data && setUsers(data.data);
    };
    fetchData();
  }, []);

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast({
        description: `Copied "${text}" to clipboard`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy text to clipboard",
      });
    }
  };
  const tc = (text: string) => {
    return <TableCell onClick={() => copyToClipboard(text)}>{text}</TableCell>;
  };

  return (
    <Card className="mb-2">
      <CardHeader>Users to copy and paste</CardHeader>
      <CardContent>
        <Table className="border">
          <TableCaption>All Users</TableCaption>
          <TableHeader className="bg-accent/70">
            <TableRow>
              <TableHead className="pl-5">Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users.map(({ id, name, email, role }) => (
                <TableRow key={id}>
                  {tc(name)}
                  {tc(email)}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CopyPastUserTable;