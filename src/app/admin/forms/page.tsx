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
import { getForms, deleteForms } from "@/actions/forms";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function FormsPage() {
    const [forms, setForms] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchForms = async () => {
        const forms = await getForms();
        setForms(forms);
        setLoading(false);
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const [openDelete, setOpenDelete] = useState<string | null>(null);

    return (
        <div className="container">
            <CustomBreadcrumb
                className="my-3"
                list={[
                    { name: "Dashboard", href: "/admin" },
                    { name: "Forms", href: "/admin/forms" },
                ]}
            />
            <div className="flex justify-between my-5">
                <h1 className="text-xl font-medium items-center">
                    Manage Forms
                </h1>

                <Button asChild className="flex gap-2">
                    <Link href={"/admin/forms/add"}>Add New Form</Link>
                </Button>
            </div>
            <Table className="border">
                <TableCaption>A list of forms</TableCaption>
                <TableHeader className="bg-accent/70">
                    <TableRow>
                        <TableHead className="pl-5">Name</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {forms.map((form: any) => (
                        <TableRow
                            key={form.id}
                            className="hover:bg-none!important">
                            <TableCell className="font-medium pl-5">
                                {form.title}
                            </TableCell>
                            <TableCell>
                                {new Date(form.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{form.description}</TableCell>
                            <TableCell className="flex gap-2">
                                <Dialog
                                    open={openDelete === form.id}
                                    onOpenChange={(open) => {
                                        if (!open) setOpenDelete(null);
                                    }}>
                                    <DialogTrigger
                                        asChild
                                        onClick={() => setOpenDelete(form.id)}
                                        className="">
                                        <Button variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-4xl font-bold">
                                                Are you sure you want to delete
                                                this user?
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="">
                                            <ul className="mb-5">
                                                <li>
                                                    <b>Title:</b> {form.title}
                                                </li>
                                                <li>
                                                    <b>Description:</b>{" "}
                                                    {form.description}
                                                </li>
                                            </ul>
                                            <div className="self-end i ">
                                                <Button
                                                    variant={"destructive"}
                                                    onClick={async () => {
                                                        const res =
                                                            await deleteForms(
                                                                form.id
                                                            );
                                                        toast({
                                                            description:
                                                                res.message,
                                                            variant: res.success
                                                                ? "default"
                                                                : "destructive",
                                                        });
                                                        fetchForms();
                                                        setOpenDelete(null);
                                                    }}>
                                                    Delete
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
