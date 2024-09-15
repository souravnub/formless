"use client";

import prisma from "@/db";
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

const users = prisma.user.findMany();

const UserTable = () => {
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
            <TableHead>Password</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">abc123</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>TestEmail</TableCell>
            <TableCell>TestPassword</TableCell>
            <TableCell>TestRole</TableCell>
            {/* <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
              <Dialog>
                <DialogTrigger>Edit</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell> */}
          </TableRow>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                {/* <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
                  <Dialog>
                    <DialogTrigger>Edit</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <form>
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            value={user.name}
                            id="name"
                            name="name"
                            placeholder="Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            value={user.email}
                            id="email"
                            name="email"
                            placeholder="Email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            value={user.password}
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <RadioGroup name="role">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="SUPERVISOR"
                                id="SUPERVISOR"
                              />
                              <Label htmlFor="SUPERVISOR">Supervisor</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="USER" id="USER" />
                              <Label htmlFor="USER">User</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </form>
                      <DialogFooter>
                        <Button>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;

export { users };
