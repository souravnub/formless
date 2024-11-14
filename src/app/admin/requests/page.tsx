/**
 * Reference:
 * ChatGPT:
 *
 * Prompt: how tf does this dialog component stuff from shadcn work <insert code>
 */
"use client";

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
import { useState, useEffect } from "react";
import { getRequests, deleteRequest } from "@/actions/userRequests";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/actions/users";
import { useTTS } from "@/components/TTSContext";

export default function requestsPage() {
  const [requests, setrequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = async () => {
    const requests = await getRequests();
    setrequests(requests);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const [openDelete, setOpenDelete] = useState<string | null>(null);
  const [openApprove, setOpenApprove] = useState<string | null>(null);

  const { TTSClick, TTSMouseOut, TTSMouseOver } = useTTS();

  return (
    <div
      className="container"
      onClick={TTSClick}
      onMouseOver={TTSMouseOver}
      onMouseOut={TTSMouseOut}
    >
      <CustomBreadcrumb
        className="my-3"
        list={[
          { name: "Dashboard", href: "/admin" },
          { name: "requests", href: "/admin/requests" },
        ]}
      />
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-medium items-center">Manage Requests</h1>
      </div>
      <Table className="border">
        <TableCaption>A list of requests</TableCaption>
        <TableHeader className="bg-accent/70">
          <TableRow>
            <TableHead className="pl-5">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request: any) => (
            <TableRow key={request.id} className="hover:bg-none!important">
              <TableCell className="font-medium pl-5">{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>
                {new Date(request.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="flex gap-2">
                <Dialog
                  open={openApprove === request.id}
                  onOpenChange={(open) => {
                    if (!open) setOpenApprove(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setOpenApprove(request.id)}
                    className=""
                  >
                    <Button variant={"default"}>Approve</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-4xl font-bold">
                        Are you sure you want to approve this user?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="">
                      <ul className="mb-5">
                        <li>
                          <b>Name:</b> {request.name}
                        </li>
                        <li>
                          <b>Email:</b> {request.email}
                        </li>
                      </ul>
                      <div className="self-end">
                        <Button
                          variant={"default"}
                          onClick={async () => {
                            const data = {
                              name: request.name,
                              email: request.email,
                              role: "USER" as "USER" | "SUPERVISOR",
                              password: request.password,
                            };
                            const res = await createUser(data);
                            await deleteRequest(request.id);
                            fetchRequests();
                            setOpenApprove(null);
                          }}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openDelete === request.id}
                  onOpenChange={(open) => {
                    if (!open) setOpenDelete(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setOpenDelete(request.id)}
                    className=""
                  ></DialogTrigger>

                  <DialogTrigger
                    asChild
                    onClick={() => setOpenDelete(request.id)}
                    className=""
                  >
                    <Button variant={"destructive"}>Deny</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-4xl font-bold">
                        Are you sure you want to deny this user?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="">
                      <ul className="mb-5">
                        <li>
                          <b>Name:</b> {request.name}
                        </li>
                        <li>
                          <b>email:</b> {request.email}
                        </li>
                      </ul>
                      <div className="self-end i ">
                        <Button
                          variant={"destructive"}
                          onClick={async () => {
                            const res = await deleteRequest(request.id);

                            fetchRequests();
                            setOpenDelete(null);
                          }}
                        >
                          Deny
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
