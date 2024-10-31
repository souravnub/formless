"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteForms } from "@/actions/forms";

const DeleteFormDialog = (form: {
  title: string;
  description: string;
  id: string;
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold">
            Are you sure you want to delete this user?
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <ul className="mb-5">
            <li>
              <b>Title:</b> {form.title}
            </li>
            <li>
              <b>Description:</b> {form.description}
            </li>
          </ul>
          <div className="self-end i ">
            <Button
              variant={"destructive"}
              onClick={async () => {
                const res = await deleteForms(form.id);
                toast({
                  description: res.message,
                  variant: res.success ? "default" : "destructive",
                });
                setIsOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFormDialog;
