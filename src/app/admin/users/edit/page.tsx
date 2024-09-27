"use client";
import { getUsers } from "@/actions/users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import InputComponent from "@/components/domains/editUser/inputComponent";
import useSWR from "swr";
import { useState } from "react";

//helper function that will be used to refetch data after an edit
const fetcher = async () => {
  return (await getUsers()).data;
};

const EditUserPage = () => {
  //fetching data from the server, renaming data to users and using the fetcher function
  const { data: users, mutate } = useSWR("users", fetcher);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  if (!users) {
    return (
      <div className="text-5xl text-center h-[500px] mt-10">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-10">
      <h1 className="text-4xl font-bold">Edit Users</h1>
      <Table className="w-[80%] mx-auto my-4">
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">abc123</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>TestEmail</TableCell>
            <TableCell>TestRole</TableCell>
            <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
              <Dialog>
                <DialogTrigger>Edit</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>Test</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
          {users &&
            users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
                    <Dialog
                      open={openDialog === user.id}
                      onOpenChange={(open) => {
                        if (!open) setOpenDialog(null);
                      }}
                    >
                      <DialogTrigger
                        onClick={() => setOpenDialog(user.id)}
                        className="w-full"
                      >
                        Edit
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <InputComponent
                          id={user.id}
                          name={user.name}
                          email={user.email}
                          role={user.role}
                          closeDialog={() => setOpenDialog(null)}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default EditUserPage;
