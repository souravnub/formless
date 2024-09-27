"use client";
import React, { useEffect, useState } from "react";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUsers, deleteUser } from "@/actions/users";
import InputComponent from "@/components/domains/editUser/inputComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/router";

type RoleType = "SUPERVISOR" | "USER" | "ADMIN";
interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}

const UsersPage = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      data.data && setUsers(data.data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  return (
    <div className="container">
      <CustomBreadcrumb
        className="my-3"
        list={[
          { name: "Dashboard", href: "/admin" },
          { name: "Users", href: "/admin/forms" },
        ]}
      />
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-medium items-center">Manage Users</h1>

        <Button asChild className="flex gap-2">
          <Link href={"/admin/users/add"}>Add User</Link>
        </Button>
      </div>
      <Card className="mb-2">
        <CardHeader>Supervisors</CardHeader>
        <CardContent>
          <Table className="border">
            <TableCaption>All Team Supervisors</TableCaption>
            <TableHeader className="bg-accent/70">
              <TableRow>
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users.map(
                  ({ id, name, email, role }) =>
                    role === "SUPERVISOR" && (
                      <TableRow key={id} className="hover:bg-none!important">
                        <TableCell className="font-medium pl-5">
                          {name}
                        </TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{role}</TableCell>
                        <TableCell className="flex gap-2">
                          <Dialog
                            open={openDialog === id}
                            onOpenChange={(open) => {
                              if (!open) setOpenDialog(null);
                            }}
                          >
                            <DialogTrigger
                              onClick={() => setOpenDialog(id)}
                              className="w-full"
                            >
                              Edit
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                              </DialogHeader>
                              <InputComponent
                                id={id}
                                name={name}
                                email={email}
                                refresh={() => router.push("/admin/users")}
                                role={role}
                                closeDialog={() => setOpenDialog(null)}
                              />
                            </DialogContent>
                          </Dialog>
                          <Dialog
                            open={openDelete === id}
                            onOpenChange={(open) => {
                              if (!open) setOpenDelete(null);
                            }}
                          >
                            <DialogTrigger
                              onClick={() => setOpenDelete(id)}
                              className="w-full"
                            >
                              Delete
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                              </DialogHeader>
                              <div>
                                <h1 className="text-4xl font-bold">
                                  Are you sure you want to delete this user?
                                </h1>
                                <ul>
                                  <li>Name: {name}</li>
                                  <li>Email: {email}</li>
                                  <li>Role: {role}</li>
                                </ul>
                                <Button
                                  variant={"destructive"}
                                  onClick={() => {
                                    deleteUser(id);
                                    setOpenDelete(null);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    )
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Employees</CardHeader>
        <CardContent>
          <Table className="border">
            <TableCaption>All Employees</TableCaption>
            <TableHeader className="bg-accent/70">
              <TableRow>
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(
                ({ id, name, email, role }) =>
                  role === "USER" && (
                    <TableRow key={id} className="hover:bg-none!important">
                      <TableCell className="font-medium pl-5">{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{role}</TableCell>
                      <TableCell className="flex gap-2">
                        <Dialog
                          open={openDialog === id}
                          onOpenChange={(open) => {
                            if (!open) setOpenDialog(null);
                          }}
                        >
                          <DialogTrigger
                            onClick={() => setOpenDialog(id)}
                            className="w-full"
                          >
                            Edit
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <InputComponent
                              id={id}
                              name={name}
                              email={email}
                              refresh={() => router.push("/admin/users")}
                              role={role}
                              closeDialog={() => setOpenDialog(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={openDelete === id}
                          onOpenChange={(open) => {
                            if (!open) setOpenDelete(null);
                          }}
                        >
                          <DialogTrigger
                            onClick={() => setOpenDelete(id)}
                            className="w-full"
                          >
                            Delete
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <div>
                              <h1 className="text-4xl font-bold">
                                Are you sure you want to delete this user?
                              </h1>
                              <ul>
                                <li>Name: {name}</li>
                                <li>Email: {email}</li>
                                <li>Role: {role}</li>
                              </ul>
                              <Button
                                variant={"destructive"}
                                onClick={() => {
                                  deleteUser(id);
                                  setOpenDelete(null);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
