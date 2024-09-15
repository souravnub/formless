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
import UserTable from "./userTable";

const EditUserPage = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
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
            <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
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
            </TableCell>
          </TableRow>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className=" hover:cursor-pointer bg-black text-white rounded-full ">
                  <Dialog>
                    <DialogTrigger>Edit</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <form>
                        <div>Yerr</div>
                        <Button>Save</Button>
                      </form>
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
