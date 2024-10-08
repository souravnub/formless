import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import prisma from "@/db";
import { auth } from "@/lib/auth";
import { Check, FileText, Target } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const forms = [
    {
        formName: "PPE Checklist",
        formCategory: "Health & Safety",
        dueDate: "2024-09-16",
        submission: "Submitted",
    },
    {
        formName: "Equipment Inspection",
        formCategory: "Health & Safety",
        dueDate: "2024-09-16",
        submission: "Open",
    },
    {
        formName: "Fire Extinguisher Form",
        formCategory: "Fire Extinguisher",
        dueDate: "2024-09-16",
        submission: "Submitted",
    },
    {
        formName: "Incident Report",
        formCategory: "Employee Reports",
        dueDate: "N/A",
        submission: "Open",
    },
];

export async function UserTable() {
    const session = await auth();
    // QUESTION: is have user's password in here safe? It is server-side so it might be
    const forms = await prisma.form.findMany({
        include: { user: true },
        //Admins can see all forms, users & supervisors can only see forms they are supposed to have access to
        where:
            session?.user.role === "ADMIN" ? {} : { role: session?.user.role },
    });
    const submissions = await prisma.formSubmission.findMany({
        where: {
            userId: session?.user.id,
        },
    });

    return (
        <Table>
            <TableHeader className="bg-muted/70">
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created On</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {forms.map((form) => {
                    const foundSubmission = submissions.find(
                        (submission) => submission.formId === form.id
                    );
                    return (
                        <TableRow key={form.id} className="hover:bg-muted/40">
                            <TableCell className="font-medium flex gap-2 items-center">
                                <div className=" rounded-sm bg-accent p-2">
                                    <FileText className=" size-4" />
                                </div>
                                {form.title}
                            </TableCell>
                            <TableCell>
                                <Badge className="p-2" variant={"outline"}>
                                    {foundSubmission ? (
                                        <span className="flex items-center gap-1 text-green-600">
                                            <Check className="size-3" />
                                            Complete
                                        </span>
                                    ) : (
                                        <span className="text-teal-500 flex items-center gap-1">
                                            <Target className="size-3" />
                                            Active
                                        </span>
                                    )}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                <span className="block font-semibold">
                                    {form.user.name}
                                </span>
                                <Button
                                    variant={"link"}
                                    asChild
                                    className="font-normal p-0 h-auto">
                                    <Link href={`mailto:${form.user.email}`}>
                                        {form.user.email}
                                    </Link>
                                </Button>
                            </TableCell>

                            <TableCell>
                                {format(form.createdAt, "dd MMM yyyy")}
                            </TableCell>
                            <TableCell>
                                <Button>
                                    {foundSubmission ? (
                                        <Link
                                            href={`/user/submissions/${foundSubmission.id}`}>
                                            View
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/user/forms/${form.id}/submissions/new`}>
                                            Submit
                                        </Link>
                                    )}
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
